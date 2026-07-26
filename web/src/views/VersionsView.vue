<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NDataTable,
  NIcon,
  NPopconfirm,
  NRadioButton,
  NRadioGroup,
  NSpace,
  NTag,
  NText,
  NTooltip,
  useDialog,
  useMessage,
  type DataTableColumns,
} from 'naive-ui'
import {
  CloudDownloadOutline,
  RefreshOutline,
  ReturnUpBackOutline,
} from '@vicons/ionicons5'
import { APIError, getJSON, postJSON } from '../api/client'
import type {
  GeoStatus,
  InstallJob,
  InstallProvision,
  InstallStatus,
  UpstreamSource,
  UpstreamVersion,
} from '../types/api'
import { formatBytes, formatDateTime } from '../utils/format'

const message = useMessage()
const dialog = useDialog()
const loading = ref(true)
const listing = ref(false)
// loading 只在首屏为真，之后再也不会回到 true，因此它挡不住刷新按钮被连点。
const refreshing = ref(false)
const disabled = ref(false)
const status = ref<InstallStatus | null>(null)
const provision = ref<InstallProvision | null>(null)
const job = ref<InstallJob | null>(null)
const versions = ref<UpstreamVersion[]>([])
const source = ref<UpstreamSource>('official')
const loadError = ref('')
const listError = ref('')

// geo 数据是独立开关（KDAE_PANEL_ENABLE_GEO_UPDATE），因此状态与 dae 版本管理
// 分开维护：只开其中一个的部署是正常情况，不是异常。
const geoStatus = ref<GeoStatus | null>(null)
const geoJob = ref<InstallJob | null>(null)
const geoDisabled = ref(false)
const geoError = ref('')
const geoBusy = computed(() => geoJob.value?.phase === 'downloading' || geoJob.value?.phase === 'applying')

let poller = 0
let geoPoller = 0
let unmounted = false

// 两个来源的"版本"含义不同，必须分开呈现，不能排进同一个序列。
const SOURCES: { value: UpstreamSource; label: string; hint: string }[] = [
  {
    value: 'official',
    label: '官方 dae',
    hint: '来自 daeuniverse/dae 的正式发布，可安装任意历史版本，校验和取自发布附带的 .dgst 文件。',
  },
  {
    value: 'kdae',
    label: 'kdae 分支',
    hint: 'olicesx/dae 的 kdae 分支没有正式发布，这里列出的是每一次成功的 CI 构建。'
      + '构建产物保留 90 天，过期后无法安装；校验和取自 GitHub Actions 接口。',
  },
]

const activeSource = computed(() => SOURCES.find((item) => item.value === source.value)!)

function sourceName(value?: UpstreamSource): string {
  return SOURCES.find((item) => item.value === value)?.label || '未知来源'
}

const busy = computed(() => job.value?.phase === 'downloading' || job.value?.phase === 'applying')
const installedRef = computed(() => status.value?.managed?.ref || '')

async function loadStatus() {
  try {
    const payload = await getJSON<{ status: InstallStatus; job: InstallJob; provision?: InstallProvision }>(
      '/api/v1/dae/install',
    )
    status.value = payload.status
    job.value = payload.job
    // 安装进行中后端会略去 provision（探测有副作用，不宜每两秒做一次）。
    // 此时沿用上一次的结果，避免界面在"首次安装"与"当前安装"之间来回跳。
    if (payload.provision) {
      provision.value = payload.provision
    } else if (payload.status.ready) {
      provision.value = null
    }
    loadError.value = ''
    disabled.value = false
  } catch (error) {
    if (error instanceof APIError && error.code === 'dae_install_disabled') {
      disabled.value = true
      loadError.value = error.message
    } else {
      loadError.value = error instanceof Error ? error.message : '读取安装状态失败'
    }
  } finally {
    loading.value = false
  }
}

// 只认最后一次发出的请求。用序号而不是比对来源：连点刷新会发出多个同来源的
// 请求，它们全都满足"来源没变"，于是先回来的那个仍会被后回来的旧结果盖掉。
let versionRequest = 0

