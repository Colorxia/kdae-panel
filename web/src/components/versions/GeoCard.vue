<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NModal,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NSpace,
  NSwitch,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui'
import { CloudDownloadOutline, TimerOutline } from '@vicons/ionicons5'
import { APIError, getJSON, postJSON, putJSON } from '../../api/client'
import type { GeoSource, GeoStatus, InstallJob, ScheduleStatus } from '../../types/api'
import { formatBytes, formatDateTime } from '../../utils/format'
import { useJobPolling } from '../../composables/useJobPolling'

// geo 数据是独立开关（KDAE_PANEL_ENABLE_GEO_UPDATE），因此这张卡片完全
// 自治：自己加载状态、自己轮询任务、自己管理定时设置，与 dae 版本管理
// 只开其中一个的部署是正常情况，不是异常。
const message = useMessage()
const dialog = useDialog()

const geoStatus = ref<GeoStatus | null>(null)
const geoJob = ref<InstallJob | null>(null)
const geoDisabled = ref(false)
const geoError = ref('')
const geoSource = ref<GeoSource | null>(null)
const geoBusy = computed(() => geoJob.value?.phase === 'downloading' || geoJob.value?.phase === 'applying')
const activeGeoSource = computed(
  () => geoStatus.value?.sources.find((item) => item.source === geoSource.value) || null,
)

const geoPolling = useJobPolling({
  refresh: () => loadGeo(),
  phase: () => geoJob.value?.phase,
  onSettled: (phase) => {
    if (phase === 'done') message.success('geo 数据已更新并生效')
    else if (phase === 'failed') message.error(geoJob.value?.error || 'geo 更新失败')
  },
})

async function loadGeo() {
  try {
    const payload = await getJSON<{ status: GeoStatus; job: InstallJob }>('/api/v1/dae/geo')
    geoStatus.value = payload.status
    geoJob.value = payload.job
    // 只在首次加载时采用后端的预选值。此后以用户的选择为准——轮询期间把它
    // 重置回去，会让人刚点开 v2fly 就被弹回 Loyalsoldier。
    if (geoSource.value === null) geoSource.value = payload.status.defaultSource
    geoError.value = ''
    geoDisabled.value = false
  } catch (error) {
    if (error instanceof APIError && error.code === 'geo_update_disabled') {
      geoDisabled.value = true
      geoError.value = error.message
      return
    }
    geoError.value = error instanceof Error ? error.message : '读取 geo 数据状态失败'
  }
}

function confirmUpdateGeo() {
  const chosen = activeGeoSource.value
  const repositories = chosen?.repositories.join('、') || '上游'
  // 换来源才是需要重点提醒的：它会改变 geosite: 规则的含义。
  // 沿用同一个来源只是把数据往前推，把警告一并甩出去反而稀释了真正的风险。
  const previous = geoStatus.value?.managed?.source
  const switching = previous !== undefined && previous !== geoSource.value
  dialog.warning({
    title: `更新 geo 数据（${chosen?.label || geoSource.value}）`,
    content: `面板会从 ${repositories} 下载 geoip.dat 与 geosite.dat，逐个比对 sha256，`
      + `写入 ${geoStatus.value?.targetDir}，然后执行 dae reload 让它生效。`
      + (switching
        ? '⚠ 这次会切换到另一套规则集：geosite: 开头的路由规则所匹配的域名集合会随之改变，'
          + '而 dae 不会因此报错。请确认你的路由规则在新规则集下仍然成立。'
        : '')
      + 'reload 不会中断新连接，但进行中的长连接（大文件下载、SSH、串流）最多约 10 秒后可能被断开；'
      + '若 dae 不接受新数据，面板会自动还原成原来的 geo 并重新加载。',
    positiveText: '下载并更新',
    negativeText: '取消',
    onPositiveClick: updateGeo,
  })
}

async function updateGeo() {
  try {
    const payload = await postJSON<{ job: InstallJob }>('/api/v1/dae/geo', { source: geoSource.value })
    geoJob.value = payload.job
    message.info('已开始更新 geo 数据')
    geoPolling.start()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动 geo 更新失败')
    if (error instanceof APIError && error.status === 409) {
      await loadGeo()
      if (geoBusy.value) geoPolling.start()
    }
  }
}

