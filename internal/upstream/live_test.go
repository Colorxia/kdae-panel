package upstream

import (
	"context"
	"os"
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
		binary, err := registry.Fetch(ctx, asset)
		if err != nil {
			t.Fatalf("%s: 下载并解包 %s 失败: %v", source, installable.Ref, err)
		}
		if len(binary) < 4 || string(binary[:4]) != "\x7fELF" {
			t.Fatalf("%s: 取出的内容不是 ELF 可执行文件（前 4 字节 %q，共 %d 字节）",
				source, binary[:min(4, len(binary))], len(binary))
		}
		t.Logf("%s %s 解包出 %d 字节的 ELF 可执行文件", source, installable.Label, len(binary))
	}
}
