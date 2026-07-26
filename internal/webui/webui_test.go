package webui

import (
	"io"
	"io/fs"
	"net/http"
	"net/http/httptest"
	"path"
	"strings"
	"testing"
)

func get(t *testing.T, target string) *http.Response {
	t.Helper()
	recorder := httptest.NewRecorder()
	Handler().ServeHTTP(recorder, httptest.NewRequest(http.MethodGet, target, nil))
	return recorder.Result()
}

// 目录也让 fs.Stat 成功，早先因此被交给 FileServer，而 assets/ 下没有
// index.html，于是吐出一份目录清单——一个没人打算提供的端点。
func TestDirectoryRequestsFallBackToIndex(t *testing.T) {
	for _, target := range []string{"/assets/", "/assets", "/assets/../assets/"} {
		response := get(t, target)
		body, err := io.ReadAll(response.Body)
		if err != nil {
			t.Fatal(err)
		}
		if response.StatusCode != http.StatusOK {
			t.Fatalf("%s 状态码 = %d", target, response.StatusCode)
		}
		if strings.Contains(string(body), "<pre>") || strings.Contains(string(body), "</a>\n") {
			t.Fatalf("%s 返回了目录清单:\n%s", target, string(body)[:min(400, len(body))])
		}
		if !strings.Contains(string(body), "<div id=\"app\">") {
			t.Fatalf("%s 应回退到 SPA 入口页，实际:\n%s", target, string(body)[:min(200, len(body))])
		}
	}
}

// 前端路由的路径在磁盘上不存在，必须回退到入口页而不是 404。
func TestUnknownRoutesFallBackToIndex(t *testing.T) {
	for _, target := range []string{"/dashboard", "/versions", "/config"} {
		response := get(t, target)
		if response.StatusCode != http.StatusOK {
			t.Fatalf("%s 状态码 = %d", target, response.StatusCode)
		}
	}
}

// 回退不能把真实资源也吃掉：构建产物必须原样送出。
func TestRealAssetsAreServed(t *testing.T) {
	dist, err := fs.Sub(assets, "dist")
	if err != nil {
		t.Fatal(err)
	}
	var sample string
	err = fs.WalkDir(dist, "assets", func(name string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !entry.IsDir() && path.Ext(name) == ".js" && sample == "" {
			sample = name
		}
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	if sample == "" {
		t.Skip("嵌入产物里没有 .js 资源")
	}

	response := get(t, "/"+sample)
	if response.StatusCode != http.StatusOK {
		t.Fatalf("%s 状态码 = %d", sample, response.StatusCode)
	}
	body, err := io.ReadAll(response.Body)
	if err != nil {
		t.Fatal(err)
	}
	// 送出的必须是这个资源本身，而不是被兜底换成了入口页
	if strings.Contains(string(body), "<div id=\"app\">") {
		t.Fatalf("%s 被错误地回退成了入口页", sample)
	}
	if len(body) == 0 {
		t.Fatalf("%s 内容为空", sample)
	}
}
