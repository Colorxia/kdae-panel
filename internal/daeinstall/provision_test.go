package daeinstall

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

const testUnit = `[Unit]
Description=dae Service

[Service]
Type=notify
ExecStartPre=/usr/bin/dae validate -c /etc/dae/config.dae
ExecStart=/usr/bin/dae run --disable-timestamp -c /etc/dae/config.dae
ExecReload=/usr/bin/dae reload $MAINPID

[Install]
WantedBy=multi-user.target
`

func testBundle() upstream.Bundle {
	return upstream.Bundle{
		Binary:      elf("v1"),
		Unit:        []byte(testUnit),
		EmptyConfig: []byte(SeedConfig),
		GeoIP:       []byte("geoip-data"),
		GeoSite:     []byte("geosite-data"),
	}
}

// newFreshInstaller 构造一台"还没装过 dae"的机器：
// 服务不存在，可执行文件与配置也都不存在。
func newFreshInstaller(t *testing.T) (*Installer, *fakeService, string) {
	t.Helper()
	service := &fakeService{}
	installer, binaryPath := newTestInstaller(t, &fakeFetcher{}, service)
	if err := os.Remove(binaryPath); err != nil && !os.IsNotExist(err) {
		t.Fatal(err)
	}
	if err := os.Remove(installer.configPath); err != nil && !os.IsNotExist(err) {
		t.Fatal(err)
	}
	service.execStart = "" // 尚未作为 systemd 服务安装
	// 单元目录默认是 /etc/systemd/system，测试必须改到临时目录
	installer.unitDir = t.TempDir()
	return installer, service, binaryPath
}

func TestProvisionReportsReadyOnFreshMachine(t *testing.T) {
	installer, _, _ := newFreshInstaller(t)

	provision := installer.Provision(context.Background())
	if !provision.Possible {
		t.Fatalf("空机器上应当可以首次安装: %+v", provision)
	}
	if provision.Installed {
		t.Fatal("没有服务时不应报告已安装")
	}
	// 必须明确告知不会自动启动
	joined := strings.Join(provision.Notes, " ")
	if !strings.Contains(joined, "不会自动启动") {
		t.Fatalf("应说明装完不自动启动: %v", provision.Notes)
	}
}

func TestProvisionRefusesWhenServiceExists(t *testing.T) {
	installer, service, binaryPath := newFreshInstaller(t)
	service.execStart = binaryPath // 已有 dae 服务

	provision := installer.Provision(context.Background())
	if provision.Possible || !provision.Installed {
		t.Fatalf("已有服务时应引导去做版本切换: %+v", provision)
	}
}

func TestProvisionReportsUnwritableDirectories(t *testing.T) {
	installer, _, _ := newFreshInstaller(t)
	// 指向一个无法创建的路径，模拟 ProtectSystem=strict 挡住写入
	installer.unitDir = string([]byte{0})

	provision := installer.Provision(context.Background())
	if provision.Possible {
		t.Fatal("目录不可写时不应报告可以安装")
	}
	if len(provision.Blockers) == 0 || !strings.Contains(strings.Join(provision.Blockers, " "), "ReadWritePaths") {
		t.Fatalf("应指明需要加入 ReadWritePaths: %v", provision.Blockers)
	}
}

func TestFirstInstallLandsEveryArtifact(t *testing.T) {
	installer, service, binaryPath := newFreshInstaller(t)
	unitDir := installer.unitDir

	status, err := installer.FirstInstall(context.Background(), testBundle(),
		upstream.SourceOfficial, "v2.0.0", "v2.0.0")
	if err != nil {
		t.Fatalf("首次安装失败: %v", err)
	}

	if content, err := os.ReadFile(binaryPath); err != nil || string(content) != string(elf("v1")) {
		t.Fatalf("可执行文件 = %q, err = %v", content, err)
	}
	configDir := filepath.Dir(installer.configPath)
	for name, want := range map[string]string{
		"geoip.dat":   "geoip-data",
		"geosite.dat": "geosite-data",
	} {
		// geo 数据必须落在配置目录：那是 dae 搜索顺序里的最高优先级，
		// 也是面板在 ProtectSystem=strict 下唯一写得进去的地方
		content, err := os.ReadFile(filepath.Join(configDir, name))
		if err != nil || string(content) != want {
			t.Fatalf("%s = %q, err = %v", name, content, err)
		}
	}
	config, err := os.ReadFile(installer.configPath)
	if err != nil || strings.TrimSpace(string(config)) != SeedConfig {
		t.Fatalf("种子配置 = %q, err = %v", config, err)
	}

	unit, err := os.ReadFile(filepath.Join(unitDir, "dae.service"))
	if err != nil {
		t.Fatal(err)
	}
	// 单元里的路径必须改写成面板实际使用的路径
	if !strings.Contains(string(unit), binaryPath) || !strings.Contains(string(unit), installer.configPath) {
		t.Fatalf("单元未改写为实际路径:\n%s", unit)
	}
	if strings.Contains(string(unit), "/usr/bin/dae") {
		t.Fatalf("单元里仍残留默认路径:\n%s", unit)
	}

	// 必须 daemon-reload，否则 systemd 看不到新单元；且不应启动服务
	if len(service.actions) != 1 || service.actions[0] != host.ActionDaemonReload {
		t.Fatalf("应当只执行 daemon-reload，实际 %v", service.actions)
	}
	_ = status
}

