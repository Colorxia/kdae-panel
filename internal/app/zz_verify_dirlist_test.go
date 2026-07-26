package app

import (
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/tuoro/kdae-panel/internal/auth"
)

func TestVerifyAssetsDirListingUnauthenticated(t *testing.T) {
	session := auth.Session{
		Token: "t", CSRFToken: "c",
		ExpiresAt: time.Now().Add(time.Hour),
		User:      auth.User{ID: 1, Username: "admin"},
	}
	application, err := NewWithDependencies(
		Config{Version: "test-panel"},
		slog.New(slog.NewTextHandler(io.Discard, nil)),
		Dependencies{
			Dae:            stubDaeService{},
			Configuration:  stubConfigurationService{},
			Authentication: &stubAuthenticationService{initialized: true, session: session},
		},
	)
	if err != nil {
		t.Fatal(err)
	}

	for _, p := range []string{"/assets/", "/api/v1/config", "/dashboard"} {
		rec := httptest.NewRecorder()
		// 完全无 Cookie
		application.Handler().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, p, nil))
		body := rec.Body.String()
		if len(body) > 180 {
			body = body[:180]
		}
		t.Logf("GET %-18s -> %d len=%d\n  %q", p, rec.Code, rec.Body.Len(), body)
	}
}
