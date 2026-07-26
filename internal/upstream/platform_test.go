package upstream

import (
	"slices"
	"strings"
	"testing"
)

func flagSet(names ...string) func() map[string]bool {
	return func() map[string]bool {
		flags := make(map[string]bool, len(names))
		for _, name := range names {
			flags[name] = true
		}
		return flags
	}
}

func TestDetectPlatformPicksBestX86Variant(t *testing.T) {
	cases := []struct {
		name      string
		flags     []string
		want      string
		fallbacks []string
	}{
		{"支持 avx2", []string{"sse4_2", "avx2"}, "x86_64_v3_avx2", []string{"x86_64_v2_sse", "x86_64"}},
		{"仅支持 sse4.2", []string{"sse4_2"}, "x86_64_v2_sse", []string{"x86_64"}},
		{"老 CPU", []string{"fpu"}, "x86_64", nil},
		{"读不到 cpuinfo", nil, "x86_64", nil},
	}
	for _, testCase := range cases {
		platform, err := detectPlatform("amd64", flagSet(testCase.flags...))
		if err != nil {
			t.Fatalf("%s: %v", testCase.name, err)
		}
		if platform.Name != testCase.want {
			t.Fatalf("%s: 首选 = %q，期望 %q", testCase.name, platform.Name, testCase.want)
		}
		if !slices.Equal(platform.Fallbacks, testCase.fallbacks) {
			t.Fatalf("%s: 回退 = %v，期望 %v", testCase.name, platform.Fallbacks, testCase.fallbacks)
		}
		// 无论选中哪一档，最后一个候选都必须是最保守的基础变体
		candidates := platform.Candidates()
		if candidates[len(candidates)-1] != "x86_64" {
			t.Fatalf("%s: 最终回退 = %q，期望 x86_64", testCase.name, candidates[len(candidates)-1])
		}
	}
}

func TestDetectPlatformArmVariants(t *testing.T) {
	cases := []struct {
		flags []string
		want  string
	}{
		{[]string{"neon"}, "armv7"},
		{[]string{"vfpv3"}, "armv7"},
		{[]string{"vfp"}, "armv6"},
		{nil, "armv5"},
	}
	for _, testCase := range cases {
		platform, err := detectPlatform("arm", flagSet(testCase.flags...))
		if err != nil {
			t.Fatal(err)
		}
		if platform.Name != testCase.want {
			t.Fatalf("flags=%v 首选 = %q，期望 %q", testCase.flags, platform.Name, testCase.want)
		}
		if candidates := platform.Candidates(); candidates[len(candidates)-1] != "armv5" {
			t.Fatalf("flags=%v 最终回退 = %q，期望 armv5", testCase.flags, candidates[len(candidates)-1])
		}
	}
}

func TestDetectPlatformSimpleArchitectures(t *testing.T) {
	expected := map[string]string{
		"arm64":    "arm64",
		"386":      "x86_32",
		"riscv64":  "riscv64",
		"loong64":  "loongarch64",
		"s390x":    "s390x",
		"ppc64":    "powerpc64",
		"ppc64le":  "powerpc64le",
		"mips":     "mips32",
		"mipsle":   "mips32le",
		"mips64":   "mips64",
		"mips64le": "mips64le",
	}
	for goarch, want := range expected {
		platform, err := detectPlatform(goarch, flagSet())
		if err != nil {
			t.Fatalf("%s: %v", goarch, err)
		}
		if platform.Name != want || len(platform.Fallbacks) != 0 {
			t.Fatalf("%s: 得到 %+v，期望 %q 且无回退", goarch, platform, want)
		}
	}
}

func TestDetectPlatformRejectsUnknownArchitecture(t *testing.T) {
	_, err := detectPlatform("sparc64", flagSet())
	if err == nil || !strings.Contains(err.Error(), "sparc64") {
		t.Fatalf("未知架构应报错并指明架构名，得到 %v", err)
	}
}

func TestAssetName(t *testing.T) {
	if got := AssetName("x86_64_v3_avx2"); got != "dae-linux-x86_64_v3_avx2.zip" {
		t.Fatalf("资产名 = %q", got)
	}
}