func TestFirstInstallKeepsExistingConfig(t *testing.T) {
	installer, _, _ := newFreshInstaller(t)
	existing := "global { log_level: debug }\n"
	if err := os.WriteFile(installer.configPath, []byte(existing), 0o640); err != nil {
		t.Fatal(err)
	}

	if _, err := installer.FirstInstall(context.Background(), testBundle(),
		upstream.SourceOfficial, "v2.0.0", "v2.0.0"); err != nil {
		t.Fatal(err)
	}
	if content, _ := os.ReadFile(installer.configPath); string(content) != existing {
		t.Fatalf("既有配置不应被覆盖，现在是 %q", content)
	}
}

func TestFirstInstallRefusesToOverwriteExistingUnit(t *testing.T) {
	installer, _, _ := newFreshInstaller(t)
	unitDir := installer.unitDir
	existing := "[Unit]\nDescription=用户自己写的\n"
	if err := os.WriteFile(filepath.Join(unitDir, "dae.service"), []byte(existing), 0o644); err != nil {
		t.Fatal(err)
	}

	_, err := installer.FirstInstall(context.Background(), testBundle(),
		upstream.SourceOfficial, "v2.0.0", "v2.0.0")
	if err == nil || !strings.Contains(err.Error(), "不覆盖既有服务单元") {
		t.Fatalf("不应覆盖用户已有的单元，得到 %v", err)
	}
	if content, _ := os.ReadFile(filepath.Join(unitDir, "dae.service")); string(content) != existing {
		t.Fatalf("既有单元被改动了: %q", content)
	}
}

func TestFirstInstallFallsBackToBuiltinSeedConfig(t *testing.T) {
	installer, _, _ := newFreshInstaller(t)
	bundle := testBundle()
	bundle.EmptyConfig = nil // kdae 的构建不带 empty.dae

	if _, err := installer.FirstInstall(context.Background(), bundle,
		upstream.SourceKdae, "30187784287", "d63a0c1"); err != nil {
		t.Fatal(err)
	}
	content, err := os.ReadFile(installer.configPath)
	if err != nil || strings.TrimSpace(string(content)) != SeedConfig {
		t.Fatalf("应回退到内置种子配置，实际 %q, err = %v", content, err)
	}
}

// 种子配置不能声明网卡，否则首次启动就会劫持流量、可能切断管理员自己的连接。
func TestSeedConfigHijacksNothing(t *testing.T) {
	for _, forbidden := range []string{"wan_interface", "lan_interface"} {
		if strings.Contains(SeedConfig, forbidden) {
			t.Fatalf("种子配置不应包含 %s：它会让 dae 一启动就劫持流量", forbidden)
		}
	}
}

func TestRetargetUnit(t *testing.T) {
	rendered := retargetUnit(testUnit, "/opt/dae/bin/dae", "/opt/dae/config.dae")
	if strings.Contains(rendered, "/usr/bin/dae") || strings.Contains(rendered, "/etc/dae/config.dae") {
		t.Fatalf("默认路径未被替换:\n%s", rendered)
	}
	for _, want := range []string{
		"ExecStartPre=/opt/dae/bin/dae validate -c /opt/dae/config.dae",
		"ExecStart=/opt/dae/bin/dae run --disable-timestamp -c /opt/dae/config.dae",
		"ExecReload=/opt/dae/bin/dae reload $MAINPID",
	} {
		if !strings.Contains(rendered, want) {
			t.Fatalf("缺少 %q:\n%s", want, rendered)
		}
	}
}
