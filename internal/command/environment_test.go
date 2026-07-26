package command

import (
	"os"
	"strings"
	"testing"
)

// 面板的初始化凭据不能交给任何子进程，尤其是刚从上游下载、尚未建立信任的
// dae 可执行文件。SECURITY.md 把这一点写成了安全承诺，因此必须有测试钉住，
// 并且不能带平台构建标记——否则在开发机上永远不会运行。
func TestChildEnvironmentDropsPanelSecrets(t *testing.T) {
	t.Setenv("KDAE_PANEL_BOOTSTRAP_TOKEN", "super-secret")
	t.Setenv("KDAE_PANEL_DATABASE", "/var/lib/kdae-panel/panel.db")
	t.Setenv("HTTPS_PROXY", "http://127.0.0.1:1080")

	environment := childEnvironment()
	joined := strings.Join(environment, "\n")
	if strings.Contains(joined, "super-secret") {
		t.Fatal("初始化凭据不应出现在子进程环境中")
	}
	for _, entry := range environment {
		if strings.HasPrefix(entry, panelPrefix) {
			t.Fatalf("面板自身配置不应传给子进程: %s", entry)
		}
	}
	// 代理与 PATH 必须保留：dae 拉取订阅可能依赖它们
	if !strings.Contains(joined, "HTTPS_PROXY=http://127.0.0.1:1080") {
		t.Fatal("代理设置应当继承，否则会破坏 dae 拉取订阅")
	}
	if os.Getenv("PATH") != "" && !strings.Contains(joined, "PATH=") {
		t.Fatal("PATH 应当继承")
	}
}
