package app

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"sync"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/dae"
	"github.com/tuoro/kdae-panel/internal/daeconn"
	"github.com/tuoro/kdae-panel/internal/host"
)

// fakeJournal 按实测的 journalctl 语义模拟 ReadLogs：不带游标取最近 Limit 条，
// 带游标取游标之后的前 Limit 条。游标不存在时报错，模拟被轮转清理。
type fakeJournal struct {
	mu        sync.Mutex
	status    host.Status
	entries   []host.LogEntry
	reads     int
	failAfter bool // 下一次带游标的读取失败一次
}

func (journal *fakeJournal) Status(context.Context) (host.Status, error) {
	journal.mu.Lock()
	defer journal.mu.Unlock()
	return journal.status, nil
}

func (journal *fakeJournal) ReadLogs(_ context.Context, query host.LogQuery) ([]host.LogEntry, error) {
	journal.mu.Lock()
	defer journal.mu.Unlock()
	journal.reads++
	if query.After == "" {
		start := max(len(journal.entries)-query.Limit, 0)
		return append([]host.LogEntry(nil), journal.entries[start:]...), nil
	}
	if journal.failAfter {
		journal.failAfter = false
		return nil, errors.New("Failed to seek to cursor: Invalid argument")
	}
	for index, entry := range journal.entries {
		if entry.Cursor == query.After {
			end := min(index+1+query.Limit, len(journal.entries))
			return append([]host.LogEntry(nil), journal.entries[index+1:end]...), nil
		}
	}
	return nil, errors.New("Failed to seek to cursor: Invalid argument")
}

// add 追加一条连接日志（v2 格式），pid 为空时用当前 MainPID。
func (journal *fakeJournal) add(at time.Time, target string) {
	journal.addRaw(at, fmt.Sprintf(" INFO 192.0.2.1:1 <-> %s dialer=tokyo ip=203.0.113.1:443 network=tcp4 outbound=proxy", target), "")
}

func (journal *fakeJournal) addRaw(at time.Time, message, pid string) {
	journal.mu.Lock()
	defer journal.mu.Unlock()
	if pid == "" {
		pid = fmt.Sprint(journal.status.MainPID)
	}
	journal.entries = append(journal.entries, host.LogEntry{
		Timestamp: at, Message: message, PID: pid, Cursor: fmt.Sprintf("c%d", len(journal.entries)+1),
	})
}

func newCollectorTracker(t *testing.T, journal *fakeJournal, daeService DaeService) *connectionTracker {
	t.Helper()
	if daeService == nil {
		daeService = stubDaeService{}
	}
	return registerConnectionRoutes(http.NewServeMux(), daeService, journal, nil, nil,
		&stubConnectionSnapshotter{snapshot: daeconn.Snapshot{Endpoints: map[string]int{}}})
}

func requestConnections(t *testing.T, tracker *connectionTracker, query string) connectionsResponse {
	t.Helper()
	recorder := httptest.NewRecorder()
	tracker.handle(recorder, httptest.NewRequest(http.MethodGet, "/api/v1/connections"+query, nil))
	if recorder.Code != http.StatusOK {
		t.Fatalf("状态码 = %d，响应 = %s", recorder.Code, recorder.Body.String())
	}
	var response connectionsResponse
	if err := json.NewDecoder(recorder.Body).Decode(&response); err != nil {
		t.Fatal(err)
	}
	return response
}

func seriesTotal(series []connectionBucket) int {
	total := 0
	for _, bucket := range series {
		total += bucket.Count
	}
	return total
}

// 用户报告的问题：首页曲线只从打开面板那一刻开始统计。面板启动后必须在没有任何
// 页面请求的情况下持续采集，打开页面时历史已经在了。
func TestConnectionCollectorRunsWithoutPageViews(t *testing.T) {
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	tracker := newCollectorTracker(t, journal, nil)
	tracker.collectInterval = 10 * time.Millisecond
	tracker.start(slog.New(slog.NewTextHandler(io.Discard, nil)))
	defer tracker.Close()

	now := time.Now().UTC()
	for index := range 5 {
		journal.add(now.Add(-time.Duration(5-index)*time.Minute), fmt.Sprintf("t%d.example:443", index))
		time.Sleep(30 * time.Millisecond) // 让后台每条都按增量读到
	}
	deadline := time.Now().Add(5 * time.Second)
	for tracker.accepted.Count(now.Add(-time.Hour), now.Add(time.Minute)) < 5 {
		if time.Now().After(deadline) {
			t.Fatalf("后台采集 5 秒内只记到 %d 条，没有页面请求时不应停止统计",
				tracker.accepted.Count(now.Add(-time.Hour), now.Add(time.Minute)))
		}
		time.Sleep(10 * time.Millisecond)
	}
	if err := tracker.Close(); err != nil {
		t.Fatal(err)
	}
}

