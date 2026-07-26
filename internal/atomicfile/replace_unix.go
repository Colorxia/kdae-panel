//go:build !windows

package atomicfile

import (
	"os"
	"path/filepath"
)

// Replace 原子替换目标路径。
// 正在运行的可执行文件无法被写入(ETXTBSY),但可以被 rename 覆盖:
// 旧 inode 会保留到原进程退出,重启后自然使用新文件。
//
// 改名之后还要 fsync 父目录:rename 本身也需要落盘,否则断电后目录项可能回退,
// 出现"文件内容是新的、目录里却还指向旧 inode"这种难查的状态。
func Replace(source, destination string) error {
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
