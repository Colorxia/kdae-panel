package app

import (
	"context"
	"log/slog"
	"net/http"
	"sync"
	"time"

	"github.com/tuoro/kdae-panel/internal/geodata"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

// GeoService 是 geo 数据维护能力的消费者侧接口。
type GeoService interface {
	Status(ctx context.Context) geodata.Status
	Download(ctx context.Context, source upstream.GeoSource) (upstream.GeoData, error)
	Apply(ctx context.Context, data upstream.GeoData) (geodata.Status, error)
}

type geoRequest struct {
	Source string `json:"source"`
}

// geoUpdateTimeout 覆盖下载与落盘的总时长。
// geo 有几十兆，而这条路径常常正走在被 dae 接管的链路上，给得比接口超时宽裕。
const geoUpdateTimeout = 10 * time.Minute

func registerGeoRoutes(router *http.ServeMux, service GeoService, operations *sync.Mutex, logger *slog.Logger) {
	if service == nil {
		// 功能默认关闭。它和 dae 版本管理是两个开关：更新 geo 只写一个数据目录，
		// 不碰可执行文件也不碰 systemd 单元，不该逼用户为了刷新 geo 而放宽
		// 二进制目录的写权限。
		unavailable := func(writer http.ResponseWriter, _ *http.Request) {
			writeAPIError(writer, http.StatusServiceUnavailable, "geo_update_disabled",
				"geo 数据更新未启用，请设置 KDAE_PANEL_ENABLE_GEO_UPDATE=true")
		}
		for _, pattern := range []string{"GET /api/v1/dae/geo", "POST /api/v1/dae/geo"} {
			router.HandleFunc(pattern, unavailable)
		}
		return
	}

	jobs := &installJobs{job: Job{Phase: PhaseIdle}}

	router.HandleFunc("GET /api/v1/dae/geo", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]any{
			"status": service.Status(request.Context()),
			"job":    jobs.snapshot(),
		})
	})

	router.HandleFunc("POST /api/v1/dae/geo", func(writer http.ResponseWriter, request *http.Request) {
		// 来源可省略，此时沿用状态里给出的默认值（上次用过的那个）。
		payload := geoRequest{}
		if !decodeOptionalJSONBody(writer, request, &payload) {
			return
		}
		source := service.Status(request.Context()).DefaultSource
		if payload.Source != "" {
			parsed, err := upstream.ParseGeoSource(payload.Source)
			if err != nil {
				writeAPIError(writer, http.StatusBadRequest, "invalid_geo_source", err.Error())
				return
			}
			source = parsed
		}
		if !jobs.begin(PhaseDownloading, string(source), "", "geo 数据") {
			writeAPIError(writer, http.StatusConflict, "geo_update_in_progress", "已有 geo 更新任务正在执行")
			return
		}
		go runGeoUpdate(jobs, service, operations, logger, source)
		writeJSON(writer, http.StatusAccepted, map[string]any{"job": jobs.snapshot()})
	})
}

func runGeoUpdate(jobs *installJobs, service GeoService, operations *sync.Mutex, logger *slog.Logger,
	source upstream.GeoSource) {
	ctx, cancel := context.WithTimeout(context.Background(), geoUpdateTimeout)
	defer cancel()

	// 下载与校验不触碰任何共享状态，因此不占控制锁：
	// 二十多兆的下载不该把配置保存和订阅定时刷新一起堵住。
	data, err := service.Download(ctx, source)
	if err != nil {
		logger.Warn("下载 geo 数据失败", "error", err)
		jobs.finish(err)
		return
	}

	jobs.advance(PhaseApplying)
	operations.Lock()
	defer operations.Unlock()
	if _, err := service.Apply(ctx, data); err != nil {
		logger.Warn("更新 geo 数据失败", "error", err)
		jobs.finish(err)
		return
	}
	jobs.finish(nil)
}
