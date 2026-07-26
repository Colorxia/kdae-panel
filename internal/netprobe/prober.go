// Package netprobe 从面板主机对节点服务器做 TCP 握手延迟探测。
// 它不依赖 dae 的任何内部接口,与 dae 依据 tcp_check_url/udp_check_dns
// 得出的健康状态无关。
//
// 关于结果的含义有两点必须如实告知使用者:域名目标的耗时包含名称解析;
// 且 dae 配置 wan_interface 时会劫持本机进程的出站流量,此时探测连接同样
// 走 dae 的转发平面(只有 dae 自身的流量凭 so_mark_from_dae 豁免),测到的
// 未必是物理直连。
//
// 目标地址来自管理员自己的 dae 配置,可能合法地指向内网或回环地址
// (example.dae 就包含 socks5://localhost:1080),因此这里不按地址段过滤,
// 而是靠端点的认证与 CSRF 校验限定调用者,并用全局并发上限约束出站突发。
package netprobe

import (
	"context"
	"errors"
	"fmt"
	"net"
	"strconv"
	"strings"
	"sync"
	"time"
)

const (
	MaxTargets         = 64
	defaultTimeout     = 4 * time.Second
	defaultConcurrency = 16
)

type Target struct {
	Host string `json:"host"`
	Port int    `json:"port"`
}

type Result struct {
	Host      string  `json:"host"`
	Port      int     `json:"port"`
	Reachable bool    `json:"reachable"`
	LatencyMs float64 `json:"latencyMs,omitempty"`
	Error     string  `json:"error,omitempty"`
}

type Prober struct {
	dial      func(ctx context.Context, network, address string) (net.Conn, error)
	timeout   time.Duration
	semaphore chan struct{}
}

func New() *Prober {
	return newWithLimits((&net.Dialer{}).DialContext, defaultTimeout, defaultConcurrency)
}

// newWithLimits 让测试可以收紧超时与并发,同时保证 semaphore 始终有容量。
func newWithLimits(dial func(context.Context, string, string) (net.Conn, error), timeout time.Duration, concurrency int) *Prober {
	if timeout <= 0 {
		timeout = defaultTimeout
	}
	if concurrency <= 0 {
		concurrency = defaultConcurrency
	}
	return &Prober{dial: dial, timeout: timeout, semaphore: make(chan struct{}, concurrency)}
}

func (t Target) validate() error {
	host := strings.TrimSpace(t.Host)
	if host == "" || host != t.Host || len(host) > 253 || strings.ContainsAny(host, " /\\") {
		return fmt.Errorf("探测主机 %q 无效", t.Host)
	}
	if t.Port < 1 || t.Port > 65535 {
		return fmt.Errorf("探测端口 %d 无效", t.Port)
	}
	return nil
}

// Probe 并发探测全部目标并按入参顺序返回结果。
// 并发上限属于 Prober 实例,因此多个并发请求共享同一份出站预算。
// 单个目标不合法只影响它自己的那条结果,不会让整批探测失败。
func (p *Prober) Probe(ctx context.Context, targets []Target) ([]Result, error) {
	if len(targets) == 0 {
		return nil, errors.New("探测目标不能为空")
	}
	if len(targets) > MaxTargets {
		return nil, fmt.Errorf("探测目标数量超过 %d 上限", MaxTargets)
	}

	results := make([]Result, len(targets))
	var wg sync.WaitGroup
	for index, target := range targets {
		if err := target.validate(); err != nil {
			results[index] = Result{Host: target.Host, Port: target.Port, Error: err.Error()}
			continue
		}
		wg.Add(1)
		go func() {
			defer wg.Done()
			results[index] = p.probeOne(ctx, target)
		}()
	}
	wg.Wait()
	return results, nil
}

func (p *Prober) probeOne(ctx context.Context, target Target) Result {
	result := Result{Host: target.Host, Port: target.Port}
	select {
	case p.semaphore <- struct{}{}:
		defer func() { <-p.semaphore }()
	case <-ctx.Done():
		result.Error = describeDialError(ctx.Err())
		return result
	}

	dialCtx, cancel := context.WithTimeout(ctx, p.timeout)
	defer cancel()

	startedAt := time.Now()
	conn, err := p.dial(dialCtx, "tcp", net.JoinHostPort(target.Host, strconv.Itoa(target.Port)))
	elapsed := time.Since(startedAt)
	if err != nil {
		result.Error = describeDialError(err)
		return result
	}
	_ = conn.Close()
	result.Reachable = true
	result.LatencyMs = float64(elapsed.Microseconds()) / 1000
	return result
}

func describeDialError(err error) string {
	var netErr net.Error
	if errors.Is(err, context.DeadlineExceeded) || (errors.As(err, &netErr) && netErr.Timeout()) {
		return "连接超时"
	}
	if errors.Is(err, context.Canceled) {
		return "探测已取消"
	}
	for {
		unwrapped := errors.Unwrap(err)
		if unwrapped == nil {
			return err.Error()
		}
		err = unwrapped
	}
}
