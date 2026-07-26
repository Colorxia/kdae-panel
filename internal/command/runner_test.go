//go:build !windows

package command

import (
	"context"
	"errors"
	"strings"
	"testing"
	"time"
)

// 端到端确认过滤真的作用在被执行的进程上，而不只是那个辅助函数。
func TestRunDoesNotLeakPanelSecretsToChild(t *testing.T) {
	t.Setenv("KDAE_PANEL_BOOTSTRAP_TOKEN", "super-secret")

	result, err := ExecRunner{}.Run(context.Background(), "/bin/sh", "-c", "env")
	if err != nil {
		t.Fatalf("执行失败: %v (%s)", err, result.Stderr)
	}
	if strings.Contains(result.Stdout, "super-secret") {
		t.Fatal("子进程环境里出现了面板的初始化凭据")
	}
}

func TestRunCapturesOutputAndExitCode(t *testing.T) {
	result, err := ExecRunner{}.Run(context.Background(), "/bin/sh", "-c", "echo out; echo err >&2; exit 3")
	if err == nil {
		t.Fatal("非零退出应返回错误")
	}
	if strings.TrimSpace(result.Stdout) != "out" || strings.TrimSpace(result.Stderr) != "err" {
		t.Fatalf("输出捕获异常: %+v", result)
	}
	if result.ExitCode != 3 {
		t.Fatalf("退出码 = %d", result.ExitCode)
	}
}

// WaitDelay 保证子进程把管道交给孙进程时，超时后调用方不会被无限期挂住。
func TestRunHonorsContextCancellation(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	started := time.Now()
	if _, err := (ExecRunner{}).Run(ctx, "/bin/sh", "-c", "sleep 30 & wait"); err == nil {
		t.Fatal("超时应返回错误")
	}
	if elapsed := time.Since(started); elapsed > 20*time.Second {
		t.Fatalf("超时后未及时返回: %v", elapsed)
	}
}

func TestLimitedBuffer(t *testing.T) {
	buffer := newLimitedBuffer(4)

	written, err := buffer.Write([]byte("abcdef"))
	if !errors.Is(err, errOutputLimit) {
		t.Fatalf("错误 = %v，期望输出超限", err)
	}
	if written != 4 || buffer.String() != "abcd" {
		t.Fatalf("写入结果异常: written=%d content=%q", written, buffer.String())
	}
}
