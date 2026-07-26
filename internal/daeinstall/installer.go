// Package daeinstall 把选定版本的 dae 可执行文件安装到位。
//
// 安装是一个带回滚的事务，顺序刻意如此：
//
//	下载并校验 sha256 → 写入同目录暂存文件 → 用暂存的新二进制跑 --version
//	→ 用它 validate 现有配置 → 备份当前二进制 → 原子替换 → 重启服务
//	→ 确认服务已起来；任一步失败都恢复备份并把服务重启回去。
//
// 先验证再替换，是为了让"新版本根本跑不起来"或"新版本不认现有配置"这两类
// 问题在磁盘被改动之前就暴露出来。
package daeinstall

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/dae"
	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

const (
	binaryMode     = 0o755
	probeTimeout   = 60 * time.Second
	restartTimeout = 150 * time.Second
	// 重启后需要连续观察一段时间:dae validate 不加载 eBPF,能通过自检的版本
	// 仍可能在真正挂载 eBPF 时崩掉,只查一次状态会把这种失败当成成功。
	healthWindow   = 10 * time.Second
	healthInterval = time.Second
)

// Probe 用某个具体路径上的 dae 可执行文件做验证。
type Probe interface {
	Inspect(ctx context.Context) dae.Report
	Validate(ctx context.Context, configPath string) error
}

// ProbeFactory 为给定路径构造探针，便于测试注入。
type ProbeFactory func(binaryPath string) Probe

// ServiceController 控制 dae 的 systemd 单元。
type ServiceController interface {
	Action(ctx context.Context, action host.Action) error
	Status(ctx context.Context) (host.Status, error)
}

// Fetcher 取回并校验指定资产，返回其中的 dae 可执行文件内容。
type Fetcher interface {
	List(ctx context.Context, source upstream.Source, limit int) ([]upstream.Version, error)
	Resolve(ctx context.Context, source upstream.Source, ref string, platform upstream.Platform) (upstream.Asset, error)
	Fetch(ctx context.Context, asset upstream.Asset) ([]byte, error)
}

// State 记录当前装的是哪个版本。
// dae --version 对 CI 构建往往无法区分 commit，因此以面板自己的记录为准，
// 同时保存二进制摘要，用于发现外部手动替换。
type State struct {
	Source      upstream.Source `json:"source,omitempty"`
	Ref         string          `json:"ref,omitempty"`
	Label       string          `json:"label,omitempty"`
	Version     string          `json:"version,omitempty"`
	InstalledAt time.Time       `json:"installedAt,omitempty"`
	SHA256      string          `json:"sha256,omitempty"`
}

// Status 是对外暴露的安装状态。
// 磁盘上是什么、面板以为装了什么、服务是否跑得起来，是三件独立的事，
// 出问题时必须分别可见，不能糅成一个"版本"字段。
type Status struct {
	// BinaryPath 是 systemd 单元实际启动的可执行文件，也是替换的目标。
	BinaryPath string `json:"binaryPath,omitempty"`
	Platform   string `json:"platform"`
	// Ready 为假表示还不具备安装条件，Problem 说明原因。
	Ready bool `json:"ready"`
	// Present 为假表示目标路径上没有可执行文件。
	Present bool `json:"present"`
	// Version 是对磁盘上那个二进制实际探测到的版本。
	Version string `json:"version,omitempty"`
	Managed *State `json:"managed,omitempty"`
	// Drifted 为真表示磁盘上的二进制不是面板装的那个（被外部替换过）。
	Drifted bool `json:"drifted,omitempty"`
	// RollbackAvailable 为真表示存在可回滚的上一版本。
	RollbackAvailable bool `json:"rollbackAvailable"`
	// ServiceActive 反映替换后服务是否真的在跑。
	ServiceActive bool `json:"serviceActive"`
	// Warnings 是不阻断安装但用户应当知道的问题，如缺少 geo 数据文件。
	Warnings []string `json:"warnings,omitempty"`
	Problem  string   `json:"problem,omitempty"`
}

type Installer struct {
	binaryPath string
	configPath string
	statePath  string
	backupPath string
	fetcher    Fetcher
	newProbe   ProbeFactory
	service    ServiceController
	logger     *slog.Logger
	// health/interval 是重启后的健康观察窗口与采样间隔，测试会调短它们。
	health   time.Duration
	interval time.Duration

	digestMu    sync.Mutex
	digestCache map[string]string
}

type Options struct {
	BinaryPath string
	ConfigPath string
	StatePath  string
	Fetcher    Fetcher
	NewProbe   ProbeFactory
	Service    ServiceController
	Logger     *slog.Logger
}

