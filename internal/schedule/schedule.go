// Package schedule 按固定间隔执行一项维护任务,并把设置与上次执行时间持久化。
// 面板用它跑两件事:订阅自动刷新(dae 只在 reload 时重拉 subscription 链接,
// 诚实的实现就是定时 reload)和 geo 数据自动更新。任务在拿不到全局操作锁时
// 应当返回错误跳过本轮,绝不与用户发起的控制操作交叉。
package schedule

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/atomicfile"
)

const (
	MinIntervalMinutes = 5
	// 上限一个月:订阅刷新用不到这么长,但 geo 数据月更是真实存在的偏好。
	MaxIntervalMinutes = 30 * 24 * 60
	defaultInterval    = 24 * 60
	defaultTaskTimeout = 3 * time.Minute
	// 补做错过的轮次时留出的缓冲，避免开机瞬间与 dae 自身启动抢操作锁。
	startupGrace = time.Minute
	// 上一轮失败或被跳过后的重试间隔。
	retryInterval = 5 * time.Minute
)

type Settings struct {
	Enabled         bool `json:"enabled"`
	IntervalMinutes int  `json:"intervalMinutes"`
}

// Status 的时间字段用指针:omitempty 对 time.Time 无效,
// 否则零值会被序列化成 0001-01-01 并被界面当成真实时间渲染。
type Status struct {
	Settings
	LastRunAt *time.Time `json:"lastRunAt,omitempty"`
	LastError string     `json:"lastError,omitempty"`
	NextRunAt *time.Time `json:"nextRunAt,omitempty"`
}

func optionalTime(value time.Time) *time.Time {
	if value.IsZero() {
		return nil
	}
	return &value
}

// InvalidSettingsError 区分"参数非法"与"写入失败",供 HTTP 层映射不同状态码。
type InvalidSettingsError struct {
	Cause error
}

func (e *InvalidSettingsError) Error() string {
	return e.Cause.Error()
}

func (e *InvalidSettingsError) Unwrap() error {
	return e.Cause
}

// Task 执行一轮定时动作;拿不到操作锁等"本轮跳过"情形返回错误即可,
// 错误只记录在状态里,不会停止调度。
type Task func(ctx context.Context) error

// Options 描述一个定时任务。Name 出现在日志与错误文案里;
// Timeout 是单轮执行时限,零值用默认 3 分钟。
type Options struct {
	Path    string
	Name    string
	Task    Task
	Logger  *slog.Logger
	Timeout time.Duration
}

type Runner struct {
	path    string
	name    string
	task    Task
	timeout time.Duration
	logger  *slog.Logger
	now     func() time.Time

	mu        sync.Mutex
	settings  Settings
	lastRunAt time.Time
	lastError string
	nextRunAt time.Time

	reset chan struct{}
	// ctx 在 Close 时取消,同时用于停止循环和中断在途任务,
	// 避免关闭被一轮最长 timeout 的执行拖住。
	ctx       context.Context
	cancel    context.CancelFunc
	closeOnce sync.Once
	wg        sync.WaitGroup
}

func (s Settings) validate() error {
	if s.IntervalMinutes < MinIntervalMinutes || s.IntervalMinutes > MaxIntervalMinutes {
		return fmt.Errorf("刷新间隔必须在 %d 到 %d 分钟之间", MinIntervalMinutes, MaxIntervalMinutes)
	}
	return nil
}

// New 加载持久化设置并启动调度循环。设置文件损坏时退回默认值并告警,
// 不阻止面板启动。
func New(options Options) (*Runner, error) {
	if options.Path == "" {
		return nil, errors.New("定时任务设置路径不能为空")
	}
	if options.Task == nil {
		return nil, errors.New("定时任务不能为空")
	}
	if options.Name == "" {
		options.Name = "定时任务"
	}
	if options.Timeout <= 0 {
		options.Timeout = defaultTaskTimeout
	}
	ctx, cancel := context.WithCancel(context.Background())
	runner := &Runner{
		path:     options.Path,
		name:     options.Name,
		task:     options.Task,
		timeout:  options.Timeout,
		logger:   options.Logger,
		now:      time.Now,
		settings: Settings{Enabled: false, IntervalMinutes: defaultInterval},
		reset:    make(chan struct{}, 1),
		ctx:      ctx,
		cancel:   cancel,
	}
	if err := runner.load(); err != nil {
		runner.logger.Warn("读取"+runner.name+"设置失败，使用默认值", "path", runner.path, "error", err)
	}
	runner.scheduleNextLocked()
	runner.wg.Add(1)
	go runner.loop()
	return runner, nil
}

// persisted 同时保存上次执行时间:否则面板一重启倒计时就从头开始,
// 间隔长于重启周期时(如每周刷新、每天重启)自动刷新永远不会触发。
type persisted struct {
	Settings
	LastRunAt time.Time `json:"lastRunAt"`
}

