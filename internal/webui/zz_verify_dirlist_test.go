package webui

import (
	"io"
	"net/http/httptest"
	"testing"
)

func TestVerifyDirectoryListing(t *testing.T) {
	handler := Handler()
	for _, path := range []string{"/assets/", "/assets", "/dashboard", "/", "/assets/Alert-DecjX5ZT.js"} {
		recorder := httptest.NewRecorder()
		handler.ServeHTTP(recorder, httptest.NewRequest("GET", path, nil))
		body, _ := io.ReadAll(recorder.Result().Body)
		snippet := string(body)
		if len(snippet) > 200 {
			snippet = snippet[:200]
		}
		t.Logf("GET %-30s -> %d ctype=%q len=%d loc=%q\n  snippet=%q",
			path, recorder.Code, recorder.Header().Get("Content-Type"), len(body),
			recorder.Header().Get("Location"), snippet)
	}
}
