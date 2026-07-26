package geodata

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/upstream"
)

// ctxRecordingReloader 记录每次进入 Reload 时 ctx 的状态。
type ctxRecordingReloader struct {
	calls int
	errs  map[int]error
}

func (r *ctxRecordingReloader) Reload(ctx context.Context) error {
	r.calls++
	if r.errs == nil {
		r.errs = map[int]error{}
	}
	r.errs[r.calls] = ctx.Err()
	if ctx.Err() != nil {
		return ctx.Err()
	}
	if r.calls == 1 {
		return errors.New("dae 拒绝了新的 geo 数据")
	}
	return nil
}

func TestAuditProbeCompensatingReloadUsesExhaustedCtx(t *testing.T) {
	manager, _, _, directory := newTestManager(t)
	recorder := &ctxRecordingReloader{}
	manager.reloader = recorder
	seedGeo(t, directory, upstream.GeoIPName, "old-geoip")
	seedGeo(t, directory, upstream.GeoSiteName, "old-geosite")

	data, err := manager.Download(context.Background(), upstream.GeoSourceLoyalsoldier)
	if err != nil {
		t.Fatal(err)
	}

	// 模拟"下载吃光了 10 分钟预算"：进入 Apply 时 ctx 还活着，第一次 reload 时耗尽。
	ctx, cancel := context.WithTimeout(context.Background(), 40*time.Millisecond)
	defer cancel()
	go func() { time.Sleep(60 * time.Millisecond) }()
	time.Sleep(50 * time.Millisecond) // 让预算在进入第一次 reload 前恰好耗尽

	_, applyErr := manager.Apply(ctx, data)
	t.Logf("Apply 返回: %v", applyErr)
	t.Logf("reload 调用次数=%d 各次进入时 ctx.Err()=%v", recorder.calls, recorder.errs)

	if recorder.calls != 2 {
		t.Fatalf("期望两次 reload，实际 %d", recorder.calls)
	}
	if recorder.errs[2] == nil {
		t.Fatal("第二次 reload 的 ctx 竟然还活着")
	}
}
