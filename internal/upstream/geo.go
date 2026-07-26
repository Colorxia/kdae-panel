package upstream

import (
	"context"
	"fmt"
	"net/url"
	"strings"
	"time"
)

// GeoFileName 是 dae 查找的两个 geo 数据文件名。
const (
	GeoIPName   = "geoip.dat"
	GeoSiteName = "geosite.dat"
)

// maxGeoBytes 限制单个 geo 文件的下载量。
// 实测 geoip.dat 约 17MB、geosite.dat 约 10MB，且两者都在长年增长，
// 64MB 留足余量的同时挡住无限响应体。
const maxGeoBytes = 64 << 20

// GeoRelease 描述上游一次 geo 数据发布。
//
// 与 dae 的版本不同，geo 数据不需要选择版本：它没有"回到某个历史版本"的用例，
// 用户要的永远是最新的一份。因此这里只解析 latest，不提供版本列表。
type GeoRelease struct {
	Tag         string    `json:"tag"`
	PublishedAt time.Time `json:"publishedAt"`
	// Files 是本次发布里两个 geo 文件的元数据，按 dae 使用的文件名索引。
	Files map[string]GeoFile `json:"files"`
}

// GeoFile 是一个 geo 数据文件的元数据。
type GeoFile struct {
	// Name 是 dae 使用的文件名（geoip.dat / geosite.dat）。
	Name string `json:"name"`
	// Asset 是它在上游发布里的资产名。上游可能用别的名字发布同一份数据
	// （如 v2fly 把 geosite 发布为 dlc.dat），因此两者分开记录。
	Asset string `json:"-"`
	Size  int64  `json:"size"`
}

// GeoData 是取回并逐一校验过 sha256 的 geo 文件内容。
type GeoData struct {
	Release GeoRelease
	Files   map[string][]byte
}

// GeoProvider 从一个 GitHub 仓库的 Release 取 geo 数据。
//
// 与 dae 发布包不同，这些 .dat 文件是裸的资产，不是 zip，因此不走 FetchBundle
// 那条解包路径；校验和是每个资产各自的 .sha256sum 文件，格式是 coreutils 的
// "<哈希>  <文件名>"，与 dae 的 .dgst（三列，含算法名）也不一样。
type GeoProvider struct {
	client *httpClient
	owner  string
	repo   string
	// files 把 dae 用的文件名映射到上游的资产名。
	files map[string]string
}

// NewGeoProvider 构造一个 geo 数据 provider。
func NewGeoProvider(client *httpClient, owner, repo string, files map[string]string) *GeoProvider {
	return &GeoProvider{client: client, owner: owner, repo: repo, files: files}
}

// NewDefaultGeoProvider 指向 Loyalsoldier/v2ray-rules-dat。
//
// 它每天发布一次，两个文件的资产名与 dae 使用的文件名一致，且各自附带
// .sha256sum。这不是 dae 发布包里那一套数据（包里的来自 v2fly），规则集不同，
// 详见 SECURITY.md 与界面上的提示。
func NewDefaultGeoProvider() *GeoProvider {
	return NewGeoProvider(newHTTPClient(), "Loyalsoldier", "v2ray-rules-dat", map[string]string{
		GeoIPName:   GeoIPName,
		GeoSiteName: GeoSiteName,
	})
}

// Repository 返回数据来源，用于在界面与日志里如实标明信任根。
func (p *GeoProvider) Repository() string {
	return p.owner + "/" + p.repo
}

