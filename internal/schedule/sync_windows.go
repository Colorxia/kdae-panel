//go:build windows

package schedule

// Windows 不支持对目录句柄调用 fsync,文件本身的 Sync 已经保证内容持久化。
func syncDirectory(_ string) error {
	return nil
}
