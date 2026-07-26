package geodata

import (
	"context"
	"errors"
	"io"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

type fakeFetcher struct {
	release upstream.GeoRelease
	files   map[string][]byte
	err     error
	calls   int
}

func (f *fakeFetcher) Latest(context.Context) (upstream.GeoRelease, error) {
	if f.err != nil {
		return upstream.GeoRelease{}, f.err
	}
	return f.release, nil
}

func (f *fakeFetcher) Fetch(_ context.Context, release upstream.GeoRelease) (upstream.GeoData, error) {
	f.calls++
	if f.err != nil {
		return upstream.GeoData{}, f.err
	}
	return upstream.GeoData{Release: release, Files: f.files}, nil
}

func (f *fakeFetcher) Repository() string { return "example/geo" }

type fakeService struct {
	environment map[string]string
	err         error
}

func (s *fakeService) Status(context.Context) (host.Status, error) {
	if s.err != nil {
		return host.Status{}, s.err
	}
	return host.Status{Environment: s.environment}, nil
}

type fakeReloader struct {
	calls int
	// failFirst 让第一次 reload 失败，模拟 dae 不接受新 geo 数据。
	failFirst bool
}

func (r *fakeReloader) Reload(context.Context) error {
	r.calls++
	if r.failFirst && r.calls == 1 {
		return errors.New("dae 拒绝了新的 geo 数据")
	}
	return nil
}

func newTestManager(t *testing.T) (*Manager, *fakeFetcher, *fakeReloader, string) {
	t.Helper()
	directory := t.TempDir()
	fetcher := &fakeFetcher{
		release: upstream.GeoRelease{Tag: "202607252248"},
		files: map[string][]byte{
			upstream.GeoIPName:   []byte("new-geoip"),
			upstream.GeoSiteName: []byte("new-geosite"),
		},
	}
	reloader := &fakeReloader{}
	manager, err := New(Options{
		ConfigPath: filepath.Join(directory, "config.dae"),
		StatePath:  filepath.Join(directory, "state", "geo-update.json"),
		Fetcher:    fetcher,
		Service:    &fakeService{},
		Reloader:   reloader,
		Logger:     slog.New(slog.NewTextHandler(io.Discard, nil)),
	})
	if err != nil {
		t.Fatal(err)
	}
	return manager, fetcher, reloader, directory
}

func seedGeo(t *testing.T, directory, name, content string) string {
	t.Helper()
	if err := os.MkdirAll(directory, 0o755); err != nil {
		t.Fatal(err)
	}
	path := filepath.Join(directory, name)
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}
	return path
}

