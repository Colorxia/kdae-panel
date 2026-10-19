package dae

import (
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/upstream"
)

// TestUpstreamContract 验证面板依赖的 dae 公开契约：能力探测、export outline、
// validate 与 sysdump。
//
// 面板与 dae 分离运行，从不编译 dae；它管理的是用户实际安装的那个发布包。所以
// 契约要对发布包验证，而不是对自己从源码编译出的二进制——那既测不到用户真正
// 运行的东西，又会把上游构建环境的问题（编译依赖、eBPF 工具链）引进来。曾经的
// 源码构建还丢了发布包自带的 Geo 数据，在 dae 的 validate 开始加载 Geo 之后，
// 这项检查从 2026-09-14 起连续失败了六周。
//
// 两种用法：
//   - KDAE_UPSTREAM_LIVE=1：取官方与 kdae 最新可安装的构建，经面板安装 dae 时
//     的同一条下载与校验路径，用包内的二进制、Geo 数据与 example.dae 验证；
//   - KDAE_CONTRACT_BINARY + KDAE_CONTRACT_CONFIG：本地验证指定的二进制与配置。
func TestUpstreamContract(t *testing.T) {
	if binary := os.Getenv("KDAE_CONTRACT_BINARY"); binary != "" {
		configPath := os.Getenv("KDAE_CONTRACT_CONFIG")
		if configPath == "" {
			t.Fatal("指定 KDAE_CONTRACT_BINARY 时必须同时设置 KDAE_CONTRACT_CONFIG")
		}
		assertDaeContract(t, binary, configPath)
		return
	}
	if os.Getenv("KDAE_UPSTREAM_LIVE") == "" {
		t.Skip("未设置 KDAE_UPSTREAM_LIVE 或 KDAE_CONTRACT_BINARY")
	}
	for _, source := range []upstream.Source{upstream.SourceOfficial, upstream.SourceKdae} {
		t.Run(string(source), func(t *testing.T) {
			binary, configPath := installContractBundle(t, source)
			assertDaeContract(t, binary, configPath)
		})
	}
}

type contractGitHubToken struct{}

func (contractGitHubToken) GitHubToken() string { return os.Getenv("KDAE_PANEL_GITHUB_TOKEN") }

// installContractBundle 下载该来源最新可安装的构建，把二进制、Geo 数据与示例配置
// 摆进同一个临时目录。dae 的 validate 会在配置文件所在目录查找 Geo，与生产环境里
// 配置和 Geo 同处 /etc/dae 的布局一致。
func installContractBundle(t *testing.T, source upstream.Source) (string, string) {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 4*time.Minute)
	defer cancel()

	registry := upstream.NewDefaultRegistryWithGitHubToken(contractGitHubToken{})
	versions, err := registry.List(ctx, source, 10)
	if err != nil {
		t.Fatalf("列出 %s 版本失败: %v", source, err)
	}
	var target *upstream.Version
	for index := range versions {
		if versions[index].Installable {
			target = &versions[index]
			break
		}
	}
	if target == nil {
		t.Fatalf("%s 没有可安装的版本", source)
	}
	asset, err := registry.Resolve(ctx, source, target.Ref, upstream.Platform{Architecture: "x86_64", Name: "x86_64"})
	if err != nil {
		t.Fatalf("解析 %s %s 失败: %v", source, target.Label, err)
	}
	bundle, err := registry.FetchBundle(ctx, asset)
	if err != nil {
		t.Fatalf("下载并校验 %s %s 失败: %v", source, target.Label, err)
	}
	if len(bundle.Example) == 0 || len(bundle.GeoIP) == 0 || len(bundle.GeoSite) == 0 {
		t.Fatalf("%s %s 的发布包缺少 example.dae 或 Geo 数据（example=%d geoip=%d geosite=%d 字节）",
			source, target.Label, len(bundle.Example), len(bundle.GeoIP), len(bundle.GeoSite))
	}
	t.Logf("%s %s（%s）", source, target.Label, asset.Filename)

	directory := t.TempDir()
	binary := filepath.Join(directory, "dae")
	configPath := filepath.Join(directory, "config.dae")
	for _, file := range []struct {
		path    string
		content []byte
		mode    os.FileMode
	}{
		{binary, bundle.Binary, 0o755},
		// dae 拒绝其他用户可读的配置；面板生产环境里同样是 0600。
		{configPath, bundle.Example, 0o600},
		{filepath.Join(directory, "geoip.dat"), bundle.GeoIP, 0o644},
		{filepath.Join(directory, "geosite.dat"), bundle.GeoSite, 0o644},
	} {
		if err := os.WriteFile(file.path, file.content, file.mode); err != nil {
			t.Fatal(err)
		}
	}
	return binary, configPath
}

func assertDaeContract(t *testing.T, binary, configPath string) {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Minute)
	defer cancel()
	client := NewClient(binary)
	report := client.Inspect(ctx)
	if !report.Available || !report.OutlineSupported {
		t.Fatalf("dae 能力探测失败: %+v", report)
	}
	for _, commandName := range []string{"validate", "reload", "suspend", "sysdump", "export"} {
		if !report.Commands[commandName] {
			t.Fatalf("dae 缺少必要命令 %q: %+v", commandName, report.Commands)
		}
	}
	if err := client.Validate(ctx, configPath); err != nil {
		t.Fatalf("上游示例配置校验失败: %v", err)
	}
	dump, err := client.Sysdump(ctx)
	if err != nil {
		t.Fatalf("上游 sysdump 契约失败: %v", err)
	}
	if dump.Filename == "" || len(dump.Content) == 0 {
		t.Fatalf("上游 sysdump 归档无效: filename=%q size=%d", dump.Filename, len(dump.Content))
	}
}