// ---- 定时自动更新：实现与订阅自动刷新平行，但节奏以天计 ----
const schedule = ref<ScheduleStatus | null>(null)
const scheduleVisible = ref(false)
const scheduleSaving = ref(false)
const scheduleEnabled = ref(false)
const scheduleInterval = ref(10080)
const scheduleError = ref('')

const GEO_INTERVAL_OPTIONS = [
  { label: '每天', value: 1440 },
  { label: '每 3 天', value: 4320 },
  { label: '每周', value: 10080 },
  { label: '每 2 周', value: 20160 },
  { label: '每 30 天', value: 43200 },
]

async function loadSchedule() {
  try {
    const status = await getJSON<ScheduleStatus>('/api/v1/schedule/geo')
    schedule.value = status
    scheduleEnabled.value = status.enabled
    scheduleInterval.value = status.intervalMinutes
    scheduleError.value = ''
  } catch (error) {
    // 读不到就不允许保存，否则会用表单默认值覆盖服务端的真实设置
    schedule.value = null
    scheduleError.value = error instanceof Error ? error.message : '读取自动更新设置失败'
  }
}

// 每次打开都以服务端状态为准，避免上次取消时留下的编辑残留
async function openSchedule() {
  scheduleVisible.value = true
  await loadSchedule()
}

async function saveSchedule() {
  scheduleSaving.value = true
  try {
    schedule.value = await putJSON<ScheduleStatus>('/api/v1/schedule/geo', {
      enabled: scheduleEnabled.value,
      intervalMinutes: scheduleInterval.value,
    })
    scheduleVisible.value = false
    message.success(scheduleEnabled.value ? '已开启 geo 自动更新' : '已关闭 geo 自动更新')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存自动更新设置失败')
  } finally {
    scheduleSaving.value = false
  }
}

const scheduleSummary = computed(() => {
  const status = schedule.value
  if (!status) return ''
  if (!status.enabled) return '自动更新已关闭'
  const option = GEO_INTERVAL_OPTIONS.find((item) => item.value === status.intervalMinutes)
  return option ? option.label : `每 ${status.intervalMinutes} 分钟`
})

onMounted(async () => {
  await loadGeo()
  if (geoDisabled.value) return
  // 任务可能在本卡片打开之前就已在跑（含定时轮次），这时也要接上轮询
  if (geoBusy.value) geoPolling.start()
  await loadSchedule()
})
</script>

