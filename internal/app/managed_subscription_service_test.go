package app

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/managedsubscription"
)

type stubManagedSubscriptionService struct {
	items       []managedsubscription.Subscription
	prepared    managedsubscription.Subscription
	previous    []managedsubscription.Definition
	activated   [][]managedsubscription.Definition
	restored    [][]managedsubscription.Definition
	prepareErr  error
	activateErr error
	restoreErr  error
}

func (s *stubManagedSubscriptionService) List(context.Context) ([]managedsubscription.Subscription, error) {
	return append([]managedsubscription.Subscription(nil), s.items...), nil
}

func (s *stubManagedSubscriptionService) Prepare(_ context.Context, definition managedsubscription.Definition) (managedsubscription.Subscription, error) {
	if s.prepareErr != nil {
		return managedsubscription.Subscription{}, s.prepareErr
	}
	result := s.prepared
	result.Definition = definition
	return result, nil
}

func (s *stubManagedSubscriptionService) Activate(definitions []managedsubscription.Definition) ([]managedsubscription.Definition, error) {
	s.activated = append(s.activated, append([]managedsubscription.Definition(nil), definitions...))
	return append([]managedsubscription.Definition(nil), s.previous...), s.activateErr
}

func (s *stubManagedSubscriptionService) Restore(definitions []managedsubscription.Definition) error {
	s.restored = append(s.restored, append([]managedsubscription.Definition(nil), definitions...))
	return s.restoreErr
}

func (*stubManagedSubscriptionService) Refresh(context.Context) error { return nil }

func TestManagedSubscriptionRoutes(t *testing.T) {
	definition := managedsubscription.Definition{Tag: "main", URL: "https://example.com/sub", UserAgent: "Shadowrocket"}
	service := &stubManagedSubscriptionService{
		items:    []managedsubscription.Subscription{{Definition: definition, LocalURL: "file://managed.d/main.sub"}},
		prepared: managedsubscription.Subscription{LocalURL: "file://managed.d/main-next.sub"},
	}
	application, err := NewWithDependencies(Config{DisableUpdateCheck: true}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae: stubDaeService{}, ManagedSubscriptions: service,
	})
	if err != nil {
		t.Fatal(err)
	}

	listed := httptest.NewRecorder()
	application.Handler().ServeHTTP(listed, httptest.NewRequest(http.MethodGet, "/api/v1/subscriptions/managed", nil))
	if listed.Code != http.StatusOK || !strings.Contains(listed.Body.String(), "file://managed.d/main.sub") {
		t.Fatalf("list response = %d %s", listed.Code, listed.Body.String())
	}

	body, _ := json.Marshal(definition)
	prepared := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodPost, "/api/v1/subscriptions/managed/prepare", strings.NewReader(string(body)))
	request.Header.Set("Content-Type", "application/json")
	application.Handler().ServeHTTP(prepared, request)
	if prepared.Code != http.StatusOK || !strings.Contains(prepared.Body.String(), "file://managed.d/main-next.sub") {
		t.Fatalf("prepare response = %d %s", prepared.Code, prepared.Body.String())
	}
}

func TestConfigurationSaveRestoresManagedSubscriptionsOnFailure(t *testing.T) {
	previous := []managedsubscription.Definition{{Tag: "old", URL: "https://example.com/old", UserAgent: "FlClash"}}
	desired := []managedsubscription.Definition{{Tag: "next", URL: "https://example.com/next", UserAgent: "Shadowrocket"}}
	managed := &stubManagedSubscriptionService{previous: previous}
	application, err := NewWithDependencies(Config{DisableUpdateCheck: true}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:                  stubDaeService{},
		Configuration:        stubConfigurationService{saveErr: configstore.ErrConflict},
		ManagedSubscriptions: managed,
	})
	if err != nil {
		t.Fatal(err)
	}

	payload, _ := json.Marshal(configContentRequest{
		Content: "global {}", ExpectedHash: "stale", ManagedSubscriptions: &desired,
	})
	request := httptest.NewRequest(http.MethodPut, "/api/v1/config", strings.NewReader(string(payload)))
	request.Header.Set("Content-Type", "application/json")
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusConflict {
		t.Fatalf("response = %d %s", recorder.Code, recorder.Body.String())
	}
	if len(managed.activated) != 1 || len(managed.restored) != 1 {
		t.Fatalf("activate calls = %v, restore calls = %v", managed.activated, managed.restored)
	}
	if got := managed.activated[0]; len(got) != 1 || got[0] != desired[0] {
		t.Fatalf("activated = %+v", got)
	}
	if got := managed.restored[0]; len(got) != 1 || got[0] != previous[0] {
		t.Fatalf("restored = %+v", got)
	}
}

func TestConfigurationSaveStopsWhenManagedActivationFails(t *testing.T) {
	managed := &stubManagedSubscriptionService{activateErr: errors.New("cache missing")}
	application, err := NewWithDependencies(Config{DisableUpdateCheck: true}, slog.New(slog.NewTextHandler(io.Discard, nil)), Dependencies{
		Dae:                  stubDaeService{},
		Configuration:        stubConfigurationService{},
		ManagedSubscriptions: managed,
	})
	if err != nil {
		t.Fatal(err)
	}
	desired := []managedsubscription.Definition{{Tag: "next", URL: "https://example.com/next", UserAgent: "Shadowrocket"}}
	payload, _ := json.Marshal(configContentRequest{Content: "global {}", ManagedSubscriptions: &desired})
	request := httptest.NewRequest(http.MethodPut, "/api/v1/config", strings.NewReader(string(payload)))
	request.Header.Set("Content-Type", "application/json")
	recorder := httptest.NewRecorder()
	application.Handler().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusBadRequest || len(managed.restored) != 0 {
		t.Fatalf("response = %d %s, restore calls = %v", recorder.Code, recorder.Body.String(), managed.restored)
	}
}
