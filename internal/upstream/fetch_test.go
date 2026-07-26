package upstream

import (
	"archive/zip"
	"bytes"
	"strings"
	"testing"
)

func buildZip(t *testing.T, entries map[string][]byte) []byte {
	t.Helper()
	var buffer bytes.Buffer
	writer := zip.NewWriter(&buffer)
	for name, content := range entries {
		entry, err := writer.Create(name)
		if err != nil {
			t.Fatal(err)
		}
		if _, err := entry.Write(content); err != nil {
			t.Fatal(err)
		}
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}
	return buffer.Bytes()
}

// 官方发布包里的可执行文件按平台命名，且与单元、示例配置、geo 数据同处一包。
// 这正是真实 zip 的样子——早先按 "dae" 精确匹配会在这里失败。
func TestExtractBinaryFromRealReleaseLayout(t *testing.T) {
	archive := buildZip(t, map[string][]byte{
		"dae-linux-x86_64": []byte("ELF-binary"),
		"dae.service":      []byte("[Unit]"),
		"example.dae":      []byte("global {}"),
		"empty.dae":        []byte("global {} routing {}"),
		"geoip.dat":        []byte("geo"),
		"geosite.dat":      []byte("geo"),
	})
	binary, err := extractBinary(archive, false)
	if err != nil {
		t.Fatal(err)
	}
	if string(binary) != "ELF-binary" {
		t.Fatalf("取出的内容 = %q", binary)
	}
}

func TestExtractBinaryAcceptsPlainName(t *testing.T) {
	archive := buildZip(t, map[string][]byte{
		"dae":         []byte("ELF-binary"),
		"geoip.dat":   []byte("geo"),
		"example.dae": []byte("config"),
	})
	binary, err := extractBinary(archive, false)
	if err != nil {
		t.Fatal(err)
	}
	if string(binary) != "ELF-binary" {
		t.Fatalf("取出的内容 = %q", binary)
	}
}

func TestIsBinaryEntry(t *testing.T) {
	for _, name := range []string{"dae", "dae-linux-x86_64", "dae-linux-arm64", "dae-linux-x86_64_v3_avx2"} {
		if !isBinaryEntry(name) {
			t.Fatalf("%q 应被识别为可执行文件", name)
		}
	}
	// 同一个包里的其它物料都不能被误认
	for _, name := range []string{"dae.service", "example.dae", "empty.dae", "geoip.dat", "geosite.dat", "README.md", "daemon", ""} {
		if isBinaryEntry(name) {
			t.Fatalf("%q 不应被识别为可执行文件", name)
		}
	}
}

// Actions 产物可能直接平铺文件，而不是再套一层发布包 zip。
func TestExtractBinaryFromFlatArtifact(t *testing.T) {
	outer := buildZip(t, map[string][]byte{
		"dae-linux-x86_64": []byte("ELF-binary"),
		"geoip.dat":        []byte("geo"),
	})
	binary, err := extractBinary(outer, true)
	if err != nil {
		t.Fatal(err)
	}
	if string(binary) != "ELF-binary" {
		t.Fatalf("取出的内容 = %q", binary)
	}
}

func TestExtractBinaryFromNestedArtifact(t *testing.T) {
	inner := buildZip(t, map[string][]byte{"dae": []byte("ELF-binary")})
	outer := buildZip(t, map[string][]byte{"dae-linux-x86_64.zip": inner})
	binary, err := extractBinary(outer, true)
	if err != nil {
		t.Fatal(err)
	}
	if string(binary) != "ELF-binary" {
		t.Fatalf("取出的内容 = %q", binary)
	}
}

func TestExtractBinaryIgnoresEntryPaths(t *testing.T) {
	// 条目名带目录时按基名匹配，且条目路径从不参与落盘，天然免疫 zip 路径穿越
	archive := buildZip(t, map[string][]byte{
		"nested/dir/dae": []byte("ELF-binary"),
		"README.md":      []byte("doc"),
	})
	binary, err := extractBinary(archive, false)
	if err != nil {
		t.Fatal(err)
	}
	if string(binary) != "ELF-binary" {
		t.Fatalf("取出的内容 = %q", binary)
	}
}

func TestExtractBinaryRejectsAmbiguousEntries(t *testing.T) {
	// zip 允许重名条目：一个恶意条目 ../../etc/dae 与真条目并存时，
	// 无法判断该信哪个，必须拒绝而不是任选其一
	archive := buildZip(t, map[string][]byte{
		"../../etc/dae":  []byte("evil"),
		"nested/dir/dae": []byte("ELF-binary"),
	})
	if _, err := extractBinary(archive, false); err == nil || !strings.Contains(err.Error(), "多个 dae") {
		t.Fatalf("多个同名条目应被拒绝，得到 %v", err)
	}
}

func TestExtractInnerArchiveRejectsAmbiguousArchives(t *testing.T) {
	inner := buildZip(t, map[string][]byte{"dae": []byte("ELF-binary")})
	outer := buildZip(t, map[string][]byte{
		"dae-linux-x86_64.zip": inner,
		"extra.zip":            inner,
	})
	if _, err := extractBinary(outer, true); err == nil || !strings.Contains(err.Error(), "多个发布包") {
		t.Fatalf("多个内层 zip 应被拒绝，得到 %v", err)
	}
}

func TestExtractBinaryRejectsMissingBinary(t *testing.T) {
	archive := buildZip(t, map[string][]byte{"README.md": []byte("nothing here")})
	if _, err := extractBinary(archive, false); err == nil || !strings.Contains(err.Error(), "没有找到 dae") {
		t.Fatalf("缺少 dae 应报错，得到 %v", err)
	}
}

