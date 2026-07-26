package upstream

import (
	"fmt"
	"os"
	"runtime"
	"strings"
)

// Platform 描述当前主机对应的 dae 发布资产标识。
// dae 的资产按 dae-linux-<平台>.zip 命名,x86_64 与 arm 还有按指令集细分的变体,
// 选错会直接以非法指令崩溃,因此这里按实际 CPU 特性挑选而不是只看 GOARCH。
type Platform struct {
	// Name 首选资产标识,如 x86_64_v3_avx2。
	Name string
	// Fallbacks 首选不存在时按顺序回退,末尾一定是最保守的基础变体。
	Fallbacks []string
}

// Candidates 返回按优先级排列的资产标识。
func (p Platform) Candidates() []string {
	return append([]string{p.Name}, p.Fallbacks...)
}

// DetectPlatform 依据 GOARCH 与 CPU 特性推断资产标识。
func DetectPlatform() (Platform, error) {
	return detectPlatform(runtime.GOARCH, readCPUFlags)
}

func detectPlatform(goarch string, flags func() map[string]bool) (Platform, error) {
	switch goarch {
	case "amd64":
		// 上游同时提供基础版与两个优化版,优先用主机支持的最高档。
		cpu := flags()
		switch {
		case cpu["avx2"]:
			return Platform{Name: "x86_64_v3_avx2", Fallbacks: []string{"x86_64_v2_sse", "x86_64"}}, nil
		case cpu["sse4_2"]:
			return Platform{Name: "x86_64_v2_sse", Fallbacks: []string{"x86_64"}}, nil
		default:
			return Platform{Name: "x86_64"}, nil
		}
	case "386":
		return Platform{Name: "x86_32"}, nil
	case "arm64":
		return Platform{Name: "arm64"}, nil
	case "arm":
		// GOARM 在编译期固定,运行期改看 CPU 特性:
		// neon/vfpv3 对应 v7,vfp 对应 v6,其余按 v5 处理。
		cpu := flags()
		switch {
		case cpu["neon"] || cpu["vfpv3"]:
			return Platform{Name: "armv7", Fallbacks: []string{"armv6", "armv5"}}, nil
		case cpu["vfp"]:
			return Platform{Name: "armv6", Fallbacks: []string{"armv5"}}, nil
		default:
			return Platform{Name: "armv5"}, nil
		}
	case "riscv64":
		return Platform{Name: "riscv64"}, nil
	case "loong64":
		return Platform{Name: "loongarch64"}, nil
	case "s390x":
		return Platform{Name: "s390x"}, nil
	case "ppc64":
		return Platform{Name: "powerpc64"}, nil
	case "ppc64le":
		return Platform{Name: "powerpc64le"}, nil
	case "mips":
		return Platform{Name: "mips32"}, nil
	case "mipsle":
		return Platform{Name: "mips32le"}, nil
	case "mips64":
		return Platform{Name: "mips64"}, nil
	case "mips64le":
		return Platform{Name: "mips64le"}, nil
	default:
		return Platform{}, fmt.Errorf("尚不支持的 CPU 架构 %q", goarch)
	}
}

// readCPUFlags 解析 /proc/cpuinfo 的 flags/Features 行。
// 读不到时返回空集合,调用方因此退回最保守的基础变体。
func readCPUFlags() map[string]bool {
	flags := make(map[string]bool)
	content, err := os.ReadFile("/proc/cpuinfo")
	if err != nil {
		return flags
	}
	for _, line := range strings.Split(string(content), "\n") {
		key, value, found := strings.Cut(line, ":")
		if !found {
			continue
		}
		switch strings.TrimSpace(key) {
		case "flags", "Features":
			for _, flag := range strings.Fields(value) {
				flags[flag] = true
			}
		}
	}
	return flags
}

// AssetName 返回资产文件名,如 dae-linux-x86_64.zip。
func AssetName(platform string) string {
	return "dae-linux-" + platform + ".zip"
}
