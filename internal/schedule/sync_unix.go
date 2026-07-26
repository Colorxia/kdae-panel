//go:build !windows

package schedule

import "os"

// syncDirectory 让 rename 产生的目录项落盘。
// 与 configstore 中的同名助手实现一致:两者都刻意保持独立,
// 避免为共用几行代码而牵动配置事务那条路径。
func syncDirectory(path string) error {
	directory, err := os.Open(path)
	if err != nil {
		return err
	}
	defer directory.Close()
	return directory.Sync()
}
