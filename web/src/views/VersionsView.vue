<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NDataTable,
  NIcon,
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
  InstallJob,
  InstallProvision,
  InstallStatus,
  UpstreamSource,
  UpstreamVersion,
} from '../types/api'
import { formatDateTime } from '../utils/format'
import { useJobPolling } from '../composables/useJobPolling'
import { SOURCES } from '../components/versions/sources'
import InstallStatusCard from '../components/versions/InstallStatusCard.vue'
import GeoCard from '../components/versions/GeoCard.vue'

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

let unmounted = false

const installPolling = useJobPolling({
  refresh: () => loadStatus(),
  phase: () => job.value?.phase,
  onSettled: (phase) => {
    if (phase === 'done') message.success('已完成')
    else if (phase === 'failed') message.error(job.value?.error || '安装失败')
  },
})

const activeSource = computed(() => SOURCES.find((item) => item.value === source.value)!)
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
    installPolling.start()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动安装失败')
    // 409 说明后端已有任务在跑，界面必须同步过去而不是继续显示空闲
    if (error instanceof APIError && error.status === 409) {
      await loadStatus()
      if (busy.value) installPolling.start()
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
    installPolling.start()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动回滚失败')
    if (error instanceof APIError && error.status === 409) {
      await loadStatus()
      if (busy.value) installPolling.start()
    }
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
  if (busy.value) installPolling.start()
})
// 轮询的卸载清理由 useJobPolling 自己挂钩，这里只管本组件的加载链
onBeforeUnmount(() => {
  unmounted = true
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

      <InstallStatusCard :loading="loading" :status="status" :provision="provision" />

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
    <GeoCard />
  </div>
</template>
