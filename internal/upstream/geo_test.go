package upstream

import (
	"testing"
	"time"
)

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
	origin := geoOrigin{"Loyalsoldier", "v2ray-rules-dat", "geoip.dat"}
	got := downloadURL(origin, "202607252248", "geoip.dat")
	want := "https://github.com/Loyalsoldier/v2ray-rules-dat/releases/download/202607252248/geoip.dat"
	if got != want {
		t.Fatalf("下载地址 = %q，期望 %q", got, want)
	}
}

func TestParseGeoSource(t *testing.T) {
	for _, value := range []string{"loyalsoldier", "v2fly"} {
		if _, err := ParseGeoSource(value); err != nil {
			t.Fatalf("%q 应当被接受: %v", value, err)
		}
	}
	for _, value := range []string{"", "Loyalsoldier", "../etc", "v2rayA"} {
		if _, err := ParseGeoSource(value); err == nil {
			t.Fatalf("%q 不该被接受", value)
		}
	}
}

// v2fly 把两个文件放在两个仓库里，界面必须如实列出全部信任根，
// 不能只显示其中一个让人以为只信任一处。
func TestGeoRegistrySourcesListEveryRepository(t *testing.T) {
	registry := NewGeoRegistry()
	sources := registry.Sources()
	if len(sources) != 2 {
		t.Fatalf("应有两个来源: %+v", sources)
	}
	if sources[0].Source != GeoSourceLoyalsoldier {
		t.Fatalf("默认来源应排在最前: %+v", sources)
	}
	bySource := map[GeoSource]GeoSourceInfo{}
	for _, info := range sources {
		bySource[info.Source] = info
	}
	if got := bySource[GeoSourceLoyalsoldier].Repositories; len(got) != 1 || got[0] != "Loyalsoldier/v2ray-rules-dat" {
		t.Fatalf("Loyalsoldier 的仓库列表 = %v", got)
	}
	v2fly := bySource[GeoSourceV2fly].Repositories
	if len(v2fly) != 2 || v2fly[0] != "v2fly/domain-list-community" || v2fly[1] != "v2fly/geoip" {
		t.Fatalf("v2fly 应列出两个仓库: %v", v2fly)
	}
	if _, err := registry.provider("nope"); err == nil {
		t.Fatal("未知来源应报错")
	}
}

// 两个文件同属一次发布时用那个 tag；来自不同仓库时分别列出，
// 不编造一个看起来统一、实则不存在的版本号。
func TestSummariseTags(t *testing.T) {
	early := time.Date(2026, 7, 17, 12, 33, 0, 0, time.UTC)
	late := time.Date(2026, 7, 26, 6, 29, 0, 0, time.UTC)

	tag, published := summarise(map[string]GeoFile{
		GeoIPName:   {Name: GeoIPName, Tag: "202607252248", PublishedAt: late},
		GeoSiteName: {Name: GeoSiteName, Tag: "202607252248", PublishedAt: late},
	})
	if tag != "202607252248" || !published.Equal(late) {
		t.Fatalf("同一次发布应直接用该 tag: %q %v", tag, published)
	}

	tag, published = summarise(map[string]GeoFile{
		GeoIPName:   {Name: GeoIPName, Tag: "202607171233", PublishedAt: early},
		GeoSiteName: {Name: GeoSiteName, Tag: "20260726062913", PublishedAt: late},
	})
	if tag != "geoip 202607171233 / geosite 20260726062913" {
		t.Fatalf("不同仓库应分别列出: %q", tag)
	}
	if !published.Equal(late) {
		t.Fatalf("应取最新的发布时间: %v", published)
	}
}
