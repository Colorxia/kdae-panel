package upstream

import "testing"

// Loyalsoldier 与 v2fly 发布的都是 coreutils 两字段格式，而 dae 的 .dgst 是三字段。
// 用 parseDigest 解析这里的内容会一律报"没有对应条目"，错误信息与真正的原因
// 南辕北辙，因此必须是两个独立的解析器。
func TestParseSHA256Sum(t *testing.T) {
	digest := "b71d1999439dde2de2d2b6844a2befa50c50211ff739785c005ca7c230a17d6a"
	cases := []struct {
		name    string
		content string
	}{
		{"标准两空格格式", digest + "  geoip.dat\n"},
		{"单空格", digest + " geoip.dat\n"},
		{"二进制模式的星号", digest + " *geoip.dat\n"},
		{"没有结尾换行", digest + "  geoip.dat"},
		{"前面有空行", "\n\n" + digest + "  geoip.dat\n"},
		{"大写哈希", "B71D1999439DDE2DE2D2B6844A2BEFA50C50211FF739785C005CA7C230A17D6A  geoip.dat\n"},
		// 上游有时用别名发布同一份数据（v2fly 的 geosite 就叫 dlc.dat），
		// 而文件是按资产名单独取回的，一份文件对一个校验和，不存在选错行的可能。
		{"文件名与请求的不同", digest + "  dlc.dat\n"},
	}
	for _, testCase := range cases {
		t.Run(testCase.name, func(t *testing.T) {
			got, err := parseSHA256Sum(testCase.content, "geoip.dat")
			if err != nil {
				t.Fatalf("应能解析: %v", err)
			}
			if got != digest {
				t.Fatalf("解析结果 = %q，期望 %q", got, digest)
			}
		})
	}
}

func TestParseSHA256SumRejectsInvalid(t *testing.T) {
	cases := []struct {
		name    string
		content string
	}{
		{"空内容", ""},
		{"长度不足", "abc123  geoip.dat\n"},
		{"含非十六进制字符", "z71d1999439dde2de2d2b6844a2befa50c50211ff739785c005ca7c230a17d6a  geoip.dat\n"},
		{"多一位", "b71d1999439dde2de2d2b6844a2befa50c50211ff739785c005ca7c230a17d6a0  geoip.dat\n"},
		{"是 HTML 而不是校验和", "<!DOCTYPE html><html>404</html>"},
	}
	for _, testCase := range cases {
		t.Run(testCase.name, func(t *testing.T) {
			if got, err := parseSHA256Sum(testCase.content, "geoip.dat"); err == nil {
				t.Fatalf("应当拒绝，却解析出 %q", got)
			}
		})
	}
}

// 地址必须由面板自己拼，不采信接口响应里的 URL——被篡改的响应最多让校验和
// 对不上，而不能把下载指到同一个域下的别的仓库。
func TestGeoDownloadURL(t *testing.T) {
	provider := NewGeoProvider(nil, "Loyalsoldier", "v2ray-rules-dat", nil)
	got := provider.downloadURL("202607252248", "geoip.dat")
	want := "https://github.com/Loyalsoldier/v2ray-rules-dat/releases/download/202607252248/geoip.dat"
	if got != want {
		t.Fatalf("下载地址 = %q，期望 %q", got, want)
	}
	if provider.Repository() != "Loyalsoldier/v2ray-rules-dat" {
		t.Fatalf("来源标识 = %q", provider.Repository())
	}
}
