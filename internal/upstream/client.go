package upstream

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/netip"
	"net/url"
	"strings"
	"sync"
	"syscall"
	"time"
)

const (
	apiTimeout      = 20 * time.Second
	downloadTimeout = 5 * time.Minute
	// GitHub 的 JSON 响应远小于此,超过即视为异常。
	maxAPIBytes = 8 << 20
	// dae 各架构的发布包目前在 20MB 上下,留足余量同时挡住无限响应体。
	MaxAssetBytes = 128 << 20
	userAgent     = "kdae-panel"
)

// httpClient 收敛所有出站请求的超时与重定向策略。
type httpClient struct {
	client *http.Client
}

// allowedHosts 只约束由面板主动发起的第一跳。
// 重定向终点故意不做域名白名单:GitHub 的资产落点在
// objects.githubusercontent.com / release-assets.githubusercontent.com /
// *.blob.core.windows.net 之间迁移过,写死必然过时,而过时的后果是有人被迫
// 去关掉校验。终点的可信度改由带外取得的 sha256 承担,这里只强制那些不会
// 过时的不变量:必须 https、跳数有限、不得转发凭据、不得落到内网地址。
var allowedHosts = map[string]bool{
	"api.github.com": true,
	"github.com":     true,
	"nightly.link":   true,
}

func newHTTPClient() *httpClient {
	dialer := &net.Dialer{Timeout: 10 * time.Second, KeepAlive: 30 * time.Second}
	// 代理地址常常就是本机(在 GitHub 不可直连的网络里，代理往往正是 dae 自己)，
	// 因此内网地址检查必须放过管理员显式配置的代理，只约束直连的最终目标。
	proxies := &proxyAddresses{}
	transport := &http.Transport{
		Proxy: func(request *http.Request) (*url.URL, error) {
			proxyURL, err := http.ProxyFromEnvironment(request)
			if err == nil && proxyURL != nil {
				proxies.remember(proxyURL)
			}
			return proxyURL, err
		},
		TLSClientConfig:       &tls.Config{MinVersion: tls.VersionTLS12},
		TLSHandshakeTimeout:   10 * time.Second,
		ResponseHeaderTimeout: 30 * time.Second,
		ExpectContinueTimeout: time.Second,
		IdleConnTimeout:       30 * time.Second,
		DialContext:           guardedDial(dialer, proxies),
	}
	return &httpClient{
		client: &http.Client{
			Transport: transport,
			Timeout:   downloadTimeout,
			CheckRedirect: func(request *http.Request, via []*http.Request) error {
				if len(via) >= 5 {
					return fmt.Errorf("重定向次数过多")
				}
				if request.URL.Scheme != "https" {
					return fmt.Errorf("拒绝重定向到非 HTTPS 地址")
				}
				// Go 只在跨站时剥离部分请求头，这里显式清干净，
				// 免得将来给请求加上凭据后被重定向带去第三方。
				request.Header.Del("Authorization")
				request.Header.Del("Cookie")
				return nil
			},
		},
	}
}

// guardedDial 拒绝连往内网地址。
//
// 判断必须放在 Dialer.Control 里:DialContext 收到的是 URL 里的主机名,
// 对域名做 netip.ParseAddr 只会失败,等于完全不设防;Control 则在每次实际
// connect 之前拿到解析后的具体地址,因此 DNS 重绑定同样逃不掉。
func guardedDial(dialer *net.Dialer, proxies *proxyAddresses) func(context.Context, string, string) (net.Conn, error) {
	return func(ctx context.Context, network, address string) (net.Conn, error) {
		if proxies.contains(address) {
			return dialer.DialContext(ctx, network, address)
		}
		guarded := *dialer
		guarded.Control = func(_, resolved string, _ syscall.RawConn) error {
			host, _, err := net.SplitHostPort(resolved)
			if err != nil {
				return fmt.Errorf("无法解析连接地址 %q: %w", resolved, err)
			}
			ip, err := netip.ParseAddr(host)
			if err != nil {
				return fmt.Errorf("无法解析连接地址 %q", resolved)
			}
			if !publicAddress(ip) {
				return fmt.Errorf("拒绝连接到非公网地址 %s", ip)
			}
			return nil
		}
		return guarded.DialContext(ctx, network, address)
	}
}

// proxyAddresses 记录环境变量里配置的代理地址。
// 这些地址由管理员显式设置，能改动它们的人本就控制着面板环境，
// 因此放行它们不会削弱针对重定向的防护。
type proxyAddresses struct {
	mu    sync.RWMutex
	known map[string]bool
}

func (p *proxyAddresses) remember(proxyURL *url.URL) {
	address := proxyURL.Host
	if proxyURL.Port() == "" {
		port := "80"
		if proxyURL.Scheme == "https" {
			port = "443"
		}
		address = net.JoinHostPort(proxyURL.Hostname(), port)
	}
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.known == nil {
		p.known = make(map[string]bool)
	}
	p.known[address] = true
}

func (p *proxyAddresses) contains(address string) bool {
	p.mu.RLock()
	defer p.mu.RUnlock()
	return p.known[address]
}

// reservedRanges 是 netip 的内建判断没覆盖、但同样不该出现在上游下载链路上的网段。
// 100.64/10 是运营商级 NAT，也是 Tailscale 的地址段；198.18/15 常被用作 fake-ip；
// 240/4 与 0/8 是保留段。
var reservedRanges = []netip.Prefix{
	netip.MustParsePrefix("100.64.0.0/10"),
	netip.MustParsePrefix("198.18.0.0/15"),
	netip.MustParsePrefix("192.0.0.0/24"),
	netip.MustParsePrefix("192.0.2.0/24"),
	netip.MustParsePrefix("198.51.100.0/24"),
	netip.MustParsePrefix("203.0.113.0/24"),
	netip.MustParsePrefix("240.0.0.0/4"),
	netip.MustParsePrefix("0.0.0.0/8"),
	netip.MustParsePrefix("64:ff9b:1::/48"),
	netip.MustParsePrefix("100::/64"),
	netip.MustParsePrefix("2001:db8::/32"),
}