async function loadVersions() {
  if (disabled.value) return
  const requested = source.value
  const ticket = ++versionRequest
  listing.value = true
  try {
    const payload = await getJSON<{ versions: UpstreamVersion[] }>(
      `/api/v1/dae/versions?source=${requested}&limit=30`,
    )
    if (ticket !== versionRequest || unmounted) return
    versions.value = payload.versions
    listError.value = ''
  } catch (error) {
    if (ticket !== versionRequest || unmounted) return
    versions.value = []
    listError.value = error instanceof Error ? error.message : '读取版本列表失败'
  } finally {
    if (ticket === versionRequest) listing.value = false
  }
}

function changeSource(next: UpstreamSource) {
  if (next === source.value) return
  source.value = next
  versions.value = []
  // 上一个来源的失败与新来源无关，留着它会挂在新来源的空列表上方
  listError.value = ''
  void loadVersions()
}

async function refreshAll() {
  refreshing.value = true
  try {
    await loadStatus()
    if (unmounted) return
    await loadVersions()
  } finally {
    refreshing.value = false
  }
}

// 首次安装与升级是两件不同的事，确认框必须分别说清楚会发生什么。
const firstInstall = computed(() => provision.value?.possible === true)

async function confirmInstall(version: UpstreamVersion) {
  // 空闲时页面不轮询，firstInstall 可能是打开页面那一刻的快照——期间别人
  // 装好了 dae，确认框就会承诺写单元和 geo，而后端实际走的是替换升级。
  // 确认框描述的必须是后端此刻真正会做的事，所以先把状态取新。
  await loadStatus()
  if (unmounted) return
  if (firstInstall.value) {
    dialog.warning({
      title: `安装 ${version.label}`,
      content: `面板会下载并校验该版本，然后安装可执行文件到 ${provision.value?.binaryPath}、`
        + `写入 geo 数据与服务单元 ${provision.value?.unitPath}。`
        + '装完不会自动启动 dae——请先在配置管理页写好规则，再手动启动，'
        + '否则透明代理可能切断你当前的连接。',
      positiveText: '下载并安装',
      negativeText: '取消',
      onPositiveClick: () => install(version),
    })
    return
  }
  dialog.warning({
    title: `安装 ${version.label}`,
    content: '面板会下载并校验该版本，用它验证当前配置，然后替换二进制并重启 dae。'
      + '重启会中断现有连接；若新版本起不来，会自动回滚到当前版本。',
    positiveText: '下载并安装',
    negativeText: '取消',
    onPositiveClick: () => install(version),
  })
}

async function install(version: UpstreamVersion) {
  try {
    const payload = await postJSON<{ job: InstallJob }>('/api/v1/dae/install', {
      source: version.source,
      ref: version.ref,
      label: version.label,
    })
    job.value = payload.job
    message.info('已开始安装，可以留在本页查看进度')
    startPolling()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动安装失败')
    // 409 说明后端已有任务在跑，界面必须同步过去而不是继续显示空闲
    if (error instanceof APIError && error.status === 409) {
      await loadStatus()
      if (busy.value) startPolling()
    }
  }
}

function confirmRollback() {
  dialog.warning({
    title: '回滚到上一版本',
    content: '面板会把安装前备份的二进制换回去并重启 dae。',
    positiveText: '回滚',
    negativeText: '取消',
    onPositiveClick: rollback,
  })
}

async function rollback() {
  try {
    const payload = await postJSON<{ job: InstallJob }>('/api/v1/dae/rollback')
    job.value = payload.job
    message.info('已开始回滚')
    startPolling()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动回滚失败')
    if (error instanceof APIError && error.status === 409) {
      await loadStatus()
      if (busy.value) startPolling()
    }
  }
}

// 安装耗时以分钟计，进度靠轮询而不是把请求挂着。
// 三处必须防住：组件已卸载后才触发、上一次请求还没回来就发下一次、
// 以及乱序响应把已结束的任务复活。
function startPolling() {
  stopPolling()
  if (unmounted) return
  let inFlight = false
  poller = window.setInterval(async () => {
    if (inFlight) return
    inFlight = true
    try {
      const previous = job.value?.phase
      await loadStatus()
      if (unmounted) {
        stopPolling()
        return
      }
      const phase = job.value?.phase
      if (phase !== 'downloading' && phase !== 'applying') {
        stopPolling()
        if (previous && previous !== phase) {
          if (phase === 'done') message.success('已完成')
          else if (phase === 'failed') message.error(job.value?.error || '安装失败')
        }
      }
    } finally {
      inFlight = false
    }
  }, 2000)
}

