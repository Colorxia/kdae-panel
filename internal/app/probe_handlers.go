package app

import (
	"context"
	"log/slog"
	"net"
	"net/http"
	"strconv"
	"strings"

	"github.com/tuoro/kdae-panel/internal/netprobe"
)

type ProbeService interface {
	Probe(ctx context.Context, targets []netprobe.Target) ([]netprobe.Result, error)
}

type latencyProbeRequest struct {
	Targets []netprobe.Target `json:"targets"`
}

func registerProbeRoutes(router *http.ServeMux, prober ProbeService, logger *slog.Logger) {
	router.HandleFunc("POST /api/v1/net/latency", func(writer http.ResponseWriter, request *http.Request) {
		if prober == nil {
			writeAPIError(writer, http.StatusServiceUnavailable, "probe_unavailable", "延迟探测服务尚未初始化")
			return
		}
		var payload latencyProbeRequest
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		// 该端点会让面板主动向外建连，因此把目标记入审计日志。
		// 目标本就来自仅 root 可读的 dae 配置，面板日志同样如此，不扩大暴露面。
		logger.Info("节点延迟探测", "count", len(payload.Targets), "targets", describeTargets(payload.Targets))
		results, err := prober.Probe(request.Context(), payload.Targets)
		if err != nil {
			logger.Warn("节点延迟探测被拒绝", "count", len(payload.Targets), "error", err)
			writeAPIError(writer, http.StatusBadRequest, "invalid_probe_request", err.Error())
			return
		}
		writeJSON(writer, http.StatusOK, map[string]any{"results": results})
	})
}

func describeTargets(targets []netprobe.Target) string {
	endpoints := make([]string, len(targets))
	for index, target := range targets {
		endpoints[index] = net.JoinHostPort(target.Host, strconv.Itoa(target.Port))
	}
	return strings.Join(endpoints, " ")
}