// 打开页面时，曲线要覆盖 journald 里已有的历史，而不是从这一刻开始。
func TestConnectionCurveIncludesHistoryOnFirstView(t *testing.T) {
	now := time.Now().UTC()
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	journal.addRaw(now.Add(-20*time.Minute), " INFO Started dae", "")
	for _, minutesAgo := range []int{14, 10, 5, 1} {
		journal.add(now.Add(-time.Duration(minutesAgo)*time.Minute), "example.com:443")
	}
	tracker := newCollectorTracker(t, journal, nil)

	response := requestConnections(t, tracker, "?window=15&buckets=15")
	if response.Summary.WindowEvents != 4 || seriesTotal(response.Series) != 4 {
		t.Fatalf("首次打开应看到 4 条历史连接: windowEvents=%d series=%d", response.Summary.WindowEvents, seriesTotal(response.Series))
	}
	if response.Series[0].Count != 1 {
		t.Fatalf("最早的桶应包含 14 分钟前的连接: %+v", response.Series)
	}
	// 覆盖起点早于窗口，页面就不应提示"只从某时刻开始记录"。
	if response.SeriesSince == nil || response.SeriesSince.After(now.Add(-15*time.Minute)) {
		t.Fatalf("覆盖起点应早于窗口起点: %v", response.SeriesSince)
	}
}

// 游标接续读取：后续采集只计新日志，同一条不会计两次。
func TestConnectionCollectorFollowsCursorWithoutDoubleCounting(t *testing.T) {
	now := time.Now().UTC()
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	journal.add(now.Add(-3*time.Minute), "a.example:443")
	journal.add(now.Add(-2*time.Minute), "b.example:443")
	tracker := newCollectorTracker(t, journal, nil)

	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	tracker.syncLocked(context.Background()) // 没有新日志，再读一次也不能重复计数
	tracker.syncMu.Unlock()
	journal.add(now.Add(-time.Minute), "c.example:443")
	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	tracker.syncMu.Unlock()

	if got := tracker.accepted.Count(now.Add(-time.Hour), now.Add(time.Minute)); got != 3 {
		t.Fatalf("计数 = %d，期望 3（游标接续时不应重复）", got)
	}
}

// 积压超过一批时分多批追上，中间不丢。
func TestConnectionCollectorCatchesUpBacklogInBatches(t *testing.T) {
	now := time.Now().UTC()
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	journal.add(now.Add(-time.Hour), "first.example:443")
	tracker := newCollectorTracker(t, journal, nil)
	tracker.batchSize = 3
	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	tracker.syncMu.Unlock()

	for index := range 10 {
		journal.add(now.Add(-time.Duration(30-index)*time.Minute), fmt.Sprintf("b%d.example:443", index))
	}
	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	tracker.syncMu.Unlock()
	if got := tracker.accepted.Count(now.Add(-2*time.Hour), now.Add(time.Minute)); got != 11 {
		t.Fatalf("计数 = %d，期望 11（积压 10 条、每批 3 条应分批读完）", got)
	}
}

// 曲线与总数不受明细 2000 条上限影响；明细被截断时如实标记。
func TestConnectionCurveIsNotCappedByStoreCapacity(t *testing.T) {
	now := time.Now().UTC()
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	const total = 2500
	for index := range total {
		journal.add(now.Add(-10*time.Minute+time.Duration(index)*200*time.Millisecond), fmt.Sprintf("t%d.example:443", index))
	}
	tracker := newCollectorTracker(t, journal, nil)

	response := requestConnections(t, tracker, "?window=15&buckets=60")
	if response.Summary.WindowEvents != total || seriesTotal(response.Series) != total {
		t.Fatalf("曲线被明细上限截短: windowEvents=%d series=%d，期望 %d",
			response.Summary.WindowEvents, seriesTotal(response.Series), total)
	}
	if !response.Truncated {
		t.Fatal("明细只保留了 2000 条，应标记 truncated")
	}
}

