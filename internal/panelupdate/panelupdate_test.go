package panelupdate

import (
	"context"
	"errors"
	"io"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/upstream"
)

type fakeFetcher struct {
	latest  string
	binary  upstream.PanelBinary
	err     error
	asked   string
	askedMu sync.Mutex
}

func (f *fakeFetcher) LatestVersion(context.Context) (string, error) {
	return f.latest, nil
}

func (f *fakeFetcher) Binary(_ context.Context, version string) (upstream.PanelBinary, error) {
	f.askedMu.Lock()
	f.asked = version
	f.askedMu.Unlock()
	if f.err != nil {
		return upstream.PanelBinary{}, f.err
	}
	binary := f.binary
	binary.Version = version
	return binary, nil
}

func (f *fakeFetcher) requested() string {
	f.askedMu.Lock()
	defer f.askedMu.Unlock()
	return f.asked
}

type fakeService struct {
	mu       sync.Mutex
	restarts int
	err      error
}

func (s *fakeService) RestartSelf(context.Context) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.restarts++
	return s.err
}

func (s *fakeService) count() int {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.restarts
}

func elfBytes(marker string) []byte {
	return append([]byte(elfMagic), []byte(marker)...)
}

func newTestManager(t *testing.T, fetcher *fakeFetcher, service *fakeService) (*Manager, string) {
	t.Helper()
	directory := t.TempDir()
	binaryPath := filepath.Join(directory, "bin", "kdae-panel")
	if err := os.MkdirAll(filepath.Dir(binaryPath), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(binaryPath, elfBytes("old"), 0o755); err != nil {
		t.Fatal(err)
	}
	manager, err := New(Options{
		Version:    "v0.1.0",
		BinaryPath: binaryPath,
		BackupPath: filepath.Join(directory, "state", "kdae-panel.previous"),
		Fetcher:    fetcher,
		Service:    service,
		Logger:     slog.New(slog.NewTextHandler(io.Discard, nil)),
	})
	if err != nil {
		t.Fatal(err)
	}
	// 默认让自证通过并报出被写入文件的版本，测试各自按需覆盖
	manager.probe = func(_ context.Context, path string) (string, error) {
		content, err := os.ReadFile(path)
		if err != nil {
			return "", err
		}
		return strings.TrimPrefix(string(content), elfMagic), nil
	}
	return manager, binaryPath
}

// 等待 Apply 里那个延后发出的重启请求。
func waitRestart(t *testing.T, service *fakeService, want int) {
	t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		if service.count() >= want {
			return
		}
		time.Sleep(20 * time.Millisecond)
	}
	t.Fatalf("等待重启请求超时，实际 %d 次，期望 %d 次", service.count(), want)
}

func TestApplyReplacesBinaryBacksUpAndRestarts(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v0.2.0")}}
	service := &fakeService{}
	manager, binaryPath := newTestManager(t, fetcher, service)

	binary, err := manager.Download(context.Background(), "")
	if err != nil {
		t.Fatal(err)
	}
	if fetcher.requested() != "v0.2.0" {
		t.Fatalf("未指定版本时应取最新，实际请求 %q", fetcher.requested())
	}
	if err := manager.Apply(context.Background(), binary); err != nil {
		t.Fatal(err)
	}

	content, err := os.ReadFile(binaryPath)
	if err != nil {
		t.Fatal(err)
	}
	if string(content) != string(elfBytes("v0.2.0")) {
		t.Fatalf("二进制未被替换：%q", content)
	}
	// 自升级没有自动回滚，上一版副本是唯一退路，必须存在且是替换前那一份
	backup, err := os.ReadFile(manager.backupPath)
	if err != nil {
		t.Fatalf("应保留上一版副本: %v", err)
	}
	if string(backup) != string(elfBytes("old")) {
		t.Fatalf("副本内容 = %q，期望替换前的旧版本", backup)
	}
	waitRestart(t, service, 1)
}

