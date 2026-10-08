package logfmt

import (
	"reflect"
	"testing"
)

func TestParse(t *testing.T) {
	want := map[string]string{
		"level":    "info",
		"msg":      `192.0.2.1:1234 <-> example.com:443`,
		"network":  "tcp4",
		"outbound": "proxy",
	}
	got, ok := Parse(`level=info msg="192.0.2.1:1234 <-> example.com:443" network=tcp4 outbound=proxy`)
	if !ok || !reflect.DeepEqual(got, want) {
		t.Fatalf("Parse() = %#v, %v，期望 %#v, true", got, ok, want)
	}
}

func TestParseQuotedEscapesAndDuplicateKeys(t *testing.T) {
	fields, ok := Parse(`level=info msg="node \"quoted\" outbound=block" outbound=proxy path="C:\\dae" outbound=direct`)
	if !ok {
		t.Fatal("带转义的合法日志应能解析")
	}
	if fields["msg"] != `node "quoted" outbound=block` {
		t.Fatalf("msg = %q", fields["msg"])
	}
	if fields["outbound"] != "proxy" {
		t.Fatalf("重复字段应保留首次值，实际为 %q", fields["outbound"])
	}
	if fields["path"] != `C:\dae` {
		t.Fatalf("path = %q", fields["path"])
	}
}

func TestParseRejectsMalformedPrefixAndStopsAtMalformedSuffix(t *testing.T) {
	if fields, ok := Parse(`not-logfmt level=info`); ok || fields != nil {
		t.Fatalf("非 logfmt 前缀不应被接受: %#v, %v", fields, ok)
	}
	fields, ok := Parse(`level=info msg="unterminated outbound=block`)
	if !ok || !reflect.DeepEqual(fields, map[string]string{"level": "info"}) {
		t.Fatalf("已完成字段应保留、残缺字段应丢弃: %#v, %v", fields, ok)
	}
}

func TestParseEmptyValueAndWhitespace(t *testing.T) {
	fields, ok := Parse("  empty=\tquoted=\"\"\r\nlevel=debug  ")
	want := map[string]string{"empty": "", "quoted": "", "level": "debug"}
	if !ok || !reflect.DeepEqual(fields, want) {
		t.Fatalf("Parse() = %#v, %v，期望 %#v, true", fields, ok, want)
	}
}

func TestParsePrefixedWithTimestamp(t *testing.T) {
	line := `[2026-10-08 19:47:17] DEBUG 10.0.0.1:1234 <-> example.com:443 dialer=tokyo ip=1.2.3.4:443 network=tcp4 outbound=proxy`
	fields, ok := Parse(line)
	if !ok {
		t.Fatalf("Parse(%q) 返回 false", line)
	}
	want := map[string]string{
		"time":     "2026-10-08 19:47:17",
		"level":    "debug",
		"msg":      "10.0.0.1:1234 <-> example.com:443",
		"dialer":   "tokyo",
		"ip":       "1.2.3.4:443",
		"network":  "tcp4",
		"outbound": "proxy",
	}
	if !reflect.DeepEqual(fields, want) {
		t.Fatalf("Parse() = %#v，期望 %#v", fields, want)
	}
}

func TestParsePrefixedWithoutTimestamp(t *testing.T) {
	line := ` DEBUG 10.0.0.1:1234 <-> example.com:443 ip=1.2.3.4:443 network=tcp4 outbound=proxy`
	fields, ok := Parse(line)
	if !ok {
		t.Fatalf("Parse(%q) 返回 false", line)
	}
	want := map[string]string{
		"level":    "debug",
		"msg":      "10.0.0.1:1234 <-> example.com:443",
		"ip":       "1.2.3.4:443",
		"network":  "tcp4",
		"outbound": "proxy",
	}
	if !reflect.DeepEqual(fields, want) {
		t.Fatalf("Parse() = %#v，期望 %#v", fields, want)
	}
}

func TestParsePrefixedIPv6(t *testing.T) {
	line := `[2026-10-08 19:47:17] DEBUG [2001:db8::1]:1234 <-> [2001:db8::2]:443 ip="[2001:db8::2]:443" network=tcp6 outbound=proxy`
	fields, ok := Parse(line)
	if !ok {
		t.Fatalf("Parse(%q) 返回 false", line)
	}
	if fields["msg"] != "[2001:db8::1]:1234 <-> [2001:db8::2]:443" {
		t.Fatalf("msg = %q, 期望 IPv6 对", fields["msg"])
	}
	if fields["network"] != "tcp6" || fields["ip"] != "[2001:db8::2]:443" {
		t.Fatalf("字段解析不正确: %#v", fields)
	}
}

func TestParsePrefixedUnquotedValueWithSpaces(t *testing.T) {
	line := `[2026-10-08 20:23:32] DEBUG 10.0.0.1:1234 <-> example.com:443 ip=1.2.3.4:443 network=tcp4 reason=user disabled outbound=proxy`
	fields, ok := Parse(line)
	if !ok {
		t.Fatalf("Parse(%q) 返回 false", line)
	}
	if fields["reason"] != "user disabled" {
		t.Fatalf("reason = %q, 期望包含空格的不加引号字段被正确提取", fields["reason"])
	}
	if fields["outbound"] != "proxy" || fields["network"] != "tcp4" || fields["ip"] != "1.2.3.4:443" {
		t.Fatalf("后续字段解析异常: %#v", fields)
	}
}

func TestParsePrefixedLevelsAndANSI(t *testing.T) {
	cases := []struct {
		input     string
		wantLevel string
		wantMsg   string
	}{
		{
			input:     `[2026-10-08 19:47:17] ERRO failed to bind: address already in use`,
			wantLevel: "error",
			wantMsg:   "failed to bind: address already in use",
		},
		{
			input:     `[2026-10-08 19:47:17] WARN [Reload] Rollback triggered`,
			wantLevel: "warn",
			wantMsg:   "[Reload] Rollback triggered",
		},
		{
			input:     ` INFO Ready to serve`,
			wantLevel: "info",
			wantMsg:   "Ready to serve",
		},
		{
			input:     "\x1b[36mDEBUG\x1b[0m 10.0.0.1:1234 <-> example.com:443 network=tcp4 outbound=proxy",
			wantLevel: "debug",
			wantMsg:   "10.0.0.1:1234 <-> example.com:443",
		},
	}
	for _, tc := range cases {
		fields, ok := Parse(tc.input)
		if !ok {
			t.Fatalf("Parse(%q) 返回 false", tc.input)
		}
		if fields["level"] != tc.wantLevel {
			t.Fatalf("level = %q, 期望 %q (输入: %s)", fields["level"], tc.wantLevel, tc.input)
		}
		if fields["msg"] != tc.wantMsg {
			t.Fatalf("msg = %q, 期望 %q (输入: %s)", fields["msg"], tc.wantMsg, tc.input)
		}
	}
}

func TestParsePrefixedRejectsInvalid(t *testing.T) {
	invalids := []string{
		`[something without level] hello`,
		`not-a-level hello world`,
		`[unterminated bracket hello`,
	}
	for _, inv := range invalids {
		if fields, ok := Parse(inv); ok {
			t.Fatalf("非法行 %q 不应被解析成功: %#v", inv, fields)
		}
	}
}