func New(options Options) (*Installer, error) {
	if options.BinaryPath == "" {
		return nil, errors.New("dae 可执行文件路径不能为空")
	}
	if options.StatePath == "" {
		return nil, errors.New("安装状态文件路径不能为空")
	}
	if options.Fetcher == nil {
		return nil, errors.New("上游取回器不能为空")
	}
	if options.Service == nil {
		return nil, errors.New("服务控制器不能为空")
	}
	binaryPath, err := filepath.Abs(options.BinaryPath)
	if err != nil {
		return nil, fmt.Errorf("解析 dae 路径: %w", err)
	}
	newProbe := options.NewProbe
	if newProbe == nil {
		newProbe = func(path string) Probe { return dae.NewClient(path) }
	}
	logger := options.Logger
	if logger == nil {
		logger = slog.Default()
	}
	return &Installer{
		binaryPath: binaryPath,
		configPath: options.ConfigPath,
		statePath:  options.StatePath,
		backupPath: options.StatePath + ".previous-dae",
		fetcher:    options.Fetcher,
		newProbe:   newProbe,
		service:    options.Service,
		logger:     logger,
		health:     healthWindow,
		interval:   healthInterval,
	}, nil
}

func (i *Installer) Versions(ctx context.Context, source upstream.Source, limit int) ([]upstream.Version, error) {
	return i.fetcher.List(ctx, source, limit)
}

// target 以 systemd 单元实际启动的可执行文件为准。
//
// 这一点至关重要：配置项 KDAE_PANEL_DAE_BINARY 只用于探测，若它与单元的
// ExecStart 不是同一个文件，替换它不会影响真正运行的进程——事务会全绿，
// 而 dae 仍跑着旧二进制。宁可拒绝安装，也不做这种静默的假成功。
func (i *Installer) target(ctx context.Context) (string, bool, error) {
	status, err := i.service.Status(ctx)
	if err != nil {
		return "", false, fmt.Errorf("读取 dae 服务状态失败，无法确定要替换哪个文件：%w", err)
	}
	if status.ExecStartPath == "" {
		return "", false, errors.New("dae 尚未作为 systemd 服务安装，面板只能升级或切换已有的 dae")
	}
	path, err := filepath.Abs(status.ExecStartPath)
	if err != nil {
		return "", false, fmt.Errorf("解析服务启动路径 %q: %w", status.ExecStartPath, err)
	}
	return path, status.ActiveState == "active", nil
}

func (i *Installer) Status(ctx context.Context) Status {
	platform, platformErr := upstream.DetectPlatform()
	status := Status{Platform: platform.Name}
	if platformErr != nil {
		status.Problem = platformErr.Error()
		return status
	}
	if _, err := os.Stat(i.backupPath); err == nil {
		status.RollbackAvailable = true
	}

	target, active, err := i.target(ctx)
	if err != nil {
		status.Problem = err.Error()
		return status
	}
	status.BinaryPath = target
	status.ServiceActive = active

	digest, err := i.cachedDigest(target)
	if err != nil {
		if os.IsNotExist(err) {
			status.Problem = fmt.Sprintf("服务指向的 %s 不存在", target)
		} else {
			status.Problem = err.Error()
		}
		return status
	}
	status.Present = true
	status.Ready = true

	if report := i.newProbe(target).Inspect(ctx); report.Available {
		status.Version = report.Version
	} else {
		status.Problem = report.Problem
	}
	if state, err := i.readState(); err == nil && state != nil {
		status.Managed = state
		status.Drifted = state.SHA256 != "" && state.SHA256 != digest
	}
	if i.binaryPath != target {
		status.Warnings = append(status.Warnings, fmt.Sprintf(
			"面板配置的 dae 路径是 %s，而服务实际启动的是 %s；安装会替换后者", i.binaryPath, target))
	}
	status.Warnings = append(status.Warnings, i.geoWarnings(target)...)
	return status
}

// geoWarnings 检查 dae 运行所需的 geo 数据文件。
// 面板不代为下载它们（那是 dae-installer 的职责），但缺失时必须提醒，
// 否则换完版本 dae 可能因为找不到数据文件而起不来。
func (i *Installer) geoWarnings(target string) []string {
	directories := []string{
		"/usr/local/share/dae",
		"/usr/share/dae",
		filepath.Join(filepath.Dir(filepath.Dir(target)), "share", "dae"),
	}
	for _, name := range []string{"geoip.dat", "geosite.dat"} {
		found := false
		for _, directory := range directories {
			if _, err := os.Stat(filepath.Join(directory, name)); err == nil {
				found = true
				break
			}
		}
		if !found {
			return []string{"未找到 geoip.dat / geosite.dat，若路由规则用到 geosite/geoip，dae 可能无法启动"}
		}
	}
	return nil
}

