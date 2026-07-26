package app

import (
	"context"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"
)

// PanelReleaseChecker 查询面板自身的最新发布 tag。
type PanelReleaseChecker func(ctx context.Context) (string, error)

// 面板自身的仓库坐标，新版本检查与一键部署脚本指向同一处。
const (
	panelRepoOwner = "tuoro"
	panelRepoName  = "kdae-panel"
)

type panelUpdate struct {
	Current         string    `json:"current"`
	Latest          string    `json:"latest,omitempty"`
	UpdateAvailable bool      `json:"updateAvailable"`
	CheckedAt       time.Time `json:"checkedAt"`
	Error           string    `json:"error,omitempty"`
}

const (
	// 这是给人看的提醒，不追求新鲜度；但绝不能把 GitHub 接口打成限流。
	panelUpdateCacheOK   = 6 * time.Hour
	panelUpdateCacheFail = 15 * time.Minute
)

// registerPanelUpdateRoutes 提供 GET /api/v1/panel/update。
// checker 为 nil 表示检查被关闭（KDAE_PANEL_DISABLE_UPDATE_CHECK），
// 端点仍然存在并如实说明，前端据此不再展示提醒。
func registerPanelUpdateRoutes(router *http.ServeMux, current string, checker PanelReleaseChecker) {
	var mu sync.Mutex
	var cached panelUpdate
	var expiresAt time.Time

	router.HandleFunc("GET /api/v1/panel/update", func(writer http.ResponseWriter, request *http.Request) {
		mu.Lock()
		defer mu.Unlock()
		now := time.Now()
		if now.Before(expiresAt) {
			writeJSON(writer, http.StatusOK, cached)
			return
		}
		result := panelUpdate{Current: current, CheckedAt: now.UTC()}
		ttl := panelUpdateCacheOK
		// dev 构建没有可比的版本号：不联网、不提示，而不是拿 dev 和 tag 硬比
		if _, ok := parseSemver(current); checker != nil && ok {
			latest, err := checker(request.Context())
			if err != nil {
				result.Error = err.Error()
				ttl = panelUpdateCacheFail
			} else {
				result.Latest = latest
				result.UpdateAvailable = versionBehind(current, latest)
			}
		}
		cached = result
		expiresAt = now.Add(ttl)
		writeJSON(writer, http.StatusOK, cached)
	})
}

type semver struct {
	parts      [3]int
	prerelease bool
}

// parseSemver 解析 vX.Y.Z 与 vX.Y.Z-pre。解析不了（如 "dev"）返回 false，
// 调用方据此放弃比较而不是猜。
func parseSemver(value string) (semver, bool) {
	value = strings.TrimPrefix(value, "v")
	base, pre, hasPre := strings.Cut(value, "-")
	fields := strings.Split(base, ".")
	if len(fields) != 3 || (hasPre && pre == "") {
		return semver{}, false
	}
	var parsed semver
	parsed.prerelease = hasPre
	for index, field := range fields {
		number, err := strconv.Atoi(field)
		if err != nil || number < 0 || (len(field) > 1 && strings.HasPrefix(field, "0")) {
			return semver{}, false
		}
		parsed.parts[index] = number
	}
	return parsed, true
}

// versionBehind 判断 current 是否落后于 latest。任一方解析失败都按"不落后"
// 处理：提醒宁缺毋滥，解析不了的版本号不该弹出升级横幅。
func versionBehind(current, latest string) bool {
	currentVersion, ok := parseSemver(current)
	if !ok {
		return false
	}
	latestVersion, ok := parseSemver(latest)
	if !ok {
		return false
	}
	for index := range currentVersion.parts {
		if currentVersion.parts[index] != latestVersion.parts[index] {
			return currentVersion.parts[index] < latestVersion.parts[index]
		}
	}
	// 基数相同：当前是预发布而最新是正式版，语义上落后（v1.0.0-rc.1 < v1.0.0）
	return currentVersion.prerelease && !latestVersion.prerelease
}
