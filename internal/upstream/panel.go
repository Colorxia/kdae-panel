package upstream

import (
	"context"
	"errors"
	"fmt"
)

// LatestPanelRelease 查询面板自身仓库的最新正式发布 tag。
// 用 releases/latest 而不是列表接口：它天然排除预发布与草稿，
// 与一键部署脚本取版本的语义完全一致——提示的正是用户重装会得到的那一版。
func LatestPanelRelease(ctx context.Context, owner, repo string) (string, error) {
	var release struct {
		TagName string `json:"tag_name"`
	}
	target := fmt.Sprintf("https://api.github.com/repos/%s/%s/releases/latest", owner, repo)
	if err := newHTTPClient().getJSON(ctx, target, &release); err != nil {
		return "", err
	}
	if release.TagName == "" {
		return "", errors.New("上游响应缺少 tag_name")
	}
	return release.TagName, nil
}