// Download 取回并校验指定版本，返回可执行文件内容。
// 这一步耗时最长且不触碰任何共享状态，因此调用方可以在不持有控制锁的情况下先做完。
func (i *Installer) Download(ctx context.Context, source upstream.Source, ref string) ([]byte, error) {
	platform, err := upstream.DetectPlatform()
	if err != nil {
		return nil, err
	}
	asset, err := i.fetcher.Resolve(ctx, source, ref, platform)
	if err != nil {
		return nil, err
	}
	binary, err := i.fetcher.Fetch(ctx, asset)
	if err != nil {
		return nil, err
	}
	i.logger.Info("已取得并校验 dae 可执行文件",
		"source", source, "ref", ref, "asset", asset.Filename, "bytes", len(binary))
	return binary, nil
}

// Install 把已下载的内容装上去。调用方应在持有全局控制锁时调用它。
func (i *Installer) Install(ctx context.Context, binary []byte, source upstream.Source, ref, label string) (Status, error) {
	return i.applyBinary(ctx, binary, &State{
		Source:      source,
		Ref:         ref,
		Label:       label,
		InstalledAt: time.Now().UTC(),
		SHA256:      digestBytes(binary),
	})
}

// Rollback 恢复上一次安装前备份的二进制。
func (i *Installer) Rollback(ctx context.Context) (Status, error) {
	binary, err := os.ReadFile(i.backupPath)
	if err != nil {
		if os.IsNotExist(err) {
			return Status{}, errors.New("没有可回滚的上一版本")
		}
		return Status{}, fmt.Errorf("读取备份的 dae: %w", err)
	}
	previous, _ := i.readPreviousState()
	if previous == nil {
		previous = &State{}
	}
	previous.InstalledAt = time.Now().UTC()
	previous.SHA256 = digestBytes(binary)
	return i.applyBinary(ctx, binary, previous)
}

// applyBinary 是共用的替换事务：验证 → 备份 → 替换 → 重启 → 失败回滚。
func (i *Installer) applyBinary(ctx context.Context, binary []byte, state *State) (Status, error) {
	target, _, err := i.target(ctx)
	if err != nil {
		return Status{}, err
	}
	// 只升级或切换已有安装：目标不存在时不去猜该往哪装，也不代为创建 dae 服务。
	info, err := os.Stat(target)
	if err != nil {
		if os.IsNotExist(err) {
			return Status{}, fmt.Errorf("服务指向的 %s 不存在，请先用官方安装器完成 dae 的首次安装", target)
		}
		return Status{}, err
	}
	// ExecStart 来自系统上的服务单元。若它指向的不是 dae，覆盖它就是在破坏
	// 一个无关的程序，因此宁可拒绝也不猜。
	if !info.Mode().IsRegular() {
		return Status{}, fmt.Errorf("服务指向的 %s 不是普通文件，拒绝替换", target)
	}
	if filepath.Base(target) != upstream.BinaryName {
		return Status{}, fmt.Errorf("服务启动的是 %s，文件名不是 %s，为避免覆盖无关程序已拒绝替换",
			target, upstream.BinaryName)
	}
	// 文件名可以骗人：ExecStart 完全可能指向一个名叫 dae 的启动包装脚本。
	// 覆盖它会毁掉运维的包装，而 dae 仍带着原参数起来，事务全绿却已经出错。
	if err := assertExecutable(target); err != nil {
		return Status{}, err
	}

	staged, cleanup, err := i.stage(binary, target, info.Mode().Perm())
	if err != nil {
		return Status{}, err
	}
	// 暂存文件在成功改名后已经不存在，用标志位区分，避免 defer 捕获到旧闭包。
	committed := false
	defer func() {
		if !committed {
			cleanup()
		}
	}()

	// 先用暂存的新二进制自证：能报版本，且认得现有配置。
	probeCtx, cancelProbe := context.WithTimeout(ctx, probeTimeout)
	report := i.newProbe(staged).Inspect(probeCtx)
	cancelProbe()
	if !report.Available {
		return Status{}, fmt.Errorf("新版本无法运行：%s", report.Problem)
	}
	state.Version = report.Version
	if i.configPath != "" {
		if _, err := os.Stat(i.configPath); err == nil {
			validateCtx, cancelValidate := context.WithTimeout(ctx, probeTimeout)
			err := i.newProbe(staged).Validate(validateCtx, i.configPath)
			cancelValidate()
			if err != nil {
				return Status{}, fmt.Errorf("新版本拒绝当前配置，已中止安装：%w", err)
			}
		}
	}

	if err := i.backupCurrent(target); err != nil {
		return Status{}, err
	}
	if err := replaceFile(staged, target); err != nil {
		return Status{}, fmt.Errorf("替换 dae 可执行文件: %w", err)
	}
	committed = true

	if err := i.restart(ctx); err != nil {
		// 换上去起不来，必须退回原样；连备份都恢复不了时如实上报双重失败。
		restoreErr := i.restorePrevious(ctx, target)
		return Status{}, &ApplyError{Cause: err, RolledBack: restoreErr == nil, RestoreErr: restoreErr}
	}
	if err := i.writeState(state); err != nil {
		i.logger.Warn("记录 dae 安装状态失败", "error", err)
	}
	return i.Status(ctx), nil
}