func (r *Runner) load() error {
	content, err := os.ReadFile(r.path)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	var loaded persisted
	if err := json.Unmarshal(content, &loaded); err != nil {
		return fmt.Errorf("解析设置文件: %w", err)
	}
	if err := loaded.Settings.validate(); err != nil {
		return err
	}
	r.settings = loaded.Settings
	r.lastRunAt = loaded.LastRunAt
	return nil
}

func (r *Runner) save() error {
	content, err := json.Marshal(persisted{Settings: r.settings, LastRunAt: r.lastRunAt})
	if err != nil {
		return err
	}
	// 必须走原子写入：少了 fsync，掉电会把已开启的自动刷新静默还原成关闭。
	return atomicfile.Write(r.path, content, 0600)
}

func (r *Runner) statusLocked() Status {
	return Status{
		Settings:  r.settings,
		LastRunAt: optionalTime(r.lastRunAt),
		LastError: r.lastError,
		NextRunAt: optionalTime(r.nextRunAt),
	}
}

func (r *Runner) Status() Status {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.statusLocked()
}

// Update 校验并持久化新设置,再按 scheduleNextLocked 的规则重排下一轮并唤醒循环。
//
// 刻意不重置成 now+interval:那样频繁改设置就能让订阅永远刷新不到。
// 排期以"上次执行时间 + 间隔"为准,长期停用后重新开启时,
// 错过的轮次会在 startupGrace 之后补做一次。
func (r *Runner) Update(settings Settings) (Status, error) {
	if err := settings.validate(); err != nil {
		return Status{}, &InvalidSettingsError{Cause: err}
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	if settings == r.settings {
		return r.statusLocked(), nil // 无变化的保存不重置倒计时
	}
	previous := r.settings
	r.settings = settings
	if err := r.save(); err != nil {
		r.settings = previous
		return Status{}, err
	}
	r.scheduleNextLocked()
	select {
	case r.reset <- struct{}{}:
	default:
	}
	return r.statusLocked(), nil
}

// scheduleNextLocked 以"上次执行时间 + 间隔"排期,而不是"现在 + 间隔",
// 这样重启或无变化的保存都不会把倒计时重新拉满。错过的轮次会尽快补上,
// 但至少留出 startupGrace,避免开机瞬间就与 dae 自身启动抢操作锁。
//
// 上一轮失败(最常见的是没抢到操作锁而跳过)时改用较短的重试间隔:
// 一次跳过不应该让订阅刷新整整推迟一个完整周期。
func (r *Runner) scheduleNextLocked() {
	if !r.settings.Enabled {
		r.nextRunAt = time.Time{}
		return
	}
	now := r.now()
	interval := time.Duration(r.settings.IntervalMinutes) * time.Minute
	if r.lastError != "" {
		interval = min(interval, retryInterval)
	}
	if r.lastRunAt.IsZero() {
		r.nextRunAt = now.Add(interval)
		return
	}
	next := r.lastRunAt.Add(interval)
	if earliest := now.Add(startupGrace); next.Before(earliest) {
		next = earliest
	}
	r.nextRunAt = next
}

func (r *Runner) loop() {
	defer r.wg.Done()
	for {
		r.mu.Lock()
		nextRunAt := r.nextRunAt
		r.mu.Unlock()

		var timerC <-chan time.Time
		var timer *time.Timer
		if !nextRunAt.IsZero() {
			timer = time.NewTimer(time.Until(nextRunAt))
			timerC = timer.C
		}
		select {
		case <-r.ctx.Done():
			if timer != nil {
				timer.Stop()
			}
			return
		case <-r.reset:
			if timer != nil {
				timer.Stop()
			}
		case <-timerC:
			// 定时器与 ctx.Done() 同时就绪时 select 会均匀随机选择，
			// 这里显式让关闭优先，保证 Close 之后不再启动新一轮 task。
			select {
			case <-r.ctx.Done():
				return
			default:
			}
			r.runOnce()
		}
	}
}

func (r *Runner) runOnce() {
	ctx, cancel := context.WithTimeout(r.ctx, r.timeout)
	defer cancel()
	err := r.task(ctx)
	if r.ctx.Err() != nil {
		// 面板正在关闭，不再记录本轮结果；同时清掉已经过期的 nextRunAt，
		// 否则 loop 会用负时长再建一个立刻就绪的定时器。
		r.mu.Lock()
		r.nextRunAt = time.Time{}
		r.mu.Unlock()
		return
	}

	r.mu.Lock()
	defer r.mu.Unlock()
	r.lastRunAt = r.now()
	if err != nil {
		r.lastError = err.Error()
		r.logger.Warn(r.name+"执行失败", "error", err)
	} else {
		r.lastError = ""
		r.logger.Info(r.name + "完成")
	}
	// 落盘执行时间，使重启后的倒计时接续而不是重新开始
	if saveErr := r.save(); saveErr != nil {
		r.logger.Warn("记录"+r.name+"时间失败", "error", saveErr)
	}
	r.scheduleNextLocked()
}

func (r *Runner) Close() error {
	r.closeOnce.Do(func() {
		r.cancel()
		r.wg.Wait()
	})
	return nil
}
