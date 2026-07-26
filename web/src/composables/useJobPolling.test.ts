import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useJobPolling } from './useJobPolling'

describe('useJobPolling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('进行中持续轮询，任务结束时回调一次并停止', async () => {
    // 阶段只随 refresh 变化，模拟"状态来自服务端应答"
    let server: string | undefined = 'downloading'
    let phase: string | undefined = 'downloading'
    const refresh = vi.fn(async () => { phase = server })
    const onSettled = vi.fn()
    const polling = useJobPolling({ refresh, phase: () => phase, onSettled, intervalMs: 100 })

    polling.start()
    await vi.advanceTimersByTimeAsync(250)
    expect(refresh).toHaveBeenCalledTimes(2)
    expect(onSettled).not.toHaveBeenCalled()

    server = 'done'
    await vi.advanceTimersByTimeAsync(100)
    expect(onSettled).toHaveBeenCalledExactlyOnceWith('done')

    // 已停止：再过多久都不会再拉
    const calls = refresh.mock.calls.length
    await vi.advanceTimersByTimeAsync(1000)
    expect(refresh).toHaveBeenCalledTimes(calls)
  })

  it('阶段没有变化时不回调（避免把陈旧状态当成刚完成）', async () => {
    const refresh = vi.fn(async () => {})
    const onSettled = vi.fn()
    const polling = useJobPolling({ refresh, phase: () => 'done', onSettled, intervalMs: 100 })

    polling.start()
    await vi.advanceTimersByTimeAsync(100)
    expect(onSettled).not.toHaveBeenCalled()
    // 第一轮就发现任务并非进行中，应当立即停止
    await vi.advanceTimersByTimeAsync(500)
    expect(refresh).toHaveBeenCalledTimes(1)
  })

  it('上一次请求未返回时不发下一次', async () => {
    let release: () => void = () => {}
    const refresh = vi.fn(
      () => new Promise<void>((resolve) => { release = resolve }),
    )
    const polling = useJobPolling({
      refresh,
      phase: () => 'downloading',
      onSettled: () => {},
      intervalMs: 100,
    })

    polling.start()
    await vi.advanceTimersByTimeAsync(350)
    expect(refresh).toHaveBeenCalledTimes(1)

    release()
    await vi.advanceTimersByTimeAsync(100)
    expect(refresh).toHaveBeenCalledTimes(2)
    polling.dispose()
  })

  it('dispose 后 start 不再生效，进行中的轮询也会停下', async () => {
    let phase = 'downloading'
    const refresh = vi.fn(async () => {})
    const polling = useJobPolling({ refresh, phase: () => phase, onSettled: () => {}, intervalMs: 100 })

    polling.start()
    await vi.advanceTimersByTimeAsync(100)
    expect(refresh).toHaveBeenCalledTimes(1)

    polling.dispose()
    await vi.advanceTimersByTimeAsync(500)
    expect(refresh).toHaveBeenCalledTimes(1)

    polling.start()
    await vi.advanceTimersByTimeAsync(500)
    expect(refresh).toHaveBeenCalledTimes(1)
  })
})
