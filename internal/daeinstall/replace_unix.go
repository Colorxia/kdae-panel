//go:build !windows

package daeinstall

import (
	"os"
	"path/filepath"
)

// replaceFile 原子替换目标路径。
// 正在运行的可执行文件无法被写入(ETXTBSY),但可以被 rename 覆盖:
// 旧 inode 会保留到原进程退出,重启后自然使用新文件。
func replaceFile(source, destination string) error {
	if err := os.Rename(source, destination); err != nil {
		return err
	}
	directory, err := os.Open(filepath.Dir(destination))
	if err != nil {
		return err
	}
	defer directory.Close()
	return directory.Sync()
}
