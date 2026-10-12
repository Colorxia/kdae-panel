package daeconn

import (
	"testing"
	"time"
)

func TestTimelineCountsWithinRange(t *testing.T) {
	base := time.Date(2026, 10, 12, 12, 0, 0, 0, time.UTC)
	timeline := NewTimeline(time.Hour)
	timeline.Add(base, 2)
	timeline.Add(base.Add(500*time.Millisecond), 1) // 同一秒
	timeline.Add(base.Add(10*time.Second), 4)
	timeline.Add(base.Add(5*time.Second), 3) // 乱序写入仍在保留范围内

	if got := timeline.Count(base, base.Add(time.Minute)); got != 10 {
		t.Fatalf("总数 = %d，期望 10", got)
	}
	if got := timeline.Count(base, base.Add(time.Second)); got != 3 {
		t.Fatalf("第一秒 = %d，期望 3", got)
	}
	// [from, to) 半开区间：相邻两段不重不漏。
	left := timeline.Count(base, base.Add(5*time.Second))
	right := timeline.Count(base.Add(5*time.Second), base.Add(time.Minute))
	if left != 3 || right != 7 {
		t.Fatalf("相邻区间 = %d + %d，期望 3 + 7", left, right)
	}
	// 区间起点落在秒中间时，这一秒不计入（事件按所在秒的起点计）。
	if got := timeline.Count(base.Add(500*time.Millisecond), base.Add(5*time.Second)); got != 0 {
		t.Fatalf("从秒中间开始 = %d，期望 0", got)
	}
}

func TestTimelineDropsExpiredAndClearsReusedSlots(t *testing.T) {
	base := time.Date(2026, 10, 12, 12, 0, 0, 0, time.UTC)
	timeline := NewTimeline(time.Minute)
	timeline.Add(base, 5)
	// 一整圈之后写入同一个槽位：旧计数必须先清零，不能把一分钟前的数算进来。
	timeline.Add(base.Add(time.Minute), 1)
	if got := timeline.Count(base.Add(time.Minute), base.Add(time.Minute+time.Second)); got != 1 {
		t.Fatalf("复用槽位 = %d，期望 1", got)
	}
	if got := timeline.Count(base, base.Add(time.Second)); got != 0 {
		t.Fatalf("已过期的一秒 = %d，期望 0", got)
	}
	// 比保留范围更早的写入直接丢弃。
	timeline.Add(base.Add(-time.Hour), 9)
	if got := timeline.Count(base.Add(-2*time.Hour), base.Add(2*time.Minute)); got != 1 {
		t.Fatalf("过期写入未被丢弃，总数 = %d", got)
	}
	// 时间一次跳过超过一整圈，整张表清空。
	timeline.Add(base.Add(10*time.Minute), 2)
	if got := timeline.Count(base, base.Add(20*time.Minute)); got != 2 {
		t.Fatalf("长时间跳跃后 = %d，期望 2", got)
	}
}

func TestTimelineEmpty(t *testing.T) {
	timeline := NewTimeline(time.Hour)
	if got := timeline.Count(time.Now().Add(-time.Hour), time.Now()); got != 0 {
		t.Fatalf("空计数器 = %d", got)
	}
	timeline.Add(time.Now(), 0)
	timeline.Add(time.Now(), -3)
	if got := timeline.Count(time.Now().Add(-time.Hour), time.Now().Add(time.Second)); got != 0 {
		t.Fatalf("非正数写入应被忽略，得到 %d", got)
	}
}
