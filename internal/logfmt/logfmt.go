// Package logfmt 解析 dae 输出的日志行（支持传统 logfmt 与新版 prefixed 格式）。
package logfmt

import (
	"strconv"
	"strings"
)

// Parse 返回一行日志中的字段。支持：
// 1. 传统 logfmt: key=value ...（同名键保留首次出现的值）
// 2. Prefixed 格式: [TIMESTAMP] LEVEL MSG key=value ...
//    以及无时间戳的 LEVEL MSG key=value ...
func Parse(line string) (map[string]string, bool) {
	clean := stripANSI(line)
	if fields, ok := parsePrefixed(clean); ok {
		return fields, true
	}
	return parseLogfmt(clean)
}

func parsePrefixed(line string) (map[string]string, bool) {
	offset := skipSpace(line, 0)
	if offset >= len(line) {
		return nil, false
	}

	var timestamp string
	// 检查是否有 [TIMESTAMP]
	if line[offset] == '[' {
		endBracket := strings.IndexByte(line[offset:], ']')
		if endBracket == -1 {
			return nil, false
		}
		endBracket += offset
		timestampCandidate := strings.TrimSpace(line[offset+1 : endBracket])
		// 紧接着必须是 LEVEL
		levelOffset := skipSpace(line, endBracket+1)
		if levelOffset >= len(line) {
			return nil, false
		}
		levelWord, nextOffset := readWord(line, levelOffset)
		normLevel, isLvl := normalizeLevel(levelWord)
		if !isLvl {
			return nil, false
		}
		timestamp = timestampCandidate
		offset = nextOffset
		return parsePrefixedBody(line, offset, normLevel, timestamp)
	}

	// 无 [TIMESTAMP] 的情况：行首必须是 LEVEL，且后跟空白符
	levelWord, nextOffset := readWord(line, offset)
	normLevel, isLvl := normalizeLevel(levelWord)
	if !isLvl {
		return nil, false
	}
	// 如果紧跟 '='（例如 level=info），是传统 logfmt，不是 prefixed
	if nextOffset < len(line) && line[nextOffset] == '=' {
		return nil, false
	}
	// LEVEL 后面必须是空白符或行尾
	if nextOffset < len(line) && !isSpace(line[nextOffset]) {
		return nil, false
	}
	offset = nextOffset
	return parsePrefixedBody(line, offset, normLevel, timestamp)
}

func parsePrefixedBody(line string, offset int, level string, timestamp string) (map[string]string, bool) {
	fields := make(map[string]string)
	fields["level"] = level
	if timestamp != "" {
		fields["time"] = timestamp
	}

	tail := strings.TrimSpace(line[offset:])
	if tail == "" {
		return fields, true
	}

	start := findFieldsStart(tail)
	if start == -1 {
		fields["msg"] = tail
		return fields, true
	}

	msg := strings.TrimSpace(tail[:start])
	if msg != "" {
		fields["msg"] = msg
	}

	parseFields(tail[start:], fields)
	return fields, true
}

func findFieldsStart(s string) int {
	for i := 0; i < len(s); i++ {
		if i == 0 || isSpace(s[i-1]) {
			if isFieldStart(s, i) {
				return i
			}
		}
	}
	return -1
}

func isFieldStart(s string, offset int) bool {
	end := offset
	for end < len(s) && isValidKeyChar(s[end]) {
		end++
	}
	return end > offset && end < len(s) && s[end] == '='
}

func parseFields(s string, fields map[string]string) {
	for offset := 0; offset < len(s); {
		offset = skipSpace(s, offset)
		if offset >= len(s) {
			break
		}

		keyStart := offset
		for offset < len(s) && isValidKeyChar(s[offset]) {
			offset++
		}
		if offset == keyStart || offset >= len(s) || s[offset] != '=' {
			break
		}
		key := s[keyStart:offset]
		offset++ // skip '='

		value, next := parsePrefixedValue(s, offset)
		if _, exists := fields[key]; !exists {
			fields[key] = value
		}
		offset = next
	}
}

func parsePrefixedValue(s string, offset int) (string, int) {
	if offset >= len(s) {
		return "", offset
	}

	if s[offset] == '"' {
		for end := offset + 1; end < len(s); end++ {
			switch s[end] {
			case '\\':
				end++
			case '"':
				val, err := strconv.Unquote(s[offset : end+1])
				if err == nil {
					return val, end + 1
				}
				return s[offset+1 : end], end + 1
			}
		}
		return s[offset+1:], len(s)
	}

	end := offset
	for end < len(s) {
		if isSpace(s[end]) {
			next := skipSpace(s, end)
			if next >= len(s) || isFieldStart(s, next) {
				return s[offset:end], next
			}
		}
		end++
	}
	return s[offset:end], end
}

func normalizeLevel(word string) (string, bool) {
	switch strings.ToLower(word) {
	case "debug":
		return "debug", true
	case "info":
		return "info", true
	case "warn", "warning":
		return "warn", true
	case "error", "erro":
		return "error", true
	case "fatal":
		return "fatal", true
	case "panic":
		return "panic", true
	case "trace", "trac":
		return "trace", true
	default:
		return "", false
	}
}

func readWord(s string, offset int) (string, int) {
	end := offset
	for end < len(s) && !isSpace(s[end]) && s[end] != '=' {
		end++
	}
	return s[offset:end], end
}

func isValidKeyChar(b byte) bool {
	return (b >= 'a' && b <= 'z') || (b >= 'A' && b <= 'Z') || (b >= '0' && b <= '9') || b == '_' || b == '-' || b == '.'
}

func stripANSI(s string) string {
	if !strings.Contains(s, "\x1b[") {
		return s
	}
	var b strings.Builder
	b.Grow(len(s))
	for i := 0; i < len(s); {
		if s[i] == 0x1b && i+1 < len(s) && s[i+1] == '[' {
			i += 2
			for i < len(s) && !((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) {
				i++
			}
			if i < len(s) {
				i++
			}
			continue
		}
		b.WriteByte(s[i])
		i++
	}
	return b.String()
}

func parseLogfmt(line string) (map[string]string, bool) {
	fields := make(map[string]string)
	for offset := 0; ; {
		offset = skipSpace(line, offset)
		if offset == len(line) {
			break
		}

		nameStart := offset
		for offset < len(line) && line[offset] != '=' && !isSpace(line[offset]) {
			offset++
		}
		if offset == nameStart || offset == len(line) || line[offset] != '=' {
			break
		}
		name := line[nameStart:offset]
		offset++

		value, next, ok := parseValue(line, offset)
		if !ok {
			break
		}
		if _, exists := fields[name]; !exists {
			fields[name] = value
		}
		offset = next
	}
	if len(fields) == 0 {
		return nil, false
	}
	return fields, true
}

func parseValue(line string, offset int) (string, int, bool) {
	if offset >= len(line) || line[offset] != '"' {
		end := offset
		for end < len(line) && !isSpace(line[end]) {
			end++
		}
		return line[offset:end], end, true
	}

	for end := offset + 1; end < len(line); end++ {
		switch line[end] {
		case '\\':
			end++
		case '"':
			value, err := strconv.Unquote(line[offset : end+1])
			if err != nil || end+1 < len(line) && !isSpace(line[end+1]) {
				return "", offset, false
			}
			return value, end + 1, true
		}
	}
	return "", offset, false
}

func skipSpace(value string, offset int) int {
	for offset < len(value) && isSpace(value[offset]) {
		offset++
	}
	return offset
}

func isSpace(value byte) bool {
	return strings.ContainsRune(" \t\r\n", rune(value))
}
