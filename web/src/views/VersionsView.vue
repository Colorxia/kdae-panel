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
import type { InstallJob, InstallStatus, UpstreamSource, UpstreamVersion } from '../types/api'
import { formatDateTime } from '../utils/format'

const message = useMessage()
const dialog = useDialog()
const loading = ref(true)
const listing = ref(false)
const disabled = ref(false)
const status = ref<InstallStatus | null>(null)
const job = ref<InstallJob | null>(null)
const versions = ref<UpstreamVersion[]>([])
const source = ref<UpstreamSource>('official')
const loadError = ref('')
const listError = ref('')

let poller = 0
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
    const payload = await getJSON<{ status: InstallStatus; job: InstallJob }>('/api/v1/dae/install')
    status.value = payload.status
    job.value = payload.job
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

async function loadVersions() {
  if (disabled.value) return
  // 快速切换来源时，只认最后一次请求的结果，避免列表与所选来源不符
  const requested = source.value
  listing.value = true
  try {
    const payload = await getJSON<{ versions: UpstreamVersion[] }>(
      `/api/v1/dae/versions?source=${requested}&limit=30`,
    )
    if (requested !== source.value || unmounted) return
    versions.value = payload.versions
    listError.value = ''
  } catch (error) {
    if (requested !== source.value || unmounted) return
    versions.value = []
    listError.value = error instanceof Error ? error.message : '读取版本列表失败'
  } finally {
    if (requested === source.value) listing.value = false
  }
}

function changeSource(next: UpstreamSource) {
  if (next === source.value) return
  source.value = next
  versions.value = []
  void loadVersions()
}

async function refreshAll() {
  await loadStatus()
  await loadVersions()
}

function confirmInstall(version: UpstreamVersion) {
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
      return h(NSpace, { size: 4, align: 'center', wrap: false }, {
        default: () => [
          published,
          h(NTag, { size: 'tiny', type: 'warning', bordered: false }, { default: () => `${days} 天后过期` }),
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
        disabled: busy.value || !status.value?.ready,
        onClick: () => confirmInstall(row),
      }, {
        icon: () => h(NIcon, null, { default: () => h(CloudDownloadOutline) }),
        default: () => '安装',
      })
    },
  },
])

onMounted(async () => {
  await loadStatus()
  if (unmounted) return
  await loadVersions()
  // 任务可能在本页打开之前就已在跑，这时也要接上轮询
  if (busy.value) startPolling()
})
onBeforeUnmount(() => {
  unmounted = true
  stopPolling()
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
        <NButton secondary :loading="listing || loading" :disabled="disabled" @click="refreshAll">
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

      <NCard title="当前安装" class="panel-card">
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
        <dl class="details-list">
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
              <template v-if="status?.managed?.label">
                {{ sourceName(status.managed.source) }} · {{ status.managed.label }}
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
  </div>
</template>
