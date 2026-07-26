package app

import (
	"errors"
	"net/http"

	"github.com/tuoro/kdae-panel/internal/schedule"
)

type ScheduleService interface {
	Status() schedule.Status
	Update(settings schedule.Settings) (schedule.Status, error)
}

func registerScheduleRoutes(router *http.ServeMux, service ScheduleService) {
	if service == nil {
		unavailable := func(writer http.ResponseWriter, _ *http.Request) {
			writeAPIError(writer, http.StatusServiceUnavailable, "schedule_unavailable", "定时任务服务尚未初始化")
		}
		router.HandleFunc("GET /api/v1/schedule/reload", unavailable)
		router.HandleFunc("PUT /api/v1/schedule/reload", unavailable)
		return
	}

	router.HandleFunc("GET /api/v1/schedule/reload", func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, service.Status())
	})
	router.HandleFunc("PUT /api/v1/schedule/reload", func(writer http.ResponseWriter, request *http.Request) {
		var payload schedule.Settings
		if !decodeSmallJSONBody(writer, request, &payload) {
			return
		}
		status, err := service.Update(payload)
		if err != nil {
			var invalid *schedule.InvalidSettingsError
			if errors.As(err, &invalid) {
				writeAPIError(writer, http.StatusBadRequest, "invalid_schedule_settings", err.Error())
				return
			}
			writeAPIError(writer, http.StatusInternalServerError, "schedule_save_failed", err.Error())
			return
		}
		writeJSON(writer, http.StatusOK, status)
	})
}
