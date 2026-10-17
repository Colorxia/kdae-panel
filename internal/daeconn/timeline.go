package daeconn

import (
	"sync"
	"time"
)

// Timeline 按秒累计计数，只保留最近 span 时长，供连接曲线使用。
//
// 曲线不能从 Store 里数：Store 要保存可展示的明细，上限 2000 条，而面板持续
// 采集一整天后，任何一个正常的家庭网络都远超这个数，曲线会被截成最近几分钟。
// 这里只存计数，24 小时按秒约 340 KB，与明细的容量互不影响。
type Timeline struct {
	mu     sync.Mutex
	counts []uint32
	latest int64 // 已写入的最新 Unix 秒；比它早 len(counts) 秒以上的数据视为过期
	ready  bool
}

// NewTimeline 创建保留 span 时长的计数器，精度为 1 秒。
func NewTimeline(span time.Duration) *Timeline {
	seconds := int(span / time.Second)
	if seconds < 1 {
		seconds = 1
	}
	return &Timeline{counts: make([]uint32, seconds)}
}

// Add 在 at 所在的那一秒上累加 n。比保留范围更早的数据直接丢弃；时间前进时，
// 被覆盖的旧槽位先清零，避免把一天前的计数算进今天。
func (timeline *Timeline) Add(at time.Time, n int) {
	if n <= 0 {
		return
	}
	second := at.Unix()
	timeline.mu.Lock()
	defer timeline.mu.Unlock()
	size := int64(len(timeline.counts))
	switch {
	case !timeline.ready:
		timeline.latest, timeline.ready = second, true
	case second > timeline.latest:
		gap := second - timeline.latest
		if gap >= size {
			clear(timeline.counts)
		} else {
			for step := int64(1); step <= gap; step++ {
				timeline.counts[(timeline.latest+step)%size] = 0
			}
		}
		timeline.latest = second
	case second <= timeline.latest-size:
		return
	}
	timeline.counts[second%size] += uint32(n)
}

// Count 返回 [from, to) 内的计数。一秒内的事件统一算在该秒起点，
// 因此桶边界的精度是 1 秒，对曲线足够。
func (timeline *Timeline) Count(from, to time.Time) int {
	first := ceilUnix(from)
	last := ceilUnix(to) - 1
	timeline.mu.Lock()
	defer timeline.mu.Unlock()
	if !timeline.ready {
		return 0
	}
	size := int64(len(timeline.counts))
	first = max(first, timeline.latest-size+1)
	last = min(last, timeline.latest)
	total := 0
	for second := first; second <= last; second++ {
		total += int(timeline.counts[second%size])
	}
	return total
}

func ceilUnix(value time.Time) int64 {
	second := value.Unix()
	if value.Nanosecond() > 0 {
		second++
	}
	return second
}