func TestExtractBinaryRejectsBrokenArchive(t *testing.T) {
	if _, err := extractBinary([]byte("not a zip"), false); err == nil {
		t.Fatal("非法 zip 应报错")
	}
	if _, err := extractBinary([]byte("not a zip"), true); err == nil {
		t.Fatal("非法外层 zip 应报错")
	}
}

// 既没有内层发布包、外层也找不到可执行文件时才算真的失败。
func TestExtractBinaryRejectsArtifactWithoutBinary(t *testing.T) {
	outer := buildZip(t, map[string][]byte{
		"README.md": []byte("nothing"),
		"geoip.dat": []byte("geo"),
	})
	if _, err := extractBinary(outer, true); err == nil || !strings.Contains(err.Error(), "没有找到 dae") {
		t.Fatalf("产物里没有可执行文件时应报错，得到 %v", err)
	}
}

func TestVerifyDigest(t *testing.T) {
	payload := []byte("hello")
	// echo -n hello | sha256sum
	const expected = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
	if err := verifyDigest(payload, expected); err != nil {
		t.Fatalf("正确校验和应通过: %v", err)
	}
	if err := verifyDigest(payload, strings.ToUpper(expected)); err != nil {
		t.Fatalf("大写校验和应同样通过: %v", err)
	}
	if err := verifyDigest([]byte("tampered"), expected); err == nil {
		t.Fatal("内容被篡改时必须拒绝")
	}
}

func TestParseDigestPicksSHA256ByAlgorithmColumn(t *testing.T) {
	// 真实 .dgst 的四行格式：<哈希>  <文件名>  <算法>
	content := strings.Join([]string{
		"f795ebe019381d3aab6a459c9b759768  dae-linux-x86_64.zip  md5",
		"62a8791cbd265eb9c31184103b8e841f0065a811  dae-linux-x86_64.zip  sha1",
		"b8c55cdd7d4a2b45105189f9c00160383dfde20578e6974767e51305a73b3576  dae-linux-x86_64.zip  sha256",
		"2dcad50a40343ab0dabbf20859456c007871667f5a1375f1d253d8a772984ae3  dae-linux-x86_64.zip  sha512",
	}, "\n")
	digest, err := parseDigest(content, "dae-linux-x86_64.zip")
	if err != nil {
		t.Fatal(err)
	}
	if digest != "b8c55cdd7d4a2b45105189f9c00160383dfde20578e6974767e51305a73b3576" {
		t.Fatalf("解析出的 sha256 = %q", digest)
	}
}

func TestParseDigestIsRobustToLineOrder(t *testing.T) {
	// 上游若增删摘要算法导致行序变化，按算法列定位仍然正确
	content := strings.Join([]string{
		"b8c55cdd7d4a2b45105189f9c00160383dfde20578e6974767e51305a73b3576  dae-linux-arm64.zip  sha256",
		"f795ebe019381d3aab6a459c9b759768  dae-linux-arm64.zip  md5",
	}, "\n")
	digest, err := parseDigest(content, "dae-linux-arm64.zip")
	if err != nil || digest != "b8c55cdd7d4a2b45105189f9c00160383dfde20578e6974767e51305a73b3576" {
		t.Fatalf("digest = %q, err = %v", digest, err)
	}
}

func TestParseDigestRejectsWrongFileOrBadValue(t *testing.T) {
	content := "b8c55cdd7d4a2b45105189f9c00160383dfde20578e6974767e51305a73b3576  dae-linux-arm64.zip  sha256"
	if _, err := parseDigest(content, "dae-linux-x86_64.zip"); err == nil {
		t.Fatal("文件名不匹配时不应采信该校验和")
	}
	bad := "zzzz  dae-linux-x86_64.zip  sha256"
	if _, err := parseDigest(bad, "dae-linux-x86_64.zip"); err == nil {
		t.Fatal("非法 sha256 值应被拒绝")
	}
}

func TestParseArtifactDigest(t *testing.T) {
	digest, err := parseArtifactDigest("sha256:69e1b4cfca0452af4efcfb56c0d1f32200ddbd31f539256d76b003c4ccd7db68")
	if err != nil || digest != "69e1b4cfca0452af4efcfb56c0d1f32200ddbd31f539256d76b003c4ccd7db68" {
		t.Fatalf("digest = %q, err = %v", digest, err)
	}
	for _, invalid := range []string{"", "md5:abc", "sha256:", "sha256:xyz", "69e1b4cf"} {
		if _, err := parseArtifactDigest(invalid); err == nil {
			t.Fatalf("%q 应被拒绝", invalid)
		}
	}
}

func TestParseSourceRejectsUnknown(t *testing.T) {
	for _, valid := range []string{"official", "kdae"} {
		if _, err := ParseSource(valid); err != nil {
			t.Fatalf("%q 应被接受: %v", valid, err)
		}
	}
	if _, err := ParseSource("../etc"); err == nil {
		t.Fatal("未知来源应被拒绝")
	}
}

func TestRefValidation(t *testing.T) {
	for _, valid := range []string{"v2.0.0", "v1.2.3-rc1", "2026.07.26"} {
		if !validTag.MatchString(valid) {
			t.Fatalf("%q 应是合法 tag", valid)
		}
	}
	for _, invalid := range []string{"", "../v1", "v1/../..", ".hidden", "a b", strings.Repeat("v", 200)} {
		if validTag.MatchString(invalid) {
			t.Fatalf("%q 不应通过 tag 校验", invalid)
		}
	}
	for _, valid := range []string{"1", "30187784287"} {
		if !validRunID.MatchString(valid) {
			t.Fatalf("%q 应是合法构建编号", valid)
		}
	}
	for _, invalid := range []string{"", "abc", "-1", "12a", "../1"} {
		if validRunID.MatchString(invalid) {
			t.Fatalf("%q 不应通过构建编号校验", invalid)
		}
	}
}