// 收 debug 级日志时只认当前进程，本次启动之前的那段时间同样不可信。
func TestConnectionCoverageStartsAtProcessStartForDebug(t *testing.T) {
	now := time.Now().UTC().Truncate(time.Second)
	started := now.Add(-5 * time.Minute)
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active", ActiveSince: started.Format(time.RFC3339)}}
	journal.addRaw(now.Add(-30*time.Minute), "DEBUG 192.0.2.1:1 <-> old.example:443 dialer=tokyo ip=203.0.113.1:443 network=tcp4 outbound=proxy", "41")
	journal.addRaw(now.Add(-time.Minute), "DEBUG 192.0.2.1:1 <-> new.example:443 dialer=tokyo ip=203.0.113.1:443 network=tcp4 outbound=proxy", "42")
	tracker := newCollectorTracker(t, journal, stubDaeService{report: dae.Report{
		Available: true, Version: "dae version unstable-20260825.r1148.502d97",
	}})

	response := requestConnections(t, tracker, "?window=15")
	if response.SeriesSince == nil || !response.SeriesSince.Equal(started) {
		t.Fatalf("debug 模式的覆盖起点应为进程启动时间 %s，得到 %v", started, response.SeriesSince)
	}
	if response.Summary.WindowEvents != 1 {
		t.Fatalf("旧进程的 debug 行不应计入: windowEvents=%d", response.Summary.WindowEvents)
	}
}

// 游标对应的记录被 journald 清理后重新回填：已经计过的不重复计，覆盖起点只能后移。
func TestConnectionCollectorRecoversFromLostCursor(t *testing.T) {
	now := time.Now().UTC()
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	journal.add(now.Add(-3*time.Minute), "a.example:443")
	journal.add(now.Add(-2*time.Minute), "b.example:443")
	tracker := newCollectorTracker(t, journal, nil)
	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	coverageBefore := tracker.coverage
	tracker.syncMu.Unlock()

	journal.add(now.Add(-time.Minute), "c.example:443")
	journal.mu.Lock()
	journal.failAfter = true
	journal.mu.Unlock()
	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	coverageAfter := tracker.coverage
	tracker.syncMu.Unlock()

	if got := tracker.accepted.Count(now.Add(-time.Hour), now.Add(time.Minute)); got != 3 {
		t.Fatalf("游标失效后计数 = %d，期望 3（a、b 不应重复计）", got)
	}
	if coverageAfter.Before(coverageBefore) {
		t.Fatalf("覆盖起点不能前移: %s -> %s", coverageBefore, coverageAfter)
	}
}

func TestConnectionTrackerCloseWithoutStart(t *testing.T) {
	tracker := newCollectorTracker(t, &fakeJournal{}, nil)
	if err := tracker.Close(); err != nil {
		t.Fatal(err)
	}
}

// journald 里一条 dae 日志都没有时，起点保持未定：页面要说"尚未采集到任何记录"，
// 而不是从此刻开始画一条零线（e2e 也验证这句提示）。读到日志后才确定起点。
func TestConnectionCoverageStaysUnsetUntilFirstLog(t *testing.T) {
	journal := &fakeJournal{status: host.Status{MainPID: 42, ActiveState: "active"}}
	tracker := newCollectorTracker(t, journal, nil)
	if response := requestConnections(t, tracker, "?window=15"); response.SeriesSince != nil || !response.LogsOK {
		t.Fatalf("空日志时不应给出覆盖起点: seriesSince=%v logsOk=%v", response.SeriesSince, response.LogsOK)
	}

	started := time.Now().UTC().Add(-3 * time.Minute)
	journal.addRaw(started, " INFO Started dae", "")
	tracker.syncMu.Lock()
	tracker.syncLocked(context.Background())
	coverage := tracker.coverage
	tracker.syncMu.Unlock()
	if !coverage.Equal(started) {
		t.Fatalf("读到第一条日志后起点应为它的时间 %s，得到 %s", started, coverage)
	}
}