func TestUpdateWritesBothFilesAndReloads(t *testing.T) {
	manager, _, reloader, directory := newTestManager(t)

	data, err := manager.Download(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	status, err := manager.Apply(context.Background(), data)
	if err != nil {
		t.Fatalf("更新应成功: %v", err)
	}

	for name, want := range map[string]string{
		upstream.GeoIPName: "new-geoip", upstream.GeoSiteName: "new-geosite",
	} {
		content, err := os.ReadFile(filepath.Join(directory, name))
		if err != nil {
			t.Fatalf("%s 应已写入: %v", name, err)
		}
		if string(content) != want {
			t.Fatalf("%s = %q，期望 %q", name, content, want)
		}
	}
	// 更新完必须让 dae 重新读，否则文件换了也不生效
	if reloader.calls != 1 {
		t.Fatalf("应恰好 reload 一次，实际 %d 次", reloader.calls)
	}
	if status.Managed == nil || status.Managed.Tag != "202607252248" {
		t.Fatalf("应记录更新到哪一版: %+v", status.Managed)
	}
}

// dae validate 察觉不到 geo 的问题，一份 dae 不接受的 geo 会让 reload 失败，
// 而 dae 不运行时流量就不再被透明代理接管——必须能退回原样。
func TestUpdateRestoresPreviousDataWhenReloadFails(t *testing.T) {
	manager, _, reloader, directory := newTestManager(t)
	reloader.failFirst = true
	seedGeo(t, directory, upstream.GeoIPName, "old-geoip")
	seedGeo(t, directory, upstream.GeoSiteName, "old-geosite")

	data, err := manager.Download(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if _, err := manager.Apply(context.Background(), data); err == nil {
		t.Fatal("reload 失败时更新应报错")
	}

	for name, want := range map[string]string{
		upstream.GeoIPName: "old-geoip", upstream.GeoSiteName: "old-geosite",
	} {
		content, err := os.ReadFile(filepath.Join(directory, name))
		if err != nil {
			t.Fatal(err)
		}
		if string(content) != want {
			t.Fatalf("%s = %q，应已还原为 %q", name, content, want)
		}
	}
	// 还原之后要再 reload 一次，让 dae 读回旧数据
	if reloader.calls != 2 {
		t.Fatalf("应在还原后再 reload 一次，实际共 %d 次", reloader.calls)
	}
	// 回滚点是临时的，不该留在磁盘上白占几十兆
	leftovers, _ := filepath.Glob(filepath.Join(directory, "*.kdae-panel-previous"))
	if len(leftovers) != 0 {
		t.Fatalf("不应留下回滚点: %v", leftovers)
	}
}

func TestUpdateRemovesBackupAfterSuccess(t *testing.T) {
	manager, _, _, directory := newTestManager(t)
	seedGeo(t, directory, upstream.GeoIPName, "old-geoip")

	data, err := manager.Download(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if _, err := manager.Apply(context.Background(), data); err != nil {
		t.Fatal(err)
	}
	leftovers, _ := filepath.Glob(filepath.Join(directory, "*.kdae-panel-previous"))
	if len(leftovers) != 0 {
		t.Fatalf("成功后应删掉回滚点: %v", leftovers)
	}
	// 暂存文件也不该留下
	staged, _ := filepath.Glob(filepath.Join(directory, ".kdae-panel-*"))
	if len(staged) != 0 {
		t.Fatalf("不应留下暂存文件: %v", staged)
	}
}

// DAE_LOCATION_ASSET 的优先级高于一切。忽略它就会把 geo 写到 dae 根本不读的
// 地方，更新"成功"却毫无效果。
func TestSearchPathHonoursLocationAsset(t *testing.T) {
	paths := SearchPath("/etc/dae/config.dae", map[string]string{LocationAssetEnv: "/opt/geo"})
	if len(paths) == 0 || paths[0] != "/opt/geo" {
		t.Fatalf("DAE_LOCATION_ASSET 应排在最前: %v", paths)
	}
	if paths[1] != filepath.Dir("/etc/dae/config.dae") {
		t.Fatalf("配置目录应排在第二位: %v", paths)
	}
}

func TestSearchPathWithoutLocationAsset(t *testing.T) {
	paths := SearchPath("/etc/dae/config.dae", nil)
	if paths[0] != filepath.Dir("/etc/dae/config.dae") {
		t.Fatalf("没有环境变量时配置目录应排在最前: %v", paths)
	}
}

// dae 只读优先级最高的那一份，被遮蔽的副本必须说出来——否则用户会以为
// "我明明更新了却没生效"。
func TestStatusReportsShadowedCopies(t *testing.T) {
	manager, _, _, directory := newTestManager(t)
	system := filepath.Join(directory, "system")
	seedGeo(t, directory, upstream.GeoIPName, "effective")
	seedGeo(t, system, upstream.GeoIPName, "shadowed")

	files := locate([]string{directory, system}, []string{upstream.GeoIPName})
	if len(files) != 1 || !files[0].Present {
		t.Fatalf("应找到文件: %+v", files)
	}
	if files[0].Path != filepath.Join(directory, upstream.GeoIPName) {
		t.Fatalf("应以优先级最高的那一份为准: %s", files[0].Path)
	}
	if len(files[0].Shadowed) != 1 {
		t.Fatalf("应列出被遮蔽的副本: %+v", files[0].Shadowed)
	}
	_ = manager
}

// 就地更新实际生效的那一份，而不是无脑写死某个目录：dae-installer 把 geo 装在
// /usr/local/share/dae，改往配置目录写会生成一份优先级更高的副本，从此用户跑
// 上游更新脚本毫无效果且没有任何提示。
func TestTargetDirFollowsEffectiveFile(t *testing.T) {
	directory := t.TempDir()
	system := filepath.Join(directory, "usr-local-share-dae")
	seedGeo(t, system, upstream.GeoIPName, "installed-by-dae-installer")

	files := locate([]string{filepath.Join(directory, "etc-dae"), system}, Names)
	target := targetDir(files, filepath.Join(directory, "etc-dae"))
	if target != system {
		t.Fatalf("应就地更新 %s，实际选了 %s", system, target)
	}
}

func TestTargetDirFallsBackToConfigDir(t *testing.T) {
	directory := t.TempDir()
	configDir := filepath.Join(directory, "etc-dae")
	files := locate([]string{configDir, filepath.Join(directory, "system")}, Names)
	if target := targetDir(files, configDir); target != configDir {
		t.Fatalf("都不存在时应退回配置目录，实际 %s", target)
	}
}

func TestStatusReportsUnwritableTarget(t *testing.T) {
	manager, _, _, directory := newTestManager(t)
	// 祖先是普通文件而非目录：这条路径永远建不出来
	blocker := filepath.Join(directory, "a-file")
	if err := os.WriteFile(blocker, []byte("not a directory"), 0o644); err != nil {
		t.Fatal(err)
	}
	manager.configPath = filepath.Join(blocker, "dae", "config.dae")

	status := manager.Status(context.Background())
	if status.Updatable {
		t.Fatal("目录不可写时不应报告可更新")
	}
	if !strings.Contains(status.Problem, "ReadWritePaths") {
		t.Fatalf("应指明需要加入 ReadWritePaths: %s", status.Problem)
	}
}

// 两个文件来自同一次发布，只换掉其中一个会让 dae 拿着两个版本的规则集跑，
// 而这种不一致既不报错也无从察觉。
func TestApplyRejectsEmptyContent(t *testing.T) {
	manager, fetcher, reloader, directory := newTestManager(t)
	fetcher.files = map[string][]byte{
		upstream.GeoIPName:   []byte("new-geoip"),
		upstream.GeoSiteName: {},
	}
	seedGeo(t, directory, upstream.GeoIPName, "old-geoip")

	data, err := manager.Download(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if _, err := manager.Apply(context.Background(), data); err == nil {
		t.Fatal("内容为空时应拒绝写入")
	}
	if reloader.calls != 0 {
		t.Fatal("拒绝写入时不该 reload")
	}
	content, _ := os.ReadFile(filepath.Join(directory, upstream.GeoIPName))
	if string(content) != "old-geoip" {
		t.Fatalf("旧数据不该被动过: %q", content)
	}
}
