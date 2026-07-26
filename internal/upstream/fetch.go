package upstream

import (
	"archive/zip"
	"bytes"
	"context"
	"crypto/sha256"
	"crypto/subtle"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"path"
	"strings"
)

// BinaryName 是发布包内 dae 可执行文件的名字。
const BinaryName = "dae"

const (
	// maxBinaryBytes 限制解压后的可执行文件大小,防御 zip 炸弹。
	maxBinaryBytes = 200 << 20
	// maxZipEntries 限制条目数。归档内容完全由上游构建产物决定,
	// 声明的 UncompressedSize64 也是攻击者可控的,因此实际读入量另由
	// LimitReader 兜底,这里只挡住"条目多到离谱"的归档。
	maxZipEntries = 256
)

// Fetch 下载资产、比对 sha256 并取出其中的 dae 可执行文件。
// 校验不通过时返回错误且不产出任何内容——调用方据此保证只有可信字节进入后续流程。
func (r *Registry) Fetch(ctx context.Context, asset Asset) ([]byte, error) {
	if asset.SHA256 == "" {
		return nil, errors.New("资产缺少校验和，拒绝下载")
	}
	limit := int64(MaxAssetBytes)
	if asset.Size > 0 && asset.Size < limit {
		// 已知大小时收紧上限,留一点余量容忍元数据差异。
		limit = asset.Size + (1 << 20)
	}
	payload, err := newHTTPClient().download(ctx, asset.URL, limit)
	if err != nil {
		return nil, err
	}
	if err := verifyDigest(payload, asset.SHA256); err != nil {
		return nil, err
	}
	return extractBinary(payload, asset.Nested)
}

func verifyDigest(payload []byte, expected string) error {
	sum := sha256.Sum256(payload)
	actual := hex.EncodeToString(sum[:])
	if subtle.ConstantTimeCompare([]byte(actual), []byte(strings.ToLower(expected))) != 1 {
		return fmt.Errorf("校验和不匹配：期望 %s，实际 %s", expected, actual)
	}
	return nil
}

// extractBinary 从 zip 中取出 dae 可执行文件。
// nested 为真时先剥掉 Actions 产物那层外壳。
func extractBinary(payload []byte, nested bool) ([]byte, error) {
	if nested {
		inner, err := extractInnerArchive(payload)
		if err != nil {
			return nil, err
		}
		payload = inner
	}
	reader, err := zip.NewReader(bytes.NewReader(payload), int64(len(payload)))
	if err != nil {
		return nil, fmt.Errorf("解析发布包: %w", err)
	}
	if len(reader.File) > maxZipEntries {
		return nil, fmt.Errorf("发布包条目数超过 %d 限制", maxZipEntries)
	}
	// zip 允许重名条目,匹配到多个时无法判断该信哪个,直接拒绝。
	var found *zip.File
	for _, file := range reader.File {
		// 只按基名匹配,忽略条目里的目录部分,天然免疫 zip 路径穿越。
		if path.Base(file.Name) != BinaryName || file.FileInfo().IsDir() {
			continue
		}
		if !file.Mode().IsRegular() {
			return nil, errors.New("发布包中的 dae 不是普通文件")
		}
		if found != nil {
			return nil, errors.New("发布包中有多个 dae 条目，无法判断该用哪个")
		}
		found = file
	}
	if found == nil {
		return nil, errors.New("发布包中没有找到 dae 可执行文件")
	}
	return readZipEntry(found, maxBinaryBytes)
}

// extractInnerArchive 取出外层 zip 里唯一的那个 zip。
// 嵌套深度硬编码为两层,不写通用递归,避免可控的递归深度。
func extractInnerArchive(payload []byte) ([]byte, error) {
	reader, err := zip.NewReader(bytes.NewReader(payload), int64(len(payload)))
	if err != nil {
		return nil, fmt.Errorf("解析构建产物: %w", err)
	}
	if len(reader.File) > maxZipEntries {
		return nil, fmt.Errorf("构建产物条目数超过 %d 限制", maxZipEntries)
	}
	var found *zip.File
	for _, file := range reader.File {
		if file.FileInfo().IsDir() || !strings.HasSuffix(file.Name, ".zip") {
			continue
		}
		if !file.Mode().IsRegular() {
			return nil, errors.New("构建产物中的发布包不是普通文件")
		}
		if found != nil {
			return nil, errors.New("构建产物中有多个发布包，无法判断该用哪个")
		}
		found = file
	}
	if found == nil {
		return nil, errors.New("构建产物中没有找到发布包")
	}
	return readZipEntry(found, MaxAssetBytes)
}

func readZipEntry(file *zip.File, limit int64) ([]byte, error) {
	entry, err := file.Open()
	if err != nil {
		return nil, fmt.Errorf("读取 %s: %w", file.Name, err)
	}
	defer entry.Close()
	// 即使声明的 UncompressedSize64 撒谎,LimitReader 仍然兜住实际读入量。
	content, err := io.ReadAll(io.LimitReader(entry, limit+1))
	if err != nil {
		return nil, fmt.Errorf("解压 %s: %w", file.Name, err)
	}
	if int64(len(content)) > limit {
		return nil, fmt.Errorf("%s 解压后超过 %d 字节限制", file.Name, limit)
	}
	return content, nil
}
