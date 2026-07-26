package daeinstall

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

// SeedConfig 是首次安装时写入的种子配置，与官方发布包内的 empty.dae 一致。
//
// 它不声明任何网卡，因此 dae 起来后不劫持任何流量。这一点对首次安装至关重要：
// dae 是透明代理，在一台你正通过 SSH 或反向代理访问的机器上，配置不当地启动
// 会直接切断你自己的连接。装好之后由用户在配置页写真正的规则，再手动启动。
const SeedConfig = "global {} routing {}"

const (
	defaultUnitDirectory = "/etc/systemd/system"
	configMode           = 0o640
	geoMode              = 0o644
	unitMode             = 0o644
)

// unitDirectory 返回 systemd 单元的落地目录，测试会覆盖它。
func (i *Installer) unitDirectory() string {
	if i.unitDir != "" {
		return i.unitDir
	}
	return defaultUnitDirectory
}

// Provision 描述首次安装的可行性与将要落地的文件。
type Provision struct {
	// Possible 为假表示还不能首次安装，Blockers 说明原因。
	Possible bool `json:"possible"`
	// Installed 为真表示已经有 dae 服务，应当走升级而不是首次安装。
	Installed  bool     `json:"installed"`
	BinaryPath string   `json:"binaryPath"`
	ConfigPath string   `json:"configPath"`
	UnitPath   string   `json:"unitPath"`
	Blockers   []string `json:"blockers,omitempty"`
	Notes      []string `json:"notes,omitempty"`
}

// Provision 检查首次安装的前置条件。
//
// 面板运行在 ProtectSystem=strict 的单元里，写不了没列进 ReadWritePaths 的目录。
// 与其在事务中途 EROFS，不如提前把缺哪个路径说清楚。
func (i *Installer) Provision(ctx context.Context) Provision {
	result := Provision{
		BinaryPath: i.binaryPath,
		ConfigPath: i.configPath,
		UnitPath:   filepath.Join(i.unitDirectory(), i.serviceUnit()),
	}
	if status, err := i.service.Status(ctx); err == nil && status.ExecStartPath != "" {
		result.Installed = true
		result.Blockers = append(result.Blockers,
			fmt.Sprintf("已存在 dae 服务（启动 %s），请使用版本切换而不是首次安装", status.ExecStartPath))
		return result
	}
	if _, err := upstream.DetectPlatform(); err != nil {
		result.Blockers = append(result.Blockers, err.Error())
		return result
	}

	for _, directory := range []string{filepath.Dir(i.binaryPath), filepath.Dir(i.configPath), i.unitDirectory()} {
		if err := writable(directory); err != nil {
			result.Blockers = append(result.Blockers, fmt.Sprintf(
				"面板无法写入 %s：%v；请在 kdae-panel.service 的 ReadWritePaths 中加入该目录",
				directory, err))
		}
	}
	if _, err := os.Stat(i.configPath); err == nil {
		result.Notes = append(result.Notes, fmt.Sprintf("%s 已存在，将保留不动", i.configPath))
	} else {
		result.Notes = append(result.Notes, fmt.Sprintf(
			"将写入不劫持任何流量的种子配置 %s，安装后需自行编写规则再启动", i.configPath))
	}
	result.Notes = append(result.Notes, "安装完成后不会自动启动 dae：透明代理配置不当会切断你当前的连接")
	result.Possible = len(result.Blockers) == 0
	return result
}

// writable 通过实际创建并删除一个临时文件来判断目录可写。
// 只看权限位不够：ProtectSystem=strict 下 root 对只读挂载同样写不进去。
func writable(directory string) error {
	if err := os.MkdirAll(directory, 0o755); err != nil {
		return err
	}
	file, err := os.CreateTemp(directory, ".kdae-panel-probe-*")
	if err != nil {
		return err
	}
	name := file.Name()
	_ = file.Close()
	return os.Remove(name)
}

func (i *Installer) serviceUnit() string {
	name := i.serviceName
	if name == "" {
		name = "dae"
	}
	if !strings.HasSuffix(name, ".service") {
		name += ".service"
	}
	return name
}