// publicAddress 排除回环、私网、链路本地与组播等不该出现在上游下载链路上的地址。
// 云元数据服务(169.254.169.254)正落在链路本地段内。
func publicAddress(ip netip.Addr) bool {
	ip = ip.Unmap()
	if !ip.IsValid() ||
		ip.IsLoopback() ||
		ip.IsPrivate() ||
		ip.IsLinkLocalUnicast() ||
		ip.IsLinkLocalMulticast() ||
		ip.IsInterfaceLocalMulticast() ||
		ip.IsMulticast() ||
		ip.IsUnspecified() {
		return false
	}
	for _, prefix := range reservedRanges {
		if prefix.Contains(ip) {
			return false
		}
	}
	return true
}

func (c *httpClient) getJSON(ctx context.Context, url string, destination any) error {
	requestCtx, cancel := context.WithTimeout(ctx, apiTimeout)
	defer cancel()

	body, _, err := c.get(requestCtx, url, maxAPIBytes, "application/vnd.github+json")
	if err != nil {
		return err
	}
	if err := json.Unmarshal(body, destination); err != nil {
		return fmt.Errorf("解析上游响应: %w", err)
	}
	return nil
}

func (c *httpClient) getText(ctx context.Context, url string) (string, error) {
	requestCtx, cancel := context.WithTimeout(ctx, apiTimeout)
	defer cancel()

	body, _, err := c.get(requestCtx, url, maxAPIBytes, "")
	return string(body), err
}

// download 取回资产内容,内容长度硬上限为 limit。
func (c *httpClient) download(ctx context.Context, url string, limit int64) ([]byte, error) {
	requestCtx, cancel := context.WithTimeout(ctx, downloadTimeout)
	defer cancel()

	body, _, err := c.get(requestCtx, url, limit, "")
	return body, err
}

func (c *httpClient) get(ctx context.Context, target string, limit int64, accept string) ([]byte, http.Header, error) {
	if err := checkFirstHop(target); err != nil {
		return nil, nil, err
	}
	request, err := http.NewRequestWithContext(ctx, http.MethodGet, target, nil)
	if err != nil {
		return nil, nil, fmt.Errorf("构造上游请求: %w", err)
	}
	request.Header.Set("User-Agent", userAgent)
	// 让落盘的字节就是链路上的字节，便于校验和比对。
	request.Header.Set("Accept-Encoding", "identity")
	if accept != "" {
		request.Header.Set("Accept", accept)
	}

	response, err := c.client.Do(request)
	if err != nil {
		// 不能直接 %w 包裹 *url.Error：它带着完整 URL，
		// 而签名下载地址的查询串里含有临时凭据，会随错误进日志和 API 响应。
		return nil, nil, fmt.Errorf("请求上游 %s 失败: %s", redact(target), redactError(err))
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, nil, describeHTTPError(response, target)
	}
	// 先信任 Content-Length 做早期拒绝，真正的上限仍由 LimitReader 保证。
	if response.ContentLength > limit {
		return nil, nil, fmt.Errorf("上游响应 %d 字节，超过 %d 上限", response.ContentLength, limit)
	}
	body, err := io.ReadAll(io.LimitReader(response.Body, limit+1))
	if err != nil {
		return nil, nil, fmt.Errorf("读取上游响应: %w", err)
	}
	if int64(len(body)) > limit {
		return nil, nil, fmt.Errorf("上游响应超过 %d 字节上限", limit)
	}
	return body, response.Header, nil
}

func describeHTTPError(response *http.Response, target string) error {
	switch response.StatusCode {
	case http.StatusNotFound:
		return fmt.Errorf("上游不存在该资源: %s", redact(target))
	case http.StatusForbidden, http.StatusTooManyRequests:
		// 匿名调用 GitHub API 是每 IP 每小时 60 次，触顶时这里给出可读提示。
		if response.Header.Get("X-RateLimit-Remaining") == "0" {
			reset := response.Header.Get("X-RateLimit-Reset")
			return fmt.Errorf("GitHub 接口调用频率已达上限，请稍后重试（重置时间戳 %s）", reset)
		}
		return fmt.Errorf("上游拒绝访问（HTTP %d）", response.StatusCode)
	default:
		return fmt.Errorf("上游返回 HTTP %d", response.StatusCode)
	}
}

// checkFirstHop 确认面板主动发起的请求指向已知主机。
// 这些地址全部由本包自己拼装，校验只是防止将来有人把外部字符串接进来。
func checkFirstHop(target string) error {
	parsed, err := url.Parse(target)
	if err != nil {
		return fmt.Errorf("上游地址无效: %w", err)
	}
	if parsed.Scheme != "https" {
		return fmt.Errorf("上游地址必须使用 HTTPS")
	}
	if !allowedHosts[parsed.Hostname()] {
		return fmt.Errorf("上游主机 %s 不在允许列表内", parsed.Hostname())
	}
	return nil
}

// redact 去掉签名下载地址里的查询串，避免把临时凭据写进日志或错误消息。
func redact(target string) string {
	if index := strings.IndexByte(target, '?'); index >= 0 {
		return target[:index]
	}
	return target
}

// redactError 取出底层错误原因，丢掉 *url.Error 携带的完整地址。
func redactError(err error) string {
	var urlErr *url.Error
	if errors.As(err, &urlErr) && urlErr.Err != nil {
		return urlErr.Err.Error()
	}
	return err.Error()
}
