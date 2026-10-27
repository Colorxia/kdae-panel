package logfmt

import "testing"

// 以下样本由 logrus v1.9.4 + logrus-prefixed-formatter v0.5.2 按 kdae
// pkg/logger.SetLogger 的参数（ForceFormatting、FullTimestamp）实际生成，
// 输出写入非终端，与 journald 采集到的内容一致。
func TestParseEntryV2Connection(t *testing.T) {
	cases := []struct {
		name   string
		line   string
		level  string
		msg    string
		fields map[string]string
	}{
		{
			name:  "IPv4 debug 连接",
			line:  "DEBUG 192.0.2.23:4567 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com",
			level: "debug",
			msg:   "192.0.2.23:4567 <-> example.com:443",
			fields: map[string]string{
				"dialer": "tokyo", "dscp": "0", "ip": "203.0.113.8:443", "mac": "00:11:22:33:44:55",
				"network": "tcp4", "outbound": "proxy", "pname": "curl", "policy": "min_moving_avg", "sniffed": "example.com",
			},
		},
		{
			name:  "节点名含空格、空字段",
			line:  "DEBUG 192.0.2.23:4568 <-> 203.0.113.8:443 dialer=香港 01 IPLC dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname= policy=min_moving_avg sniffed=",
			level: "debug",
			msg:   "192.0.2.23:4568 <-> 203.0.113.8:443",
			fields: map[string]string{
				"dialer": "香港 01 IPLC", "pname": "", "sniffed": "", "network": "tcp4", "outbound": "proxy",
			},
		},
		{
			name:   "IPv6 源地址被格式化库当作前缀剥掉后还原（双空格）",
			line:   "DEBUG  2001:db8::1: :1234 <-> example.com:443 dialer=tokyo dscp=0 ip=[2001:db8::8]:443 mac=00:11:22:33:44:55 network=tcp6 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com",
			level:  "debug",
			msg:    "[2001:db8::1]:1234 <-> example.com:443",
			fields: map[string]string{"ip": "[2001:db8::8]:443", "network": "tcp6"},
		},
		{
			name:   "带 ANSI 转义与字段值内含等号",
			line:   "\x1b[37mDEBUG\x1b[0m 192.0.2.23:4567 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 network=tcp4 outbound=proxy pname=node --max-old-space-size=4096 a=b policy=fixed(0)",
			level:  "debug",
			msg:    "192.0.2.23:4567 <-> example.com:443",
			fields: map[string]string{"dialer": "tokyo", "ip": "203.0.113.8:443", "network": "tcp4", "outbound": "proxy", "pname": "node --max-old-space-size=4096 a=b", "policy": "fixed(0)"},
		},
		{
			name:  "卸载原因带空格",
			line:  "DEBUG localhost:4569 <-> example.com:443 dialer=tokyo dscp=0 ebpf_offload=false ebpf_offload_reason=sniff required ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com",
			level: "debug",
			msg:   "localhost:4569 <-> example.com:443",
			fields: map[string]string{
				"ebpf_offload": "false", "ebpf_offload_reason": "sniff required", "ip": "203.0.113.8:443",
			},
		},
		{
			name:   "四个字母的级别右对齐，行首带空格",
			line:   " INFO 192.0.2.23:4570 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com",
			level:  "info",
			msg:    "192.0.2.23:4570 <-> example.com:443",
			fields: map[string]string{"outbound": "proxy", "network": "tcp4"},
		},
		{
			name:   "未带 --disable-timestamp 时行首有时间戳",
			line:   "[2026-10-12 14:24:17] DEBUG 192.0.2.23:4567 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com",
			level:  "debug",
			msg:    "192.0.2.23:4567 <-> example.com:443",
			fields: map[string]string{"dialer": "tokyo", "outbound": "proxy"},
		},
		{
			name:   "带时间戳的 info 行",
			line:   "[2026-10-12 14:24:17]  INFO 192.0.2.23:4570 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com",
			level:  "info",
			msg:    "192.0.2.23:4570 <-> example.com:443",
			fields: map[string]string{"network": "tcp4"},
		},
	}
	for _, testCase := range cases {
		t.Run(testCase.name, func(t *testing.T) {
			fields, ok := ParseEntry(testCase.line)
			if !ok {
				t.Fatalf("未能解析: %q", testCase.line)
			}
			if fields["level"] != testCase.level || fields["msg"] != testCase.msg {
				t.Fatalf("level=%q msg=%q，期望 level=%q msg=%q", fields["level"], fields["msg"], testCase.level, testCase.msg)
			}
			for key, want := range testCase.fields {
				got, exists := fields[key]
				if !exists || got != want {
					t.Fatalf("%s = %q (存在=%v)，期望 %q；全部字段 %#v", key, got, exists, want, fields)
				}
			}
		})
	}
}

