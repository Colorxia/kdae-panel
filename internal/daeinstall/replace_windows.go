//go:build windows

package daeinstall

import "os"

// replaceFile 在 Windows 上直接改名即可:os.Rename 使用 MOVEFILE_REPLACE_EXISTING,
// 已存在的目标会被覆盖。面板的部署目标是 Linux,这里只为让测试与本地开发可运行。
func replaceFile(source, destination string) error {
	return os.Rename(source, destination)
}
