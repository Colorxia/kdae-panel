package app

import (
	"context"
	"fmt"
	"net/http"
	"sort"

	"github.com/tuoro/kdae-panel/internal/managedsubscription"
	"github.com/tuoro/kdae-panel/internal/subscriptioncache"
)

type ManagedSubscriptionService interface {
	List(ctx context.Context) ([]managedsubscription.Subscription, error)
	Prepare(ctx context.Context, definition managedsubscription.Definition) (managedsubscription.Subscription, error)
	Activate(definitions []managedsubscription.Definition) ([]managedsubscription.Definition, error)
	Restore(definitions []managedsubscription.Definition) error
	Refresh(ctx context.Context) error
}

type managedSubscriptionDaeService struct {
	DaeService
	managed ManagedSubscriptionService
}

type managedSubscriptionNodeService struct {
	base    SubscriptionNodeService
	reader  *subscriptioncache.Reader
	managed ManagedSubscriptionService
}

func (s managedSubscriptionNodeService) List(ctx context.Context) ([]subscriptioncache.Source, error) {
	sources, err := s.base.List(ctx)
	if err != nil {
		return nil, err
	}
	items, err := s.managed.List(ctx)
	if err != nil {
		return nil, err
	}
	managedSources := make([]subscriptioncache.ManagedSource, 0, len(items))
	for _, item := range items {
		managedSources = append(managedSources, subscriptioncache.ManagedSource{Tag: item.Tag, LocalURL: item.LocalURL})
	}
	managedNodes, err := s.reader.ListManaged(ctx, managedSources)
	if err != nil {
		return nil, err
	}
	byTag := make(map[string]subscriptioncache.Source, len(sources)+len(managedNodes))
	for _, source := range sources {
		byTag[source.Tag] = source
	}
	for _, source := range managedNodes {
		byTag[source.Tag] = source
	}
	result := make([]subscriptioncache.Source, 0, len(byTag))
	for _, source := range byTag {
		result = append(result, source)
	}
	sort.Slice(result, func(left, right int) bool { return result[left].Tag < result[right].Tag })
	return result, nil
}

func (s managedSubscriptionDaeService) Validate(ctx context.Context, configPath string) error {
	validator, ok := s.DaeService.(configValidator)
	if !ok {
		return fmt.Errorf("dae 服务不支持配置校验")
	}
	return validator.Validate(ctx, configPath)
}

func (s managedSubscriptionDaeService) Reload(ctx context.Context) error {
	if err := s.managed.Refresh(ctx); err != nil {
		return fmt.Errorf("刷新面板托管订阅: %w", err)
	}
	return s.DaeService.Reload(ctx)
}

func registerManagedSubscriptionRoutes(router *http.ServeMux, service ManagedSubscriptionService) {
	if service == nil {
		unavailable := func(writer http.ResponseWriter, _ *http.Request) {
			writeAPIError(writer, http.StatusServiceUnavailable, "managed_subscriptions_unavailable", "面板托管订阅服务尚未初始化")
		}
		router.HandleFunc("GET /api/v1/subscriptions/managed", unavailable)
		router.HandleFunc("POST /api/v1/subscriptions/managed/prepare", unavailable)
		return
	}
	router.HandleFunc("GET /api/v1/subscriptions/managed", func(writer http.ResponseWriter, request *http.Request) {
		items, err := service.List(request.Context())
		if err != nil {
			writeAPIError(writer, http.StatusInternalServerError, "managed_subscriptions_read_failed", err.Error())
			return
		}
		writeJSON(writer, http.StatusOK, map[string]any{"subscriptions": items})
	})
	router.HandleFunc("POST /api/v1/subscriptions/managed/prepare", func(writer http.ResponseWriter, request *http.Request) {
		var definition managedsubscription.Definition
		if !decodeJSONBody(writer, request, &definition) {
			return
		}
		item, err := service.Prepare(request.Context(), definition)
		if err != nil {
			writeAPIError(writer, http.StatusBadGateway, "managed_subscription_prepare_failed", err.Error())
			return
		}
		writeJSON(writer, http.StatusOK, item)
	})
}