function stopPolling() {
  if (poller) {
    window.clearInterval(poller)
    poller = 0
  }
}

async function loadGeo() {
  try {
    const payload = await getJSON<{ status: GeoStatus; job: InstallJob }>('/api/v1/dae/geo')
    if (unmounted) return
    geoStatus.value = payload.status
    geoJob.value = payload.job
    geoError.value = ''
    geoDisabled.value = false
  } catch (error) {
    if (unmounted) return
    if (error instanceof APIError && error.code === 'geo_update_disabled') {
      geoDisabled.value = true
      geoError.value = error.message
      return
    }
    geoError.value = error instanceof Error ? error.message : '读取 geo 数据状态失败'
  }
}

function confirmUpdateGeo() {
  const repository = geoStatus.value?.repository || '上游'
  dialog.warning({
    title: '更新 geo 数据',
    // 两件事必须说清楚：换的是哪一套规则集，以及 reload 对连接的实际影响。
    content: `面板会从 ${repository} 下载 geoip.dat 与 geosite.dat，逐个比对 sha256，`
      + `写入 ${geoStatus.value?.targetDir}，然后执行 dae reload 让它生效。`
      + '这套规则集与 dae 发布包自带的不是同一套（后者来自 v2fly），'
      + `geosite: 开头的路由规则所匹配的域名集合会随之改变。`
      + 'reload 不会中断新连接，但进行中的长连接（大文件下载、SSH、串流）最多约 10 秒后可能被断开；'
      + '若 dae 不接受新数据，面板会自动还原成原来的 geo 并重新加载。',
    positiveText: '下载并更新',
    negativeText: '取消',
    onPositiveClick: updateGeo,
  })
}

async function updateGeo() {
  try {
    const payload = await postJSON<{ job: InstallJob }>('/api/v1/dae/geo')
    geoJob.value = payload.job
    message.info('已开始更新 geo 数据')
    startGeoPolling()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动 geo 更新失败')
    if (error instanceof APIError && error.status === 409) {
      await loadGeo()
      if (geoBusy.value) startGeoPolling()
    }
  }
}

function startGeoPolling() {
  stopGeoPolling()
  if (unmounted) return
  let inFlight = false
  geoPoller = window.setInterval(async () => {
    if (inFlight) return
    inFlight = true
    try {
      const previous = geoJob.value?.phase
      await loadGeo()
      if (unmounted) {
        stopGeoPolling()
        return
      }
      const phase = geoJob.value?.phase
      if (phase !== 'downloading' && phase !== 'applying') {
        stopGeoPolling()
        if (previous && previous !== phase) {
          if (phase === 'done') message.success('geo 数据已更新并生效')
          else if (phase === 'failed') message.error(geoJob.value?.error || 'geo 更新失败')
        }
      }
    } finally {
      inFlight = false
    }
  }, 2000)
}

function stopGeoPolling() {
  if (geoPoller) {
    window.clearInterval(geoPoller)
    geoPoller = 0
  }
}

