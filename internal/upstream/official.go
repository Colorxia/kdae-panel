package upstream

import (
	"context"
	"fmt"
	"net/url"
	"strings"
	"time"
)

// OfficialProvider 读取 daeuniverse/dae 的 GitHub Release。
// 每个资产都配一个 .dgst 文件,里面按 "<哈希>  <文件名>  <算法>" 分行列出多种摘要。
type OfficialProvider struct {
	client *httpClient
	owner  string
	repo   string
}

func NewOfficialProvider(client *httpClient, owner, repo string) *OfficialProvider {
	return &OfficialProvider{client: client, owner: owner, repo: repo}
}

func (p *OfficialProvider) Source() Source {
	return SourceOfficial
}

type githubRelease struct {
	TagName     string    `json:"tag_name"`
	Name        string    `json:"name"`
	Draft       bool      `json:"draft"`
	Prerelease  bool      `json:"prerelease"`
	PublishedAt time.Time `json:"published_at"`
	Assets      []struct {
		Name               string `json:"name"`
		Size               int64  `json:"size"`
		BrowserDownloadURL string `json:"browser_download_url"`
	} `json:"assets"`
}

func (p *OfficialProvider) List(ctx context.Context, limit int) ([]Version, error) {
	if limit <= 0 || limit > 100 {
		limit = 30
	}
	endpoint := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases?per_page=%d", p.owner, p.repo, limit)
	var releases []githubRelease
	if err := p.client.getJSON(ctx, endpoint, &releases); err != nil {
		return nil, err
	}

	versions := make([]Version, 0, len(releases))
	for _, release := range releases {
		if release.Draft || release.TagName == "" {
			continue
		}
		description := release.Name
		if description == release.TagName {
			description = ""
		}
		versions = append(versions, Version{
			Source:      SourceOfficial,
			Ref:         release.TagName,
			Label:       release.TagName,
			Description: description,
			PublishedAt: release.PublishedAt,
			Prerelease:  release.Prerelease,
			Installable: true,
		})
	}
	return versions, nil
}

func (p *OfficialProvider) Resolve(ctx context.Context, ref string, platform Platform) (Asset, error) {
	if !validTag.MatchString(ref) {
		return Asset{}, fmt.Errorf("版本号 %q 无效", ref)
	}
	endpoint := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases/tags/%s",
		p.owner, p.repo, url.PathEscape(ref))
	var release githubRelease
	if err := p.client.getJSON(ctx, endpoint, &release); err != nil {
		return Asset{}, err
	}

	// 按候选顺序找本机能用的资产,首选没有就退到更保守的变体。
	for _, candidate := range platform.Candidates() {
		wanted := AssetName(candidate)
		for _, asset := range release.Assets {
			if asset.Name != wanted {
				continue
			}
			digest, err := p.fetchDigest(ctx, release, wanted)
			if err != nil {
				return Asset{}, err
			}
			return Asset{
				URL:      asset.BrowserDownloadURL,
				Filename: asset.Name,
				SHA256:   digest,
				Size:     asset.Size,
			}, nil
		}
	}
	return Asset{}, fmt.Errorf("版本 %s 没有提供适配本机架构（%s）的资产", ref, platform.Name)
}

func (p *OfficialProvider) fetchDigest(ctx context.Context, release githubRelease, assetName string) (string, error) {
	wanted := assetName + ".dgst"
	for _, asset := range release.Assets {
		if asset.Name != wanted {
			continue
		}
		content, err := p.client.getText(ctx, asset.BrowserDownloadURL)
		if err != nil {
			return "", err
		}
		digest, err := parseDigest(content, assetName)
		if err != nil {
			return "", err
		}
		return digest, nil
	}
	return "", fmt.Errorf("版本资产 %s 缺少校验和文件，拒绝安装", assetName)
}

// parseDigest 从 .dgst 内容里取 sha256。
// 按"第三列等于 sha256"定位,而不是依赖行号——上游若增删摘要算法,行号会失效。
func parseDigest(content, assetName string) (string, error) {
	for _, line := range strings.Split(content, "\n") {
		fields := strings.Fields(line)
		if len(fields) != 3 || fields[2] != "sha256" {
			continue
		}
		if fields[1] != assetName {
			continue
		}
		digest := strings.ToLower(fields[0])
		if len(digest) != 64 || strings.Trim(digest, "0123456789abcdef") != "" {
			return "", fmt.Errorf("校验和文件里的 sha256 值格式无效")
		}
		return digest, nil
	}
	return "", fmt.Errorf("校验和文件里没有 %s 的 sha256 条目", assetName)
}
