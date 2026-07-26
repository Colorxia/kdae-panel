package app

import (
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/auth"
)

// 探针：验证 securityHeaders 是否已经为四个 auth 端点设好 Cache-Control。
func TestProbeAuthEndpointsCacheControl(t *testing.T) {
	session := auth.Session{
		Token:     "session-token",
		CSRFToken: "csrf-token",
		User:      auth.User{ID: 1, Username: "admin"},
		ExpiresAt: time.Now().Add(time.Hour),
	}
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))

	// bootstrap 端点需要非空 token
	appWithToken, err := NewWithDependencies(
		Config{BootstrapToken: "boot-token"},
		logger,
		Dependencies{Dae: stubDaeService{}, Authentication: &stubAuthenticationService{session: session}},
	)
	if err != nil {
		t.Fatal(err)
	}
	// setup/login 端点在无 bootstrap token 时可直接通过
	appNoToken, err := NewWithDependencies(
		Config{},
		logger,
		Dependencies{Dae: stubDaeService{}, Authentication: &stubAuthenticationService{session: session}},
	)
	if err != nil {
		t.Fatal(err)
	}

	cases := []struct {
		name     string
		app      *App
		request  *http.Request
		wantCode int
	}{
		{"status", appNoToken, httptest.NewRequest(http.MethodGet, "/api/v1/auth/status", nil), http.StatusOK},
		{"bootstrap", appWithToken, httptest.NewRequest(http.MethodPost, "/api/v1/auth/bootstrap", strings.NewReader(`{"token":"boot-token"}`)), http.StatusNoContent},
		{"setup", appNoToken, httptest.NewRequest(http.MethodPost, "/api/v1/auth/setup", strings.NewReader(`{"username":"admin","password":"Passw0rd!longenough"}`)), http.StatusCreated},
		{"login", appNoToken, httptest.NewRequest(http.MethodPost, "/api/v1/auth/login", strings.NewReader(`{"username":"admin","password":"Passw0rd!longenough"}`)), http.StatusOK},
	}
	for _, testCase := range cases {
		recorder := httptest.NewRecorder()
		testCase.app.Handler().ServeHTTP(recorder, testCase.request)
		if recorder.Code != testCase.wantCode {
			t.Fatalf("%s 状态码 = %d，期望 %d，体=%s", testCase.name, recorder.Code, testCase.wantCode, recorder.Body.String())
		}
		got := recorder.Header().Values("Cache-Control")
		if len(got) != 1 || got[0] != "no-store" {
			t.Fatalf("%s Cache-Control = %q", testCase.name, got)
		}
		t.Logf("%s -> Cache-Control=%q", testCase.name, got)
	}
}