// 自证失败必须在替换之前中止：换完再重启就是拿自己做实验，无从补救。
func TestApplyAbortsWhenNewBinaryCannotRun(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v0.2.0")}}
	service := &fakeService{}
	manager, binaryPath := newTestManager(t, fetcher, service)
	manager.probe = func(context.Context, string) (string, error) {
		return "", errors.New("exec format error")
	}

	binary, err := manager.Download(context.Background(), "v0.2.0")
	if err != nil {
		t.Fatal(err)
	}
	err = manager.Apply(context.Background(), binary)
	if err == nil || !strings.Contains(err.Error(), "无法在本机运行") {
		t.Fatalf("应因自证失败而中止，err = %v", err)
	}

	content, _ := os.ReadFile(binaryPath)
	if string(content) != string(elfBytes("old")) {
		t.Fatal("中止后原二进制必须原样保留")
	}
	if _, err := os.Stat(manager.backupPath); !os.IsNotExist(err) {
		t.Fatal("没有替换就不该留下副本")
	}
	if service.count() != 0 {
		t.Fatal("中止后不得重启")
	}
}

// 自证报出的版本与预期不符，说明下载或解包取错了东西，同样必须中止。
func TestApplyAbortsOnVersionMismatch(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v9.9.9")}}
	service := &fakeService{}
	manager, binaryPath := newTestManager(t, fetcher, service)

	binary, err := manager.Download(context.Background(), "v0.2.0")
	if err != nil {
		t.Fatal(err)
	}
	err = manager.Apply(context.Background(), binary)
	if err == nil || !strings.Contains(err.Error(), "与预期的") {
		t.Fatalf("版本不符应中止，err = %v", err)
	}
	content, _ := os.ReadFile(binaryPath)
	if string(content) != string(elfBytes("old")) {
		t.Fatal("中止后原二进制必须原样保留")
	}
	if service.count() != 0 {
		t.Fatal("中止后不得重启")
	}
}

func TestDownloadRejectsSameVersionAndNonELF(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.1.0", binary: upstream.PanelBinary{Content: elfBytes("v0.1.0")}}
	manager, _ := newTestManager(t, fetcher, &fakeService{})

	if _, err := manager.Download(context.Background(), "v0.1.0"); err == nil ||
		!strings.Contains(err.Error(), "无需升级") {
		t.Fatalf("升级到当前版本应被拒绝，err = %v", err)
	}

	fetcher.binary = upstream.PanelBinary{Content: []byte("#!/bin/sh\necho hi\n")}
	if _, err := manager.Download(context.Background(), "v0.2.0"); err == nil ||
		!strings.Contains(err.Error(), "不是 Linux 可执行文件") {
		t.Fatalf("非 ELF 内容应被拒绝，err = %v", err)
	}
}

// 目录不可写时必须在状态里说清楚，而不是等到替换那一刻才失败。
func TestStatusReportsUnwritableBinaryDir(t *testing.T) {
	manager, binaryPath := newTestManager(t, &fakeFetcher{}, &fakeService{})
	// 祖先是普通文件而非目录：这条路径永远建不出来
	blocker := filepath.Join(filepath.Dir(filepath.Dir(binaryPath)), "a-file")
	if err := os.WriteFile(blocker, []byte("not a directory"), 0o644); err != nil {
		t.Fatal(err)
	}
	manager.binaryPath = filepath.Join(blocker, "bin", "kdae-panel")

	status := manager.Status(context.Background())
	if status.Updatable {
		t.Fatal("目录不可写时不应报告可升级")
	}
	if !strings.Contains(status.Problem, "ReadWritePaths") {
		t.Fatalf("应指明需要加入 ReadWritePaths: %s", status.Problem)
	}
}

// 重启请求失败不该让已完成的替换回退：新版本已在磁盘上，
// 下次重启就会生效，此时谎报失败反而会诱导用户重复升级。
func TestApplySucceedsEvenIfRestartRequestFails(t *testing.T) {
	fetcher := &fakeFetcher{latest: "v0.2.0", binary: upstream.PanelBinary{Content: elfBytes("v0.2.0")}}
	service := &fakeService{err: errors.New("systemctl 不可用")}
	manager, binaryPath := newTestManager(t, fetcher, service)

	binary, err := manager.Download(context.Background(), "v0.2.0")
	if err != nil {
		t.Fatal(err)
	}
	if err := manager.Apply(context.Background(), binary); err != nil {
		t.Fatalf("替换已完成，不应因重启请求失败而报错: %v", err)
	}
	content, _ := os.ReadFile(binaryPath)
	if string(content) != string(elfBytes("v0.2.0")) {
		t.Fatal("二进制应已替换")
	}
	waitRestart(t, service, 1)
}
