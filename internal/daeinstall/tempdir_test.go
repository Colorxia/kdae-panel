package daeinstall

import (
	"os"
	"testing"
	"time"
)

// testDir 代替 t.TempDir。Windows 上杀毒或索引服务会短暂持有新写文件的句柄，
// t.TempDir 的清理一旦撞上，"The directory is not empty" 会把整个测试判为
// 失败——那是环境竞态，不是被测代码的缺陷，本地全量测试因此约每五次红一次。
// 这里的清理带重试；重试用尽后只记日志不判失败，残留目录交给系统临时区。
func testDir(t *testing.T) string {
	t.Helper()
	directory, err := os.MkdirTemp("", "daeinstall-test-")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		var removeErr error
		for attempt := 0; attempt < 5; attempt++ {
			if removeErr = os.RemoveAll(directory); removeErr == nil {
				return
			}
			time.Sleep(100 * time.Millisecond)
		}
		t.Logf("清理临时目录失败（不影响测试结论）: %v", removeErr)
	})
	return directory
}