// ApplyError 表示二进制已替换但服务未能起来。
//
// RolledBack 只表示"磁盘上的二进制已还原"。旧版本能否重新跑起来是另一回事，
// 两者合成一个布尔值会让用户误以为一切已恢复原状，因此分开表达。
type ApplyError struct {
	Cause error
	// RolledBack 为真表示磁盘文件已还原为旧版本。
	RolledBack bool
	// ServiceRecovered 为真表示还原之后服务确实重新起来了。
	ServiceRecovered bool
	RestoreErr       error
}

func (e *ApplyError) Error() string {
	switch {
	case !e.RolledBack:
		return fmt.Sprintf("%v；磁盘文件未能还原：%v", e.Cause, e.RestoreErr)
	case !e.ServiceRecovered:
		return fmt.Sprintf("%v；已还原为原版本，但服务仍未恢复：%v", e.Cause, e.RestoreErr)
	default:
		return fmt.Sprintf("%v；已回滚到原版本且服务已恢复", e.Cause)
	}
}

func (e *ApplyError) Unwrap() error {
	return e.Cause
}

// stage 把新二进制写到目标同目录。
//
// 必须同目录，不能用 /tmp：面板单元开了 PrivateTmp，跨文件系统 rename 会 EXDEV；
// 而且 /tmp 常以 noexec 挂载，放那里的新二进制连自检都跑不了。
func (i *Installer) stage(binary []byte, target string, mode os.FileMode) (string, func(), error) {
	if len(binary) == 0 {
		return "", func() {}, errors.New("新版本内容为空")
	}
	// 沿用被替换文件原有的权限位；取不到时退回保守的 0755。
	if mode.Perm() == 0 {
		mode = binaryMode
	}
	directory := filepath.Dir(target)
	if err := os.MkdirAll(directory, 0o755); err != nil {
		return "", func() {}, fmt.Errorf("创建目标目录: %w", err)
	}
	file, err := os.CreateTemp(directory, ".kdae-panel-dae-*")
	if err != nil {
		return "", func() {}, fmt.Errorf("创建暂存文件: %w", err)
	}
	path := file.Name()
	cleanup := func() { _ = os.Remove(path) }
	if _, err := file.Write(binary); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("写入暂存文件: %w", err)
	}
	if err := file.Chmod(mode.Perm()); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("设置可执行权限: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		cleanup()
		return "", func() {}, fmt.Errorf("同步暂存文件: %w", err)
	}
	if err := file.Close(); err != nil {
		cleanup()
		return "", func() {}, fmt.Errorf("关闭暂存文件: %w", err)
	}
	return path, cleanup, nil
}

func (i *Installer) backupCurrent(target string) error {
	current, err := os.ReadFile(target)
	if err != nil {
		return fmt.Errorf("读取当前 dae: %w", err)
	}
	if err := writeFileSynced(i.backupPath, current, binaryMode); err != nil {
		return fmt.Errorf("备份当前 dae: %w", err)
	}
	// 一并记下旧版本的账本，回滚后才能如实显示回到了哪一版。
	if state, err := i.readState(); err == nil && state != nil {
		if encoded, err := json.Marshal(state); err == nil {
			_ = writeFileSynced(i.previousStatePath(), encoded, 0o600)
		}
	} else {
		_ = os.Remove(i.previousStatePath())
	}
	return nil
}

func (i *Installer) restorePrevious(ctx context.Context, target string) error {
	binary, err := os.ReadFile(i.backupPath)
	if err != nil {
		return err
	}
	mode := os.FileMode(binaryMode)
	if info, err := os.Stat(target); err == nil {
		mode = info.Mode().Perm()
	}
	staged, cleanup, err := i.stage(binary, target, mode)
	if err != nil {
		return err
	}
	committed := false
	defer func() {
		if !committed {
			cleanup()
		}
	}()
	if err := replaceFile(staged, target); err != nil {
		return err
	}
	committed = true
	return i.restart(ctx)
}