<template>
  <NCard v-if="!geoDisabled" title="geo 数据" class="panel-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <NButton size="small" quaternary :disabled="!geoStatus?.updatable" @click="openSchedule">
          <template #icon><NIcon><TimerOutline /></NIcon></template>
          自动更新
        </NButton>
        <NButton
          size="small"
          secondary
          type="primary"
          :loading="geoBusy"
          :disabled="geoBusy || !geoStatus?.updatable"
          @click="confirmUpdateGeo"
        >
          <template #icon><NIcon><CloudDownloadOutline /></NIcon></template>
          一键更新
        </NButton>
      </NSpace>
    </template>

    <NAlert v-if="geoError" type="error" :bordered="false" class="card-alert">{{ geoError }}</NAlert>
    <NAlert v-if="geoJob?.phase === 'downloading'" type="info" :bordered="false" class="card-alert">
      正在下载并校验 geo 数据…
    </NAlert>
    <NAlert v-else-if="geoJob?.phase === 'applying'" type="warning" :bordered="false" class="card-alert">
      正在写入并重新加载 dae…
    </NAlert>
    <NAlert v-else-if="geoJob?.phase === 'failed'" type="error" :bordered="false" class="card-alert">
      上次更新失败：{{ geoJob.error }}
    </NAlert>
    <NAlert v-if="geoStatus?.problem" type="warning" :bordered="false" class="card-alert">
      {{ geoStatus.problem }}
    </NAlert>
    <NAlert
      v-for="warning in geoStatus?.warnings || []"
      :key="warning"
      type="warning"
      :bordered="false"
      class="card-alert"
    >
      {{ warning }}
    </NAlert>

    <dl v-if="geoStatus" class="details-list">
      <div v-for="file in geoStatus.files" :key="file.name">
        <dt>{{ file.name }}</dt>
        <dd>
          <template v-if="file.present">
            {{ formatBytes(file.size) }}
            <NText depth="3">（{{ formatDateTime(file.modTime) }}）</NText>
            <div class="mono geo-path">{{ file.path }}</div>
          </template>
          <NText v-else depth="3">未安装</NText>
        </dd>
      </div>
      <div>
        <dt>面板记录</dt>
        <dd>
          <template v-if="geoStatus.managed">
            {{ geoStatus.sources.find((item) => item.source === geoStatus!.managed!.source)?.label
              || geoStatus.managed.source }}
            · <span class="mono">{{ geoStatus.managed.tag }}</span>
            <NText depth="3">（{{ formatDateTime(geoStatus.managed.updatedAt) }} 更新）</NText>
          </template>
          <NText v-else depth="3">面板尚未更新过 geo 数据</NText>
        </dd>
      </div>
      <div v-if="scheduleSummary">
        <dt>自动更新</dt>
        <dd>
          {{ scheduleSummary }}<template v-if="schedule?.enabled && schedule?.nextRunAt">，下次 {{ formatDateTime(schedule.nextRunAt) }}</template>
          <NText v-if="schedule?.lastError" depth="3">（上轮：{{ schedule.lastError }}）</NText>
        </dd>
      </div>
    </dl>

    <div v-if="geoStatus" class="geo-sources">
      <NRadioGroup v-model:value="geoSource" size="small" :disabled="geoBusy">
        <NRadioButton
          v-for="item in geoStatus.sources"
          :key="item.source"
          :value="item.source"
        >
          {{ item.label }}
        </NRadioButton>
      </NRadioGroup>
      <NText v-if="activeGeoSource" depth="3" class="geo-hint">
        <span class="mono">{{ activeGeoSource.repositories.join('、') }}</span> —— {{ activeGeoSource.note }}
      </NText>
    </div>

    <NText depth="3" class="geo-hint">
      更新只需 dae reload，不必重启：新连接不受影响，但进行中的长连接最多约 10 秒后可能被断开。
      两个来源的规则集不是同一套，切换会改变 <code class="mono">geosite:</code>
      规则匹配的域名集合，而 dae 不会因此报错。
    </NText>

    <NModal v-model:show="scheduleVisible" preset="card" title="geo 数据自动更新" class="orchestrate-modal">
      <NText depth="3">
        到点后面板会重新下载校验并只 reload 不重启。来源沿用当前面板记录的那一个，
        绝不会自动切换规则集；若有其他控制操作正在执行，本轮跳过并在几分钟后重试。
      </NText>
      <NAlert v-if="scheduleError" type="error" :bordered="false" class="card-alert schedule-alert">
        {{ scheduleError }}
      </NAlert>
      <div class="schedule-row">
        <NSwitch v-model:value="scheduleEnabled" :disabled="scheduleError !== ''" />
        <NText>{{ scheduleEnabled ? '已开启' : '已关闭' }}</NText>
      </div>
      <NSelect v-model:value="scheduleInterval" :options="GEO_INTERVAL_OPTIONS" :disabled="!scheduleEnabled || scheduleError !== ''" />
      <dl v-if="schedule" class="details-list schedule-details">
        <div>
          <dt>上次执行</dt>
          <dd>{{ schedule.lastRunAt ? formatDateTime(schedule.lastRunAt) : '尚未执行' }}</dd>
        </div>
        <div v-if="schedule.nextRunAt">
          <dt>下次执行</dt>
          <dd>{{ formatDateTime(schedule.nextRunAt) }}</dd>
        </div>
        <div v-if="schedule.lastError">
          <dt>上次结果</dt>
          <dd>{{ schedule.lastError }}</dd>
        </div>
      </dl>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="scheduleVisible = false">取消</NButton>
          <NButton type="primary" :loading="scheduleSaving" :disabled="scheduleError !== ''" @click="saveSchedule">保存</NButton>
        </NSpace>
      </template>
    </NModal>
  </NCard>
</template>
