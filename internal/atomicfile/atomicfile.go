// Package atomicfile 提供"要么完整落盘，要么什么都没变"的写入。
//
// 面板替换的都是 dae 正在使用的文件——可执行文件、配置、geo 数据。半个文件
// 落在磁盘上比写入失败糟糕得多：dae 可能在任意时刻读它，而错误现场离原因很远。
// 因此一律走"同目录临时文件 → fsync → 原子改名"，并 fsync 父目录让改名本身持久化。
package atomicfile

import (
	"fmt"
	"os"
	"path/filepath"
)

// Write 把内容原子地写入 path。
func Write(path string, content []byte, mode os.FileMode) error {
	staged, cleanup, err := Stage(filepath.Dir(path), content, mode)
	if err != nil {
		return err
	}
	defer cleanup()
	if err := os.MkdirAll(filepath.Dir(path), 0o700); err != nil {
		return err
	}
	return Replace(staged, path)
}

// Stage 在 directory 下写一个带内容的临时文件，返回它的路径与清理函数。
//
// 必须与目标同目录：跨文件系统改名会 EXDEV，而面板单元开了 PrivateTmp，
// /tmp 也常以 noexec 挂载，放那里的可执行文件连自检都跑不了。
//
// 临时名由 os.CreateTemp 生成而非固定后缀：固定名字会让两个并发写者
// 踩同一个文件，后者的内容可能被前者的清理删掉。
func Stage(directory string, content []byte, mode os.FileMode) (string, func(), error) {
	noop := func() {}
	if mode.Perm() == 0 {
		mode = 0o600
	}
	if err := os.MkdirAll(directory, 0o700); err != nil {
		return "", noop, fmt.Errorf("创建目录 %s: %w", directory, err)
	}
	file, err := os.CreateTemp(directory, ".kdae-panel-*")
	if err != nil {
		return "", noop, fmt.Errorf("创建暂存文件: %w", err)
	}
	path := file.Name()
	cleanup := func() { _ = os.Remove(path) }

	if _, err := file.Write(content); err != nil {
		_ = file.Close()
		cleanup()
		return "", noop, fmt.Errorf("写入暂存文件: %w", err)
	}
	// CreateTemp 一律建成 0600，权限要显式设回去；UMask 不影响 Chmod。
	if err := file.Chmod(mode.Perm()); err != nil {
		_ = file.Close()
		cleanup()
		return "", noop, fmt.Errorf("设置权限: %w", err)
	}
	if err := file.Sync(); err != nil {
		_ = file.Close()
		cleanup()
		return "", noop, fmt.Errorf("同步暂存文件: %w", err)
	}
	if err := file.Close(); err != nil {
		cleanup()
		return "", noop, fmt.Errorf("关闭暂存文件: %w", err)
	}
	return path, cleanup, nil
}
