import { getCurrentInstance, onBeforeUnmount } from 'vue'

interface JobPollingOptions {
  /** 拉一次最新状态。结果由调用方写进自己的 ref，这里只负责节奏。 */
  refresh: () => Promise<void>
  /** 读取当前任务阶段；undefined 表示还没有任务。 */
  phase: () => string | undefined
  /** 任务离开进行中状态、且阶段确实变化了时回调一次。 */
  onSettled: (phase: string | undefined) => void
  intervalMs?: number
}

/**
 * 后台任务（安装 dae、更新 geo）耗时以分钟计，进度靠轮询而不是把请求挂着。
 * 三处必须防住：组件已卸载后才触发、上一次请求还没回来就发下一次、
 * 以及乱序响应把已结束的任务复活。这些防护在每个轮询点都一模一样，
 * 所以收拢在这里。
 */
export function useJobPolling(options: JobPollingOptions) {
  const intervalMs = options.intervalMs ?? 2000
  let timer: ReturnType<typeof setInterval> | undefined
  let disposed = false

  function stop() {
    if (timer !== undefined) {
      clearInterval(timer)
      timer = undefined
    }
  }

  function start() {
    stop()
    if (disposed) return
    let inFlight = false
    timer = setInterval(async () => {
      if (inFlight) return
      inFlight = true
      try {
        const previous = options.phase()
        await options.refresh()
        if (disposed) {
          stop()
          return
        }
        const phase = options.phase()
        if (phase !== 'downloading' && phase !== 'applying') {
          stop()
          if (previous && previous !== phase) options.onSettled(phase)
        }
      } finally {
        inFlight = false
      }
    }, intervalMs)
  }

  function dispose() {
    disposed = true
    stop()
  }

  // 测试在组件之外调用本 composable，此时没有实例可挂生命周期，
  // 由测试自己调 dispose()。
  if (getCurrentInstance()) onBeforeUnmount(dispose)

  return { start, stop, dispose }
}