func TestParseEntryV2GenericLines(t *testing.T) {
	cases := []struct{ line, level, msg string }{
		{" WARN Failed to load geoip: country code CN not found in /etc/dae/geoip.dat", "warn", "Failed to load geoip: country code CN not found in /etc/dae/geoip.dat"},
		{"ERROR health check failed: a=b err=dial tcp: i/o timeout", "error", "health check failed: a=b err=dial tcp: i/o timeout"},
		{" INFO Started dae", "info", "Started dae"},
		{" WARN Reload: Serve", "warn", "Reload: Serve"},
		{"TRACE packet detail", "trace", "packet detail"},
		{"[2026-10-12 14:24:17]  WARN Failed to load geoip", "warn", "Failed to load geoip"},
	}
	for _, testCase := range cases {
		fields, ok := ParseEntry(testCase.line)
		if !ok || fields["level"] != testCase.level || fields["msg"] != testCase.msg {
			t.Fatalf("%q => ok=%v %#v，期望 level=%q msg=%q", testCase.line, ok, fields, testCase.level, testCase.msg)
		}
	}
}

func TestParseEntryKeepsLogfmt(t *testing.T) {
	fields, ok := ParseEntry(`level=info msg="192.0.2.23:4567 <-> example.com:443" dialer=tokyo network=tcp4 outbound=proxy`)
	if !ok || fields["level"] != "info" || fields["msg"] != "192.0.2.23:4567 <-> example.com:443" || fields["dialer"] != "tokyo" {
		t.Fatalf("logfmt 行解析结果改变: %#v", fields)
	}
	// 没有 level 的 logfmt 行保持原有结果，不因新格式的兜底而变成失败。
	fields, ok = ParseEntry(`msg="no level here" key=value`)
	if !ok || fields["key"] != "value" || fields["level"] != "" {
		t.Fatalf("无 level 的 logfmt 行结果改变: ok=%v %#v", ok, fields)
	}
}

func TestParseEntryRejectsUnknownLines(t *testing.T) {
	for _, line := range []string{
		"",
		"ordinary output containing level=debug",
		"Started dae",
		"[unterminated prefix",
		"[2026-10-12 14:24:17] NOTALEVEL something",
		"debug lowercase is not the v2 format",
	} {
		if fields, ok := ParseEntry(line); ok && fields["level"] != "" {
			t.Fatalf("%q 被误认为带级别的 dae 日志: %#v", line, fields)
		}
	}
}

// 连接目标来自客户端 SNI，可被局域网设备控制。目标里夹带的字段不能盖过
// dae 在行尾写入的真实字段——logfmt 下由引号保证，v2 下由字段从右往左切保证。
func TestParseEntryV2InjectedFieldsDoNotOverride(t *testing.T) {
	line := "DEBUG 192.0.2.1:1 <-> evil.example outbound=block:443 dialer=tokyo ip=203.0.113.1:443 network=tcp4 outbound=proxy"
	fields, ok := ParseEntry(line)
	if !ok {
		t.Fatalf("未能解析: %q", line)
	}
	if fields["outbound"] != "proxy" || fields["network"] != "tcp4" || fields["dialer"] != "tokyo" {
		t.Fatalf("目标里夹带的字段覆盖了真实字段: %#v", fields)
	}
	if fields["msg"] != "192.0.2.1:1 <-> evil.example outbound=block:443" {
		t.Fatalf("夹带内容应留在目标文本里: msg=%q", fields["msg"])
	}
}
