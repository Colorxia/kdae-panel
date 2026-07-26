package upstream

import (
	"context"
	"os"
	"strings"
	"testing"
	"time"
)

// TestLiveUpstream 用真实上游验证版本发现与资产解析的契约。
// 需要外网，默认跳过；CI 的上游契约作业会设置该环境变量来启用。
func TestLiveUpstream(t *testing.T) {
	if os.Getenv("KDAE_UPSTREAM_LIVE") == "" {
		t.Skip("未设置 KDAE_UPSTREAM_LIVE")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	registry := NewDefaultRegistry()
	platform := Platform{Name: "x86_64"}

	for _, source := range []Source{SourceOfficial, SourceKdae} {
		versions, err := registry.List(ctx, source, 5)
		if err != nil {
			t.Fatalf("%s: 列出版本失败: %v", source, err)
		}
		if len(versions) == 0 {
			t.Fatalf("%s: 未返回任何版本", source)
		}
		var installable *Version
		for index := range versions {
			if versions[index].Installable {
				installable = &versions[index]
				break
			}
		}
		if installable == nil {
			t.Fatalf("%s: 没有可安装的版本", source)
		}

		asset, err := registry.Resolve(ctx, source, installable.Ref, platform)
		if err != nil {
			t.Fatalf("%s: 解析 %s 的资产失败: %v", source, installable.Ref, err)
		}
		// 没有校验和就不该放行，这是整个信任链的根。
		if len(asset.SHA256) != 64 {
			t.Fatalf("%s: 资产校验和异常 %q", source, asset.SHA256)
		}
		if asset.URL == "" || asset.Filename == "" {
			t.Fatalf("%s: 资产信息不完整 %+v", source, asset)
		}
		t.Logf("%s %s -> %s (%d 字节, sha256 %s…)",
			source, installable.Label, asset.Filename, asset.Size, asset.SHA256[:12])

		// 必须真的下载并解包：只验证到 Resolve 会漏掉发布包内部结构的变化，
		// 例如可执行文件在包里的实际命名。
		bundle, err := registry.FetchBundle(ctx, asset)
		if err != nil {
			t.Fatalf("%s: 下载并解包 %s 失败: %v", source, installable.Ref, err)
		}
		if len(bundle.Binary) < 4 || string(bundle.Binary[:4]) != "\x7fELF" {
			t.Fatalf("%s: 取出的内容不是 ELF 可执行文件（前 4 字节 %q，共 %d 字节）",
				source, bundle.Binary[:min(4, len(bundle.Binary))], len(bundle.Binary))
		}
		t.Logf("%s %s 解包出 %d 字节的 ELF 可执行文件；unit=%d empty=%d geoip=%d geosite=%d",
			source, installable.Label, len(bundle.Binary),
			len(bundle.Unit), len(bundle.EmptyConfig), len(bundle.GeoIP), len(bundle.GeoSite))

		// 首次安装依赖包内自带这些物料；缺失说明上游打包方式变了，必须及早发现。
		if len(bundle.Unit) == 0 {
			t.Errorf("%s: 发布包内没有 dae.service，首次安装将无法创建服务单元", source)
		}
		if len(bundle.GeoIP) == 0 || len(bundle.GeoSite) == 0 {
			t.Errorf("%s: 发布包内没有 geo 数据文件，用到 geosite/geoip 的配置将无法启动", source)
		}
		// empty.dae 只有官方包带，kdae 的构建不含它，因此面板内置了同样的兜底内容。
		// 这里钉住官方包的实际内容，与 daeinstall.SeedConfig 保持一致。
		const seed = "global {} routing {}"
		if source == SourceOfficial && strings.TrimSpace(string(bundle.EmptyConfig)) != seed {
			t.Errorf("官方包内的 empty.dae = %q，与面板内置的兜底种子配置 %q 不一致",
				bundle.EmptyConfig, seed)
		}
	}
}
