package webui

import (
	"embed"
	"io/fs"
	"net/http"
	"path"
	"strings"
)

//go:embed dist
var assets embed.FS

func Handler() http.Handler {
	dist, err := fs.Sub(assets, "dist")
	if err != nil {
		panic(err)
	}
	files := http.FileServer(http.FS(dist))

	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		requestedPath := strings.TrimPrefix(path.Clean(request.URL.Path), "/")
		if requestedPath != "." && requestedPath != "" {
			// 只有真正的文件才交给 FileServer。目录也让 Stat 成功，而 assets/ 下
			// 没有 index.html，FileServer 会吐出一份目录清单——那是个没人打算
			// 提供的端点。目录一律走 SPA 兜底，交给前端路由。
			if info, err := fs.Stat(dist, requestedPath); err == nil && !info.IsDir() {
				files.ServeHTTP(writer, request)
				return
			}
		}

		request.URL.Path = "/"
		files.ServeHTTP(writer, request)
	})
}
