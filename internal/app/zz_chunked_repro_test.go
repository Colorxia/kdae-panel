package app

import (
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/geodata"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

// 用真实 http.Server 发一个 Transfer-Encoding: chunked 的请求，验证服务端观察到的
// ContentLength 是否为 -1，以及来源是否被静默替换。
func TestReproChunkedGeoSource(t *testing.T) {
	service := &stubGeoService{status: geodata.Status{
		DefaultSource: upstream.GeoSourceLoyalsoldier,
		Updatable:     true,
	}}
	application := newGeoApp(t, service)

	var observed int64 = -999
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/api/v1/dae/geo" && r.Method == http.MethodPost {
			observed = r.ContentLength
		}
		application.Handler().ServeHTTP(w, r)
	}))
	defer server.Close()

	// io.NopCloser 包装后 http.Client 无法探知长度，会走 chunked。
	body := io.NopCloser(strings.NewReader(`{"source":"v2fly"}`))
	request, err := http.NewRequest(http.MethodPost, server.URL+"/api/v1/dae/geo", body)
	if err != nil {
		t.Fatal(err)
	}
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		t.Fatal(err)
	}
	defer response.Body.Close()
	payload, _ := io.ReadAll(response.Body)
	t.Logf("服务端观察到的 ContentLength = %d", observed)
	t.Logf("响应状态 = %d 内容 = %s", response.StatusCode, payload)

	deadline := time.Now().Add(3 * time.Second)
	for time.Now().Before(deadline) && service.requestedSource() == "" {
		time.Sleep(5 * time.Millisecond)
	}
	t.Logf("实际下载来源 = %q", service.requestedSource())
	if service.requestedSource() != upstream.GeoSourceV2fly {
		t.Errorf("缺陷复现：请求体写 v2fly，实际来源 %q", service.requestedSource())
	}
}
