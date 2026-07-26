package command

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strings"
	"time"
)

// outputLimit 要兜住 dae sysdump、journalctl 这类最大宗的输出，
// 同时挡住失控子进程刷屏把面板内存打爆。
const outputLimit = 8 << 20

type Result struct {
	Stdout   string
	Stderr   string
	ExitCode int
}

// Describe 从失败的命令里挑出最有用的那句话给用户看。
// 先 stderr 后 stdout，都空了才退回 Go 的错误文本——后者往往只是
// "exit status 1"，对排障毫无帮助。
func Describe(err error, result Result) string {
	message := strings.TrimSpace(result.Stderr)
	if message == "" {
		message = strings.TrimSpace(result.Stdout)
	}
	if message == "" {
		message = err.Error()
	}
	return message
}

type Runner interface {
	Run(ctx context.Context, name string, args ...string) (Result, error)
}

// DirectoryRunner 支持输出契约依赖当前工作目录的命令。
type DirectoryRunner interface {
	Runner
	RunInDir(ctx context.Context, dir, name string, args ...string) (Result, error)
}

type ExecRunner struct{}

func (r ExecRunner) Run(ctx context.Context, name string, args ...string) (Result, error) {
	return r.run(ctx, "", name, args...)
}

func (r ExecRunner) RunInDir(ctx context.Context, dir, name string, args ...string) (Result, error) {
	return r.run(ctx, dir, name, args...)
}

func (r ExecRunner) run(ctx context.Context, dir, name string, args ...string) (Result, error) {
	stdout := newLimitedBuffer(outputLimit)
	stderr := newLimitedBuffer(outputLimit)
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Dir = dir
	cmd.Stdout = stdout
	cmd.Stderr = stderr
	cmd.Env = childEnvironment()
	// 子进程若把管道交给孙进程，Wait 会一直挂着；超时后给一个宽限期就放弃等待，
	// 否则持有全局控制锁的调用方会被拖死。
	cmd.WaitDelay = 5 * time.Second

	err := cmd.Run()
	result := Result{
		Stdout:   stdout.String(),
		Stderr:   stderr.String(),
		ExitCode: exitCode(err),
	}
	if errors.Is(stdout.Err(), errOutputLimit) || errors.Is(stderr.Err(), errOutputLimit) {
		return result, fmt.Errorf("命令输出超过 %d 字节限制", outputLimit)
	}
	if err != nil {
		return result, err
	}
	return result, nil
}

// childEnvironment 传给子进程的环境变量。
//
// 面板由 systemd 经 EnvironmentFile 启动，自身环境里含有 KDAE_PANEL_ 前缀的
// 配置，其中 KDAE_PANEL_BOOTSTRAP_TOKEN 是初始化凭据。这些不该交给任何子进程，
// 尤其是刚从上游下载、尚未建立信任的 dae 可执行文件。其余变量（PATH、代理设置、
// 语言环境等）照常继承，避免破坏 dae 拉取订阅等既有行为。
func childEnvironment() []string {
	environment := os.Environ()
	filtered := make([]string, 0, len(environment))
	for _, entry := range environment {
		if strings.HasPrefix(entry, panelPrefix) {
			continue
		}
		filtered = append(filtered, entry)
	}
	return filtered
}

// panelPrefix 是面板自身配置的环境变量前缀，一律不传给子进程。
const panelPrefix = "KDAE_PANEL_"

func exitCode(err error) int {
	if err == nil {
		return 0
	}
	var exitErr *exec.ExitError
	if errors.As(err, &exitErr) {
		return exitErr.ExitCode()
	}
	return -1
}

var errOutputLimit = errors.New("输出超过限制")

type limitedBuffer struct {
	buffer    bytes.Buffer
	remaining int64
	err       error
}

func newLimitedBuffer(limit int64) *limitedBuffer {
	return &limitedBuffer{remaining: limit}
}

func (b *limitedBuffer) Write(data []byte) (int, error) {
	if b.err != nil {
		return 0, b.err
	}
	if int64(len(data)) > b.remaining {
		allowed := max(b.remaining, 0)
		if allowed > 0 {
			_, _ = b.buffer.Write(data[:allowed])
		}
		b.remaining = 0
		b.err = errOutputLimit
		return int(allowed), b.err
	}
	written, err := b.buffer.Write(data)
	b.remaining -= int64(written)
	return written, err
}

func (b *limitedBuffer) String() string {
	return b.buffer.String()
}

func (b *limitedBuffer) Err() error {
	return b.err
}

var _ io.Writer = (*limitedBuffer)(nil)
