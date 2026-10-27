package logfmt

import (
	"net/netip"
	"regexp"
	"strings"
)

// dae 自 v2.0.0 起（kdae 于 2026-10-05 跟进）给 logrus-prefixed-formatter 打开了
// ForceFormatting：输出不是终端时也按给人看的排版写，不再是 logfmt。journald
// 采集到的行形如：
//
//	DEBUG 192.0.2.1:4567 <-> example.com:443 dialer=香港 01 ip=203.0.113.8:443 network=tcp4
//	 INFO Started dae
//	[2026-10-12 14:24:17] DEBUG ...（未带 --disable-timestamp 时）
//
// 与 logfmt 的差别：级别是行首大写词，不是 level=；正文不再包在 msg="..." 里；
// 字段值用 %+v 原样输出、不加引号，节点名里的空格会直接出现在值里。

var prefixedLevels = map[string]string{
	"PANIC":   "panic",
	"FATAL":   "fatal",
	"ERROR":   "error",
	"ERRO":    "error",
	"WARN":    "warn",
	"WARNING": "warn",
	"INFO":    "info",
	"DEBUG":   "debug",
	"TRACE":   "trace",
	"TRAC":    "trace",
}

const linkMarker = " <-> "

var (
	ansiEscape       = regexp.MustCompile(`\x1b\[[0-9;]*[A-Za-z]`)
	prefixedFieldKey = regexp.MustCompile(` (dialer|dscp|ebpf_offload|ebpf_offload_reason|ip|mac|network|outbound|pid|pname|policy|sniffed)=`)
)

func stripANSI(value string) string {
	if !strings.ContainsRune(value, '\x1b') {
		return value
	}
	return ansiEscape.ReplaceAllString(value, "")
}

// ParseEntry 解析 dae 的一行日志，返回含 level 与 msg 的字段表，兼容 v1 的
// logfmt 与 v2 的排版格式。
//
// v2 格式下只有连接日志（正文带 " <-> "）会拆出字段；其余行只给出 level 与
// 整段正文 msg。不带引号的值无法与正文里偶然出现的 "a=b" 可靠区分，而面板
// 对普通日志只需要级别。
func ParseEntry(line string) (map[string]string, bool) {
	cleaned := stripANSI(line)
	fields, ok := Parse(cleaned)
	if ok && fields["level"] != "" {
		return fields, true
	}
	if prefixed, prefixedOK := parsePrefixed(cleaned); prefixedOK {
		return prefixed, true
	}
	return fields, ok
}

func parsePrefixed(line string) (map[string]string, bool) {
	rest := strings.TrimLeft(line, " ")
	if strings.HasPrefix(rest, "[") {
		end := strings.Index(rest, "] ")
		if end < 0 {
			return nil, false
		}
		rest = strings.TrimLeft(rest[end+2:], " ")
	}
	word, body, _ := strings.Cut(rest, " ")
	level, ok := prefixedLevels[word]
	if !ok {
		return nil, false
	}
	body = strings.TrimLeft(body, " ")

	fields := map[string]string{"level": level}
	source, remainder, found := strings.Cut(body, linkMarker)
	if !found {
		fields["msg"] = body
		return fields, true
	}
	target, trailing := splitTrailingFields(remainder)
	fields["msg"] = restoreBracketPrefix(source) + linkMarker + target
	for key, value := range trailing {
		if _, exists := fields[key]; !exists {
			fields[key] = value
		}
	}
	return fields, true
}

// splitTrailingFields 把 "目标 键=值 键=值 ..." 拆成目标与字段。
//
// 值不带引号且可能含空格（节点名「香港 01」、ebpf_offload_reason），不能按空格切。
// 格式化库输出前会按键名排序，所以真实字段在行尾、键名递增。这里从右往左扫，
// 只接受已知连接字段中键名严格递减的 " 键=" 作为字段起点：
//   - 值里偶然出现的 " x=" 不在已知字段集合或不满足递减，仍属于原来的值；
//   - 目标来自客户端 SNI，可被局域网设备控制。目标里夹带的 "outbound=block"
//     在真实字段左边，又不小于真实的最小键 dialer，会被拒绝并留在目标文本里，
//     盖不过 dae 真正写入的字段——与 logfmt 下引号起到的保护相同。
func splitTrailingFields(text string) (string, map[string]string) {
	matches := prefixedFieldKey.FindAllStringSubmatchIndex(text, -1)
	type boundary struct{ start, keyStart, keyEnd int }
	accepted := make([]boundary, 0, len(matches))
	next := ""
	for index := len(matches) - 1; index >= 0; index-- {
		match := matches[index]
		key := text[match[2]:match[3]]
		if next != "" && key >= next {
			continue
		}
		accepted = append(accepted, boundary{match[0], match[2], match[3]})
		next = key
	}

	fields := make(map[string]string, len(accepted))
	end := len(text)
	for _, item := range accepted {
		fields[text[item.keyStart:item.keyEnd]] = unquoteFieldValue(text[item.keyEnd+1 : end])
		end = item.start
	}
	return strings.TrimSpace(text[:end]), fields
}

func unquoteFieldValue(raw string) string {
	trimmed := strings.TrimSpace(raw)
	if len(trimmed) >= 2 && trimmed[0] == '"' && trimmed[len(trimmed)-1] == '"' {
		return strings.ReplaceAll(trimmed[1:len(trimmed)-1], `\"`, `"`)
	}
	return trimmed
}

// restoreBracketPrefix 还原被格式化库剥掉的前缀。正文以 [...] 开头时，库会把方括号
// 里的内容当前缀，渲染成 "内容: 其余"。连接日志的源地址是 IPv6 时恰好以 [ 开头，
// [2001:db8::1]:1234 会变成 "2001:db8::1: :1234"。只有拼回后确实是合法地址时才采用。
func restoreBracketPrefix(source string) string {
	prefix, remainder, found := strings.Cut(source, ": ")
	if !found {
		return source
	}
	candidate := "[" + strings.TrimSpace(prefix) + "]" + remainder
	if _, err := netip.ParseAddrPort(candidate); err != nil {
		return source
	}
	return candidate
}