// restart 重启服务并在一个观察窗口内反复确认它稳住了。
// 替换二进制后必须整体重启：dae 的 eBPF 程序要重新挂载，reload 不足以生效。
func (i *Installer) restart(ctx context.Context) error {
	restartCtx, cancel := context.WithTimeout(ctx, restartTimeout)
	defer cancel()
	if err := i.service.Action(restartCtx, host.ActionRestart); err != nil {
		return err
	}

	deadline := time.Now().Add(i.health)
	for {
		select {
		case <-time.After(i.interval):
		case <-restartCtx.Done():
			return restartCtx.Err()
		}
		status, err := i.service.Status(restartCtx)
		if err != nil {
			return fmt.Errorf("重启后无法读取服务状态: %w", err)
		}
		// 崩溃重启循环里 ActiveState 会在 activating/failed 之间跳，
		// 任何一次不是 active 都判定失败，而不是等到窗口结束再看最后一眼。
		if status.ActiveState != "active" {
			return fmt.Errorf("重启后服务状态为 %s/%s", status.ActiveState, status.SubState)
		}
		if !time.Now().Before(deadline) {
			return nil
		}
	}
}

func (i *Installer) previousStatePath() string {
	return i.statePath + ".previous"
}

func (i *Installer) readState() (*State, error) {
	return readStateFile(i.statePath)
}

func (i *Installer) readPreviousState() (*State, error) {
	return readStateFile(i.previousStatePath())
}

func readStateFile(path string) (*State, error) {
	content, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil
		}
		return nil, err
	}
	var state State
	if err := json.Unmarshal(content, &state); err != nil {
		return nil, err
	}
	return &state, nil
}

func (i *Installer) writeState(state *State) error {
	content, err := json.Marshal(state)
	if err != nil {
		return err
	}
	return writeFileSynced(i.statePath, content, 0o600)
}

func writeFileSynced(path string, content []byte, mode os.FileMode) error {
	if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
		return err
	}
	temp := path + ".tmp"
	file, err := os.OpenFile(temp, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, mode)
	if err != nil {
		return err
	}
	if _, err := file.Write(content); err != nil {
		_ = file.Close()
		_ = os.Remove(temp)
		return err
	}
	if err := file.Chmod(mode); err != nil {
		_ = file.Close()
		_ = os.Remove(temp)
		return err
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		_ = os.Remove(temp)
		return err
	}
	if err := file.Close(); err != nil {
		_ = os.Remove(temp)
		return err
	}
	if err := os.Rename(temp, path); err != nil {
		_ = os.Remove(temp)
		return err
	}
	return nil
}

// assertExecutable 确认目标是原生可执行文件而不是脚本。
// 面板只替换 dae 本体；ExecStart 指向包装脚本时应当由运维自己处理。
func assertExecutable(path string) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()
	header := make([]byte, 4)
	if _, err := io.ReadFull(file, header); err != nil {
		return fmt.Errorf("读取 %s 的文件头: %w", path, err)
	}
	if string(header) != "\x7fELF" {
		return fmt.Errorf("服务启动的 %s 不是 ELF 可执行文件，看起来是启动脚本；"+
			"面板只替换 dae 本体，请把 ExecStart 指向 dae 可执行文件本身", path)
	}
	return nil
}

// cachedDigest 按 (路径, 大小, 修改时间) 缓存二进制摘要。
// 状态查询会被前端每两秒轮询一次，而 dae 有几十兆，
// 每次都整份读进内存做 sha256 是不必要的开销。
func (i *Installer) cachedDigest(path string) (string, error) {
	info, err := os.Stat(path)
	if err != nil {
		return "", err
	}
	key := fmt.Sprintf("%s|%d|%d", path, info.Size(), info.ModTime().UnixNano())

	i.digestMu.Lock()
	cached, ok := i.digestCache[key]
	i.digestMu.Unlock()
	if ok {
		return cached, nil
	}

	content, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}
	digest := digestBytes(content)

	i.digestMu.Lock()
	if i.digestCache == nil {
		i.digestCache = make(map[string]string, 2)
	}
	// 只保留最近的少量条目，路径与内容都不常变。
	if len(i.digestCache) > 4 {
		i.digestCache = make(map[string]string, 2)
	}
	i.digestCache[key] = digest
	i.digestMu.Unlock()
	return digest, nil
}

func digestBytes(content []byte) string {
	sum := sha256.Sum256(content)
	return hex.EncodeToString(sum[:])
}