const columns = computed<DataTableColumns<UpstreamVersion>>(() => [
  {
    title: '版本',
    key: 'label',
    width: 170,
    render: (row) => h(NSpace, { size: 4, align: 'center', wrap: false }, {
      default: () => [
        h('span', { class: 'mono version-label' }, row.label),
        row.ref === installedRef.value
          ? h(NTag, { size: 'tiny', type: 'success', bordered: false }, { default: () => '当前' })
          : null,
        row.prerelease
          ? h(NTag, { size: 'tiny', type: 'warning', bordered: false }, { default: () => '预发布' })
          : null,
      ].filter(Boolean),
    }),
  },
  {
    title: source.value === 'kdae' ? '提交说明' : '发布名称',
    key: 'description',
    minWidth: 220,
    ellipsis: { tooltip: true },
    render: (row) => row.description || h(NText, { depth: 3 }, { default: () => '—' }),
  },
  {
    title: source.value === 'kdae' ? '构建时间' : '发布时间',
    key: 'publishedAt',
    width: 200,
    render: (row) => {
      const published = formatDateTime(row.publishedAt)
      if (!row.expiresAt || !row.installable) return published
      // 临近过期的 CI 构建要看得出来，否则它和新构建长得一模一样
      const days = Math.ceil((new Date(row.expiresAt).getTime() - Date.now()) / 86400000)
      if (!Number.isFinite(days) || days > 14) return published
      // 后端按 CreatedAt+90 天推算过期，GitHub 的实际保留期可能更短，
      // 于是会出现 installable 仍为真但已过期的行——别渲染成"-3 天后过期"。
      return h(NSpace, { size: 4, align: 'center', wrap: false }, {
        default: () => [
          published,
          h(NTag, { size: 'tiny', type: days > 0 ? 'warning' : 'error', bordered: false }, {
            default: () => days > 0 ? `${days} 天后过期` : '可能已过期',
          }),
        ],
      })
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 110,
    fixed: 'right',
    render: (row) => {
      if (!row.installable) {
        return h(NTooltip, null, {
          trigger: () => h(NTag, { size: 'small', type: 'error', bordered: false }, { default: () => '已过期' }),
          default: () => row.note || '该版本无法安装',
        })
      }
      // 磁盘被外部替换过时，"已安装"这条也要能重装回来修复漂移
      if (row.ref === installedRef.value && !status.value?.drifted) {
        return h(NText, { depth: 3 }, { default: () => '已安装' })
      }
      return h(NButton, {
        size: 'small',
        secondary: true,
        type: 'primary',
        disabled: busy.value || !(status.value?.ready || firstInstall.value),
        onClick: () => void confirmInstall(row),
      }, {
        icon: () => h(NIcon, null, { default: () => h(CloudDownloadOutline) }),
        default: () => firstInstall.value ? '安装' : '切换',
      })
    },
  },
])

onMounted(async () => {
  await loadStatus()
  if (unmounted) return
  await loadVersions()
  if (unmounted) return
  // 任务可能在本页打开之前就已在跑，这时也要接上轮询
  if (busy.value) startPolling()
  await loadGeo()
  if (!unmounted && geoBusy.value) startGeoPolling()
})
onBeforeUnmount(() => {
  unmounted = true
  stopPolling()
  stopGeoPolling()
})
</script>

<template>
  <div class="page-stack">
    <div class="page-toolbar">
      <div>
        <h2>dae 版本</h2>
        <NText depth="3">在官方发布与 kdae 构建之间切换，安装前校验、失败自动回滚</NText>
      </div>
      <NSpace>
        <NButton
          secondary
          :loading="listing || loading || refreshing"
          :disabled="disabled || refreshing"
          @click="refreshAll"
        >
          <template #icon><NIcon><RefreshOutline /></NIcon></template>刷新
        </NButton>
        <NButton
          v-if="status?.rollbackAvailable"
          :disabled="busy || !status?.ready"
          @click="confirmRollback"
        >
          <template #icon><NIcon><ReturnUpBackOutline /></NIcon></template>回滚上一版
        </NButton>
      </NSpace>
    </div>

    <NAlert v-if="disabled" type="info" :bordered="false">
      {{ loadError }}
    </NAlert>
    <NAlert v-else-if="loadError" type="error" :bordered="false">{{ loadError }}</NAlert>

    <template v-if="!disabled">
      <NAlert v-if="job?.phase === 'downloading'" type="info" :bordered="false">
        正在下载并校验 {{ job.label || job.ref }}…
      </NAlert>
      <NAlert v-else-if="job?.phase === 'applying'" type="warning" :bordered="false">
        正在替换二进制并重启 dae，期间连接会短暂中断…
      </NAlert>
      <NAlert v-else-if="job?.phase === 'failed'" type="error" :bordered="false">
        上次操作失败：{{ job.error }}
      </NAlert>

      <NCard :title="firstInstall ? '尚未安装 dae' : '当前安装'" class="panel-card">
        <template v-if="provision && !status?.ready">
          <NAlert v-if="provision.possible" type="info" :bordered="false" class="card-alert">
            这台机器上还没有 dae。在下面选一个版本即可完成首次安装：面板会安装
            <code class="mono">{{ provision.binaryPath }}</code>、写入 geo 数据与服务单元
            <code class="mono">{{ provision.unitPath }}</code>。
          </NAlert>
          <NAlert v-else type="error" :bordered="false" class="card-alert">
            <div v-for="blocker in provision.blockers || []" :key="blocker">{{ blocker }}</div>
          </NAlert>
          <ul v-if="provision.possible" class="provision-notes">
            <li v-for="note in provision.notes || []" :key="note">{{ note }}</li>
          </ul>
        </template>
        <!-- 独立成一条，不接在 provision 的 v-else-if 后面：ready 为假时后端
             几乎总会带上 provision，挂成 else 分支等于让真正的故障原因永远不显示 -->
        <NAlert v-if="status?.problem" type="warning" :bordered="false" class="card-alert">
          {{ status.problem }}
        </NAlert>
        <NAlert
          v-for="warning in status?.warnings || []"
          :key="warning"
          type="warning"
          :bordered="false"
          class="card-alert"
        >
          {{ warning }}
        </NAlert>
        <dl v-if="!firstInstall" class="details-list">
          <div>
            <dt>运行版本</dt>
            <dd>
              <template v-if="loading">
                <NText depth="3">读取中…</NText>
              </template>
              <template v-else>
                {{ status?.version || '—' }}
                <NTag v-if="status?.serviceActive" size="tiny" type="success" :bordered="false">运行中</NTag>
                <NTag v-else size="tiny" type="error" :bordered="false">未运行</NTag>
              </template>
            </dd>
          </div>
          <div>
            <dt>可执行文件</dt>
            <dd class="mono">{{ status?.binaryPath || '—' }}</dd>
          </div>
          <div>
            <dt>面板记录</dt>
            <dd>
              <!-- 判据是"有没有记录"，不是"记录里有没有 label"：
                   回滚到面板之外装的版本时账本就没有 label，据此说"不是面板装的"是错的 -->
              <template v-if="status?.managed">
                {{ sourceName(status.managed.source) }}
                <template v-if="status.managed.label"> · {{ status.managed.label }}</template>
                <template v-else-if="status.managed.ref"> · {{ status.managed.ref }}</template>
                <NText depth="3">（{{ formatDateTime(status.managed.installedAt) }} 安装）</NText>
              </template>
              <NText v-else depth="3">该二进制不是由面板安装的</NText>
            </dd>
          </div>
          <div>
            <dt>CPU 架构</dt>
            <dd class="mono">{{ status?.platform || '—' }}</dd>
          </div>
        </dl>
        <NAlert v-if="status?.drifted" type="warning" :bordered="false">
          磁盘上的二进制与面板记录不一致，说明它在面板之外被替换过。
        </NAlert>
      </NCard>

      <NCard class="panel-card" content-style="padding: 0;">
        <template #header>
          <NRadioGroup :value="source" size="small" @update:value="changeSource">
            <NRadioButton v-for="item in SOURCES" :key="item.value" :value="item.value">
              {{ item.label }}
            </NRadioButton>
          </NRadioGroup>
        </template>
        <div class="source-hint">
          <NText depth="3">{{ activeSource.hint }}</NText>
        </div>
        <NAlert v-if="listError" type="error" :bordered="false" class="source-hint">{{ listError }}</NAlert>
        <NDataTable
          :columns="columns"
          :data="versions"
          :loading="listing"
          :row-key="(row: UpstreamVersion) => row.ref"
          :scroll-x="720"
          :bordered="false"
          size="small"
        >
          <template #empty>
            <div class="orchestrate-empty">
              <NText depth="3">没有可用版本</NText>
            </div>
          </template>
        </NDataTable>
      </NCard>
    </template>

    <!-- geo 数据是独立开关，因此不放在 dae 版本管理的 v-if 里：
         只开其中一个的部署是正常情况 -->
    <NCard v-if="!geoDisabled" title="geo 数据" class="panel-card">
      <template #header-extra>
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
          <dt>数据来源</dt>
          <dd>
            <span class="mono">{{ geoStatus.repository }}</span>
            <NText v-if="geoStatus.managed" depth="3">
              （面板上次更新到 {{ geoStatus.managed.tag }}，{{ formatDateTime(geoStatus.managed.updatedAt) }}）
            </NText>
            <NText v-else depth="3">（面板尚未更新过）</NText>
          </dd>
        </div>
      </dl>
      <NText depth="3" class="geo-hint">
        更新只需 dae reload，不必重启：新连接不受影响，进行中的长连接最多约 10 秒后可能被断开。
        这套规则集与 dae 发布包自带的（来自 v2fly）不是同一套，切换后 <code class="mono">geosite:</code>
        规则匹配的域名集合会改变。
      </NText>
    </NCard>
  </div>
</template>
