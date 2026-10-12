package daeconn

import (
	"testing"
	"time"
)

func TestParseConnectionEvent(t *testing.T) {
	timestamp := time.Date(2026, 8, 2, 12, 0, 0, 0, time.UTC)
	lines := []LogLine{{Timestamp: timestamp, Message: `level=info msg="192.0.2.23:4567 <-> example.com:443" dialer=tokyo ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min sniffed=example.com:443`}}
	events, dropped := Parse(lines, ParseOptions{})
	if dropped != 0 || len(events) != 1 {
		t.Fatalf("events = %+v, dropped = %d", events, dropped)
	}
	event := events[0]
	if event.Timestamp != timestamp || event.Network != "tcp4" || event.Src != "192.0.2.23:4567" || event.Target != "example.com:443" {
		t.Fatalf("基础字段解析异常: %+v", event)
	}
	if event.DstAddr != "203.0.113.8:443" || event.Dialer != "tokyo" || event.Outbound != "proxy" || event.Sniffed != "example.com:443" {
		t.Fatalf("连接元数据解析异常: %+v", event)
	}
}

func TestParseLocalhostAndMappedIPv4(t *testing.T) {
	lines := []LogLine{{Message: `level=info msg="localhost:1234 <-> target:80" ip="[::ffff:192.0.2.10]:80" network=tcp6 outbound=direct`}}
	events, dropped := Parse(lines, ParseOptions{})
	if dropped != 0 || len(events) != 1 {
		t.Fatalf("events = %+v, dropped = %d", events, dropped)
	}
	if events[0].Src != "192.0.2.10:1234" || events[0].DstAddr != "192.0.2.10:80" {
		t.Fatalf("localhost 或映射地址未归一化: %+v", events[0])
	}
}

func TestParseSkipsDebugAndCountsMalformedConnectionLines(t *testing.T) {
	lines := []LogLine{
		{Message: `level=debug msg="192.0.2.1:1 <-> example.com:53" network=udp4 outbound=proxy`},
		{Message: `level=info msg="192.0.2.1:1 <-> example.com:443" network=tcp4`},
		{Message: `level=info msg="Successfully created Netkit device pair dae0 <-> dae0-peer"`},
		{Message: `level=info msg="普通日志"`},
	}
	events, dropped := Parse(lines, ParseOptions{})
	if len(events) != 0 || dropped != 1 {
		t.Fatalf("events = %+v, dropped = %d", events, dropped)
	}
}

func TestParseDoesNotAcceptFieldsInjectedIntoQuotedMessage(t *testing.T) {
	line := LogLine{Message: `level=info msg="192.0.2.1:1 <-> node \" outbound=block:443" network=tcp4 outbound=proxy ip=203.0.113.1:443`}
	events, dropped := Parse([]LogLine{line}, ParseOptions{})
	if dropped != 0 || len(events) != 1 || events[0].Outbound != "proxy" {
		t.Fatalf("引号内字段影响了解析: events=%+v dropped=%d", events, dropped)
	}
}

func TestParseAcceptsDebugOnlyFromCurrentPID(t *testing.T) {
	message := `level=debug msg="192.0.2.1:1 <-> example.com:53" ip=203.0.113.1:53 network=udp4 outbound=proxy`
	lines := []LogLine{
		{Message: message, PID: "42"},
		{Message: message, PID: "41"},
		{Message: message},
		{
			PID:     "42",
			Message: `level=debug msg="192.0.2.1:1 <-> 8.8.8.8:53" _qname=example.com network=udp4 outbound=direct qtype=A`,
		},
	}
	events, dropped := Parse(lines, ParseOptions{AcceptDebug: true, CurrentPID: "42"})
	if dropped != 0 || len(events) != 1 {
		t.Fatalf("debug PID 边界失效: events=%+v dropped=%d", events, dropped)
	}

	events, dropped = Parse(lines, ParseOptions{CurrentPID: "42"})
	if dropped != 0 || len(events) != 0 {
		t.Fatalf("未授权版本接收了 debug: events=%+v dropped=%d", events, dropped)
	}
}

