// Package subscriptioncache 只读解析 dae 已经落盘的订阅缓存。
package subscriptioncache

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"
)

const (
	maxSources   = 128
	maxFileBytes = 8 << 20
)

var validTag = regexp.MustCompile(`^[A-Za-z_][A-Za-z0-9_.-]*$`)

type Node struct {
	Name     string `json:"name"`
	Protocol string `json:"protocol,omitempty"`
	Host     string `json:"host,omitempty"`
	Matches  int    `json:"matches"`
}

type Source struct {
	Tag      string    `json:"tag"`
	Nodes    []Node    `json:"nodes"`
	CachedAt time.Time `json:"cachedAt"`
	Skipped  int       `json:"skipped,omitempty"`
	Problem  string    `json:"problem,omitempty"`
}

// ManagedSource 描述由面板托管、且当前配置正在引用的订阅缓存。
// LocalURL 只接受 Manager 生成的 file://managed.d/<文件名> 形式。
type ManagedSource struct {
	Tag      string
	LocalURL string
}

type Reader struct {
	directory        string
	managedDirectory string
}

func New(configPath string) (*Reader, error) {
	if strings.TrimSpace(configPath) == "" {
		return nil, errors.New("dae 配置路径不能为空")
	}
	absConfig, err := filepath.Abs(configPath)
	if err != nil {
		return nil, fmt.Errorf("解析 dae 配置路径: %w", err)
	}
	configDirectory := filepath.Dir(absConfig)
	return &Reader{
		directory:        filepath.Join(configDirectory, "persist.d"),
		managedDirectory: filepath.Join(configDirectory, "managed.d"),
	}, nil
}

func (r *Reader) List(ctx context.Context) ([]Source, error) {
	entries, err := os.ReadDir(r.directory)
	if os.IsNotExist(err) {
		return []Source{}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("读取订阅缓存目录: %w", err)
	}

	files := make([]os.DirEntry, 0, len(entries))
	for _, entry := range entries {
		if strings.HasSuffix(entry.Name(), ".sub") && validTag.MatchString(strings.TrimSuffix(entry.Name(), ".sub")) {
			files = append(files, entry)
		}
	}
	if len(files) > maxSources {
		return nil, fmt.Errorf("订阅缓存数量超过 %d 个上限", maxSources)
	}

	sources := make([]Source, 0, len(files))
	for _, entry := range files {
		if err := ctx.Err(); err != nil {
			return nil, err
		}
		tag := strings.TrimSuffix(entry.Name(), ".sub")
		sources = append(sources, readSource(filepath.Join(r.directory, entry.Name()), tag))
	}
	sort.Slice(sources, func(left, right int) bool { return sources[left].Tag < sources[right].Tag })
	return sources, nil
}

// ListManaged 只读取管理器状态中当前激活的缓存，不扫描 managed.d。这样编辑订阅
// 产生的旧缓存或尚未保存的草稿不会冒充当前节点来源。
func (r *Reader) ListManaged(ctx context.Context, managed []ManagedSource) ([]Source, error) {
	if len(managed) > maxSources {
		return nil, fmt.Errorf("托管订阅缓存数量超过 %d 个上限", maxSources)
	}
	sources := make([]Source, 0, len(managed))
	seen := make(map[string]struct{}, len(managed))
	for _, item := range managed {
		if err := ctx.Err(); err != nil {
			return nil, err
		}
		if !validTag.MatchString(item.Tag) {
			return nil, fmt.Errorf("托管订阅标签 %q 无效", item.Tag)
		}
		if _, exists := seen[item.Tag]; exists {
			return nil, fmt.Errorf("托管订阅标签 %s 重复", item.Tag)
		}
		seen[item.Tag] = struct{}{}
		const prefix = "file://managed.d/"
		if !strings.HasPrefix(item.LocalURL, prefix) {
			return nil, fmt.Errorf("托管订阅 %s 的本地地址无效", item.Tag)
		}
		name := strings.TrimPrefix(item.LocalURL, prefix)
		if name == "" || filepath.Base(name) != name || strings.ContainsAny(name, `/\\`) {
			return nil, fmt.Errorf("托管订阅 %s 的缓存文件名无效", item.Tag)
		}
		sources = append(sources, readSource(filepath.Join(r.managedDirectory, name), item.Tag))
	}
	sort.Slice(sources, func(left, right int) bool { return sources[left].Tag < sources[right].Tag })
	return sources, nil
}

func readSource(path, tag string) Source {
	source := Source{Tag: tag, Nodes: []Node{}}
	info, err := os.Lstat(path)
	if err != nil {
		source.Problem = "读取缓存状态失败: " + err.Error()
		return source
	}
	source.CachedAt = info.ModTime()
	if !info.Mode().IsRegular() {
		source.Problem = "缓存不是普通文件"
		return source
	}
	if info.Size() > maxFileBytes {
		source.Problem = fmt.Sprintf("缓存超过 %d MiB 上限", maxFileBytes>>20)
		return source
	}
	content, err := readLimited(path, info)
	if err != nil {
		source.Problem = err.Error()
		return source
	}
	source.Nodes, source.Skipped, err = parseSubscription(content)
	if err != nil {
		source.Problem = err.Error()
	}
	return source
}

func readLimited(path string, expected os.FileInfo) ([]byte, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("打开订阅缓存: %w", err)
	}
	defer file.Close()
	opened, err := file.Stat()
	if err != nil {
		return nil, fmt.Errorf("读取订阅缓存状态: %w", err)
	}
	if !opened.Mode().IsRegular() || !os.SameFile(expected, opened) {
		return nil, errors.New("订阅缓存在读取前被替换")
	}
	content, err := io.ReadAll(io.LimitReader(file, maxFileBytes+1))
	if err != nil {
		return nil, fmt.Errorf("读取订阅缓存: %w", err)
	}
	if len(content) > maxFileBytes {
		return nil, fmt.Errorf("订阅缓存超过 %d MiB 上限", maxFileBytes>>20)
	}
	return content, nil
}