// FirstInstall 在还没有 dae 的机器上完成安装：
// 落地可执行文件、geo 数据、种子配置与 systemd 单元，然后重新加载 systemd。
//
// 刻意不启动服务。dae 是透明代理，用一份还没写规则的配置把它拉起来意义不大，
// 而万一配置有误又会切断管理员自己的连接；启动交给用户在服务控制页显式执行。
func (i *Installer) FirstInstall(ctx context.Context, bundle upstream.Bundle, source upstream.Source, ref, label string) (Status, error) {
	provision := i.Provision(ctx)
	if !provision.Possible {
		return Status{}, errors.New(strings.Join(provision.Blockers, "；"))
	}
	if len(bundle.Binary) == 0 {
		return Status{}, errors.New("发布包内没有可执行文件")
	}

	// 先放数据文件与配置，最后才放单元：单元一旦就位，服务就可被启动，
	// 此时它依赖的东西必须都已到位。
	if err := i.writeGeoAssets(bundle); err != nil {
		return Status{}, err
	}
	if err := i.writeSeedConfig(bundle); err != nil {
		return Status{}, err
	}
	staged, cleanup, err := i.stage(bundle.Binary, i.binaryPath, binaryMode)
	if err != nil {
		return Status{}, err
	}
	committed := false
	defer func() {
		if !committed {
			cleanup()
		}
	}()
	if err := replaceFile(staged, i.binaryPath); err != nil {
		return Status{}, fmt.Errorf("安装 dae 可执行文件: %w", err)
	}
	committed = true

	if err := i.writeUnit(bundle, provision.UnitPath); err != nil {
		return Status{}, err
	}
	if err := i.service.Action(ctx, host.ActionDaemonReload); err != nil {
		return Status{}, fmt.Errorf("重新加载 systemd 配置: %w", err)
	}

	state := &State{Source: source, Ref: ref, Label: label, SHA256: digestBytes(bundle.Binary)}
	state.InstalledAt = nowUTC()
	if report := i.newProbe(i.binaryPath).Inspect(ctx); report.Available {
		state.Version = report.Version
	}
	if err := i.writeState(state); err != nil {
		i.logger.Warn("记录 dae 安装状态失败", "error", err)
	}
	i.logger.Info("已完成 dae 首次安装", "source", source, "ref", ref, "binary", i.binaryPath)
	return i.Status(ctx), nil
}

// writeGeoAssets 把发布包自带的 geo 数据写进配置目录。
//
// dae 搜索 geo 文件时，配置文件所在目录的优先级最高，而该目录本来就在面板的
// ReadWritePaths 里，因此不必为此放宽沙箱，也不必另找下载源——这两个文件就在
// 已经通过 sha256 校验的同一个包里。
func (i *Installer) writeGeoAssets(bundle upstream.Bundle) error {
	directory := filepath.Dir(i.configPath)
	for name, content := range map[string][]byte{
		"geoip.dat":   bundle.GeoIP,
		"geosite.dat": bundle.GeoSite,
	} {
		if len(content) == 0 {
			continue
		}
		if err := writeFileSynced(filepath.Join(directory, name), content, geoMode); err != nil {
			return fmt.Errorf("写入 %s: %w", name, err)
		}
	}
	return nil
}

func (i *Installer) writeSeedConfig(bundle upstream.Bundle) error {
	if _, err := os.Stat(i.configPath); err == nil {
		return nil // 已有配置，绝不覆盖
	} else if !os.IsNotExist(err) {
		return err
	}
	seed := bundle.EmptyConfig
	if len(strings.TrimSpace(string(seed))) == 0 {
		// kdae 的构建不带 empty.dae，用内置的同等内容兜底。
		seed = []byte(SeedConfig + "\n")
	}
	if err := writeFileSynced(i.configPath, seed, configMode); err != nil {
		return fmt.Errorf("写入种子配置: %w", err)
	}
	return nil
}

// writeUnit 安装 systemd 单元，并把其中的路径改写为面板实际使用的路径。
func (i *Installer) writeUnit(bundle upstream.Bundle, path string) error {
	unit := bundle.Unit
	if len(unit) == 0 {
		return errors.New("发布包内没有 dae.service，无法创建服务单元")
	}
	if _, err := os.Stat(path); err == nil {
		return fmt.Errorf("%s 已存在，面板不覆盖既有服务单元", path)
	} else if !os.IsNotExist(err) {
		return err
	}
	rendered := retargetUnit(string(unit), i.binaryPath, i.configPath)
	if err := writeFileSynced(path, []byte(rendered), unitMode); err != nil {
		return fmt.Errorf("写入服务单元: %w", err)
	}
	return nil
}

// retargetUnit 把单元里默认的 /usr/bin/dae 与 /etc/dae/config.dae
// 换成面板实际使用的路径。上游单元用的正是这两个默认值。
func retargetUnit(unit, binaryPath, configPath string) string {
	replacer := strings.NewReplacer(
		"/usr/bin/dae", binaryPath,
		"/etc/dae/config.dae", configPath,
	)
	return replacer.Replace(unit)
}