// Latest 解析最新一次发布，确认两个文件与各自的校验和文件都在。
func (p *GeoProvider) Latest(ctx context.Context) (GeoRelease, error) {
	endpoint := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases/latest", p.owner, p.repo)
	var release githubRelease
	if err := p.client.getJSON(ctx, endpoint, &release); err != nil {
		return GeoRelease{}, err
	}
	if !validTag.MatchString(release.TagName) {
		return GeoRelease{}, fmt.Errorf("上游发布的 tag %q 无效", release.TagName)
	}

	result := GeoRelease{
		Tag:         release.TagName,
		PublishedAt: release.PublishedAt,
		Files:       make(map[string]GeoFile, len(p.files)),
	}
	for name, assetName := range p.files {
		asset, found := findAsset(release, assetName)
		if !found {
			return GeoRelease{}, fmt.Errorf("上游发布 %s 里没有 %s", release.TagName, assetName)
		}
		// 校验和缺失一律拒绝，与安装二进制同一条纪律，没有跳过开关。
		if _, found := findAsset(release, assetName+".sha256sum"); !found {
			return GeoRelease{}, fmt.Errorf("上游发布 %s 里的 %s 没有校验和文件，拒绝下载",
				release.TagName, assetName)
		}
		if asset.Size > maxGeoBytes {
			return GeoRelease{}, fmt.Errorf("%s 声明大小 %d 字节，超过 %d 限制",
				assetName, asset.Size, maxGeoBytes)
		}
		result.Files[name] = GeoFile{Name: name, Asset: assetName, Size: asset.Size}
	}
	return result, nil
}

// Fetch 下载并逐个校验 geo 文件。任一文件校验不过就整体失败，不产出任何内容。
func (p *GeoProvider) Fetch(ctx context.Context, release GeoRelease) (GeoData, error) {
	data := GeoData{Release: release, Files: make(map[string][]byte, len(release.Files))}
	for name, file := range release.Files {
		digest, err := p.fetchDigest(ctx, release.Tag, file.Asset)
		if err != nil {
			return GeoData{}, err
		}
		limit := int64(maxGeoBytes)
		if file.Size > 0 && file.Size < limit {
			// 已知大小时收紧上限，留一点余量容忍元数据差异。
			limit = file.Size + (1 << 20)
		}
		content, err := p.client.download(ctx, p.downloadURL(release.Tag, file.Asset), limit)
		if err != nil {
			return GeoData{}, err
		}
		if err := verifyDigest(content, digest); err != nil {
			return GeoData{}, fmt.Errorf("%s: %w", file.Asset, err)
		}
		data.Files[name] = content
	}
	return data, nil
}

// downloadURL 自行拼出资产地址，与官方发布走同一条纪律：
// 不采信接口响应里的 browser_download_url，被篡改的响应最多让校验和对不上。
func (p *GeoProvider) downloadURL(tag, assetName string) string {
	return fmt.Sprintf("https://github.com/%s/%s/releases/download/%s/%s",
		p.owner, p.repo, url.PathEscape(tag), url.PathEscape(assetName))
}

func (p *GeoProvider) fetchDigest(ctx context.Context, tag, assetName string) (string, error) {
	content, err := p.client.getText(ctx, p.downloadURL(tag, assetName+".sha256sum"))
	if err != nil {
		return "", err
	}
	return parseSHA256Sum(content, assetName)
}

// parseSHA256Sum 解析 coreutils sha256sum 的输出格式："<哈希>  <文件名>"。
//
// 刻意不复用 parseDigest：dae 的 .dgst 是三列（哈希、文件名、算法名），
// 用它解析这里的两列内容会一律报"没有对应条目"，错误信息与真正的原因南辕北辙。
//
// 文件名一栏容忍不匹配：上游有时用别名发布同一份数据，而这个文件本来就是
// 按资产名单独取回的，一份文件对一个校验和，不存在选错行的可能。
func parseSHA256Sum(content, assetName string) (string, error) {
	for line := range strings.Lines(content) {
		fields := strings.Fields(line)
		if len(fields) == 0 {
			continue
		}
		digest := strings.ToLower(fields[0])
		if len(digest) != 64 || strings.Trim(digest, "0123456789abcdef") != "" {
			continue
		}
		return digest, nil
	}
	return "", fmt.Errorf("%s 的校验和文件里没有有效的 sha256 值", assetName)
}
