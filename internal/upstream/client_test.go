package upstream

import (
	"context"
	"net"
	"net/netip"
	"net/url"
	"strings"
	"testing"
	"time"
)

func TestPublicAddressRejectsInternalTargets(t *testing.T) {
	// 重定向终点不做域名白名单，因此这一层是防 SSRF 的实际关口。
	// ::ffff: 前缀的映射地址必须与其 IPv4 形态判定一致，否则等于留了后门。
	internal := []string{
		"127.0.0.1", "::1", "::ffff:127.0.0.1",
		"10.0.0.1", "172.16.0.1", "192.168.1.1", "::ffff:192.168.1.1",
		"169.254.169.254", "::ffff:169.254.169.254", // 云元数据服务
		"fe80::1", "fc00::1", "fd00::1",
		"224.0.0.1", "ff02::1",
		"0.0.0.0", "::",
		// netip 的内建判断覆盖不到，但同样不该被连上
		"100.64.0.1", "100.100.100.100", // 运营商级 NAT / Tailscale
		"198.18.0.1", "198.19.255.254", // 常被用作 fake-ip
		"240.0.0.1", "255.255.255.255", "0.1.2.3",
		"2001:db8::1",
	}
	for _, value := range internal {
		ip, err := netip.ParseAddr(value)
		if err != nil {
			t.Fatalf("%s 解析失败: %v", value, err)
		}
		if publicAddress(ip) {
			t.Fatalf("%s 不应被视为公网地址", value)
		}
	}

	public := []string{"140.82.121.4", "1.1.1.1", "2606:4700::1111", "::ffff:8.8.8.8"}
	for _, value := range public {
		ip, err := netip.ParseAddr(value)
		if err != nil {
			t.Fatal(err)
		}
		if !publicAddress(ip) {
			t.Fatalf("%s 应被视为公网地址", value)
		}
	}
}

// 这才是真正的 SSRF 关口：必须对"解析到内网的域名"生效，而不只是字面 IP。
func TestGuardedDialRejectsHostnamesResolvingInternally(t *testing.T) {
	dial := guardedDial(&net.Dialer{Timeout: 5 * time.Second}, &proxyAddresses{})

	// localhost 会解析到 127.0.0.1，域名形式同样必须被拦下
	for _, address := range []string{"localhost:80", "127.0.0.1:80", "[::1]:80"} {
		conn, err := dial(context.Background(), "tcp", address)
		if err == nil {
			_ = conn.Close()
			t.Fatalf("%s 应被拒绝", address)
		}
		if !strings.Contains(err.Error(), "非公网地址") {
			t.Fatalf("%s 的拒绝原因 = %v", address, err)
		}
	}
}

func TestGuardedDialAllowsConfiguredProxy(t *testing.T) {
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatal(err)
	}
	defer listener.Close()
	go func() {
		if conn, err := listener.Accept(); err == nil {
			_ = conn.Close()
		}
	}()

	// 在 GitHub 不可直连的网络里，代理往往就是本机上的 dae，必须放行
	address := listener.Addr().String()
	proxies := &proxyAddresses{}
	proxies.remember(&url.URL{Scheme: "http", Host: address})
	conn, err := guardedDial(&net.Dialer{Timeout: 5 * time.Second}, proxies)(context.Background(), "tcp", address)
	if err != nil {
		t.Fatalf("已配置的代理应被放行: %v", err)
	}
	_ = conn.Close()
}

func TestCheckFirstHopRestrictsSchemeAndHost(t *testing.T) {
	allowed := []string{
		"https://api.github.com/repos/x/y/releases",
		"https://github.com/x/y/releases/download/v1/a.zip",
		"https://nightly.link/x/y/actions/runs/1/a.zip",
	}
	for _, target := range allowed {
		if err := checkFirstHop(target); err != nil {
			t.Fatalf("%s 应被允许: %v", target, err)
		}
	}

	rejected := map[string]string{
		"http://api.github.com/x":       "HTTPS",
		"https://evil.example.com/x":    "允许列表",
		"https://127.0.0.1:2023/x":      "允许列表",
		"https://api.github.com.evil/x": "允许列表",
		"://broken":                     "无效",
	}
	for target, expect := range rejected {
		err := checkFirstHop(target)
		if err == nil {
			t.Fatalf("%s 应被拒绝", target)
		}
		if !strings.Contains(err.Error(), expect) {
			t.Fatalf("%s 的错误 = %v，期望包含 %q", target, err, expect)
		}
	}
}

func TestKdaeProviderRejectsUntrustedRuns(t *testing.T) {
	provider := NewKdaeProvider(nil, "olicesx", "dae", "kdae", "build.yml")
	trusted := workflowRun{
		Conclusion: "success", HeadBranch: "kdae", Event: "push",
		Path: ".github/workflows/build.yml",
	}
	trusted.HeadRepository.FullName = "olicesx/dae"
	if !provider.trustworthy(trusted) {
		t.Fatal("本仓库自己的 push 构建应被接受")
	}

	// 每一项单独破坏都必须导致拒绝
	cases := map[string]func(*workflowRun){
		"来自 fork 的 PR": func(r *workflowRun) { r.HeadRepository.FullName = "attacker/dae"; r.Event = "pull_request" },
		"仅事件为 PR":      func(r *workflowRun) { r.Event = "pull_request" },
		"仓库字段缺失":       func(r *workflowRun) { r.HeadRepository.FullName = "" },
		"分支不符":         func(r *workflowRun) { r.HeadBranch = "main" },
		"构建未成功":        func(r *workflowRun) { r.Conclusion = "failure" },
		"结论字段缺失":       func(r *workflowRun) { r.Conclusion = "" },
		"事件字段缺失":       func(r *workflowRun) { r.Event = "" },
		"来自同仓库其它工作流":   func(r *workflowRun) { r.Path = ".github/workflows/lint.yml" },
		"工作流字段缺失":      func(r *workflowRun) { r.Path = "" },
		"仓库名大小写不同但同仓库": func(r *workflowRun) { r.HeadRepository.FullName = "OLICESX/DAE" },
	}
	for name, mutate := range cases {
		run := trusted
		mutate(&run)
		got := provider.trustworthy(run)
		want := name == "仓库名大小写不同但同仓库" // GitHub 仓库名大小写不敏感
		if got != want {
			t.Fatalf("%s: trustworthy = %v，期望 %v", name, got, want)
		}
	}
}