// dae v2 起连接日志不再是 logfmt（见 logfmt.ParseEntry）。样本由 logrus v1.9.4 +
// logrus-prefixed-formatter v0.5.2 按 kdae 的参数实际生成。
func TestParseV2FormatConnectionEvents(t *testing.T) {
	lines := []LogLine{
		{PID: "42", Message: "DEBUG 192.0.2.23:4567 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com"},
		{PID: "42", Message: "DEBUG 192.0.2.23:4568 <-> 203.0.113.8:443 dialer=香港 01 IPLC dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname= policy=min_moving_avg sniffed="},
		{PID: "42", Message: "DEBUG 2001:db8::1: :1234 <-> example.com:443 dialer=tokyo dscp=0 ip=[2001:db8::8]:443 mac=00:11:22:33:44:55 network=tcp6 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com"},
		{PID: "42", Message: "DEBUG localhost:4569 <-> example.com:443 dialer=tokyo dscp=0 ebpf_offload=false ebpf_offload_reason=sniff required ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com"},
		{PID: "42", Message: " INFO 192.0.2.23:4570 <-> example.com:443 dialer=tokyo dscp=0 ip=203.0.113.8:443 mac=00:11:22:33:44:55 network=tcp4 outbound=proxy pname=curl policy=min_moving_avg sniffed=example.com"},
	}
	events, dropped := Parse(lines, ParseOptions{AcceptDebug: true, CurrentPID: "42"})
	if dropped != 0 || len(events) != 5 {
		t.Fatalf("events=%+v dropped=%d", events, dropped)
	}
	first := events[0]
	if first.Src != "192.0.2.23:4567" || first.Target != "example.com:443" || first.Network != "tcp4" ||
		first.Outbound != "proxy" || first.Dialer != "tokyo" || first.DstAddr != "203.0.113.8:443" ||
		first.Sniffed != "example.com" || first.Pname != "curl" || first.Policy != "min_moving_avg" {
		t.Fatalf("v2 连接字段解析异常: %+v", first)
	}
	if events[1].Dialer != "香港 01 IPLC" || events[1].Pname != "" || events[1].Sniffed != "" {
		t.Fatalf("含空格的节点名或空字段解析异常: %+v", events[1])
	}
	if events[2].Src != "[2001:db8::1]:1234" || events[2].Network != "tcp6" || events[2].DstAddr != "[2001:db8::8]:443" {
		t.Fatalf("IPv6 源地址未还原: %+v", events[2])
	}
	if events[3].Src != "203.0.113.8:4569" || events[3].Offloaded {
		t.Fatalf("localhost 归一化或卸载标记异常: %+v", events[3])
	}

	// 未确认 kdae 版本时只收 info，v2 格式下这条约束同样成立。
	events, dropped = Parse(lines, ParseOptions{})
	if dropped != 0 || len(events) != 1 || events[0].Src != "192.0.2.23:4570" {
		t.Fatalf("未授权时应只接收 info: events=%+v dropped=%d", events, dropped)
	}
}

// 这次 dae 改日志格式时，连接活动安静地变成空白，页面上那条「日志格式可能已经
// 变化」的提示也没出现：认不出的行在进入候选判断前就被跳过，dropped 一直是 0。
// 以后格式再变，形似连接日志的行必须计入 dropped。
func TestParseCountsUnrecognisedConnectionFormat(t *testing.T) {
	lines := []LogLine{
		{Message: "2026/10/12 debug | 192.0.2.1:1 <-> example.com:443 | network=tcp4 outbound=proxy"},
		{Message: "Successfully created Netkit device pair dae0 <-> dae0-peer"},
		{Message: "完全无关的输出"},
	}
	events, dropped := Parse(lines, ParseOptions{AcceptDebug: true})
	if len(events) != 0 || dropped != 1 {
		t.Fatalf("未知格式的连接日志应计入 dropped: events=%+v dropped=%d", events, dropped)
	}
}
