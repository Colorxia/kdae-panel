<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { RouterLink, onBeforeRouteLeave } from 'vue-router'
import {
  NAlert,
  NButton,
  NCard,
  NDataTable,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NInputGroup,
  NInputNumber,
  NModal,
  NPopconfirm,
  NSelect,
  NSpace,
  NSpin,
  NTag,
  NText,
  NTooltip,
  useDialog,
  useMessage,
  type DataTableColumns,
} from 'naive-ui'
import {
  AddOutline,
  ArrowForwardOutline,
  CheckmarkCircleOutline,
  CloudUploadOutline,
  CreateOutline,
  DownloadOutline,
  FlashOutline,
  PricetagOutline,
  RefreshOutline,
  SaveOutline,
  TrashOutline,
} from '@vicons/ionicons5'
import { APIError, getJSON, postJSON, putJSON } from '../api/client'
import type { ConfigDocument, ConfigSaveResult, LatencyResult, LatencyTarget } from '../types/api'
import {
  addGroup,
  appendToSection,
  findSection,
  isQuotable,
  isValidTag,
  parseGroups,
  parseRoutingRules,
  parseSection,
  quote,
  removeGroup,
  removeLine,
  replaceLine,
  setGroupFilter,
  setGroupPolicy,
  type Entry,
  type Group,
  type SectionContents,
} from '../utils/daeconf'
import { parseNodeLink, type NodeLinkInfo } from '../utils/nodelink'

interface NodeRow {
  entry: Entry
  info: NodeLinkInfo | null
}

const message = useMessage()
const dialog = useDialog()
const loading = ref(true)
const validating = ref(false)
const saving = ref(false)
const probing = ref(false)
const document = ref<ConfigDocument | null>(null)
const content = ref('')
const originalContent = ref('')
const validationMessage = ref('')
const validationError = ref('')
const latency = ref(new Map<string, LatencyResult>())

const dirty = computed(() => content.value !== originalContent.value)

// ---- 全部结构化视图都由本地缓冲 content 派生 ----
function readSection(name: string): SectionContents {
  const section = findSection(content.value, name)
  return section ? parseSection(content.value, section) : { entries: [], unparsedLines: 0 }
}

const nodeSection = computed(() => readSection('node'))
const subscriptionSection = computed(() => readSection('subscription'))
const nodes = computed<NodeRow[]>(() =>
  nodeSection.value.entries.map((entry) => ({ entry, info: parseNodeLink(entry.value) })),
)
const subscriptions = computed<Entry[]>(() => subscriptionSection.value.entries)
const unparsedLines = computed(() => nodeSection.value.unparsedLines + subscriptionSection.value.unparsedLines)
const groups = computed<Group[]>(() => parseGroups(content.value))
const routingRules = computed(() => parseRoutingRules(content.value))
const groupNames = computed(() => new Set(groups.value.map((group) => group.name)))

const POLICY_OPTIONS = [
  { label: 'min_moving_avg · 移动平均延迟最小', value: 'min_moving_avg' },
  { label: 'min_avg10 · 最近 10 次平均延迟最小', value: 'min_avg10' },
  { label: 'min · 最近一次延迟最小', value: 'min' },
  { label: 'random · 每次连接随机', value: 'random' },
  { label: 'fixed(n) · 固定第 n 个节点', value: 'fixed' },
]

function parsePolicy(value?: string): { name: string; index: number } {
  const fixed = /^fixed\((\d+)\)$/.exec(value || '')
  if (fixed) return { name: 'fixed', index: Number(fixed[1]) }
  return { name: value || 'min_moving_avg', index: 0 }
}

function policyOptionsFor(group: Group) {
  const current = parsePolicy(group.policy?.value).name
  if (POLICY_OPTIONS.some((option) => option.value === current)) return POLICY_OPTIONS
  return [...POLICY_OPTIONS, { label: current, value: current }]
}

// ---- 文档加载与保存(与配置管理页相同的事务语义) ----
async function load() {
  loading.value = true
  validationMessage.value = ''
  validationError.value = ''
  try {
    const loaded = await getJSON<ConfigDocument>('/api/v1/config')
    document.value = loaded
    content.value = loaded.content
    originalContent.value = loaded.content
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      document.value = null
      content.value = ''
      originalContent.value = ''
    } else {
      message.error(error instanceof Error ? error.message : '读取配置失败')
    }
  } finally {
    loading.value = false
  }
}

async function validate() {
  validating.value = true
  validationMessage.value = ''
  validationError.value = ''
  try {
    await postJSON('/api/v1/config/validate', { content: content.value })
    validationMessage.value = '当前编排结果已通过安装版本的 dae 校验'
    message.success('配置校验通过')
  } catch (error) {
    validationError.value = error instanceof Error ? error.message : '配置校验失败'
  } finally {
    validating.value = false
  }
}

async function save(apply: boolean) {
  saving.value = true
  validationMessage.value = ''
  validationError.value = ''
  // 提交的是点击那一刻的快照。请求在途时用户可能继续编排，
  // 因此成功后只把快照记为已保存，dirty 会如实保留其后的新改动。
  const submitted = content.value
  try {
    const result = await putJSON<ConfigSaveResult>('/api/v1/config', {
      content: submitted,
      expectedHash: document.value?.hash || '',
      apply,
    })
    originalContent.value = submitted
    document.value = {
      path: document.value?.path || '/etc/dae/config.dae',
      content: submitted,
      hash: result.hash,
      size: new Blob([submitted]).size,
      mode: document.value?.mode || '-rw-------',
      modifiedAt: result.savedAt,
    }
    validationMessage.value = apply ? '编排结果已保存并完成无损重载' : '编排结果已保存，尚未应用到运行进程'
    message.success(validationMessage.value)
  } catch (error) {
    if (error instanceof APIError && error.status === 409) {
      dialog.warning({
        title: '配置已经变化',
        content: '磁盘配置在你编排期间被其他操作修改。请重新读取后再编排，避免覆盖。',
        positiveText: '重新读取',
        negativeText: '保留当前编排',
        onPositiveClick: () => load(),
      })
    } else {
      validationError.value = error instanceof Error ? error.message : '保存配置失败'
      if (error instanceof APIError && error.code === 'configuration_apply_failed') {
        await load()
      }
    }
  } finally {
    saving.value = false
  }
}

function confirmReload() {
  dialog.success({
    title: '保存并无损重载',
    content: '面板将先调用 dae validate，校验通过后备份旧配置、原子替换并执行 dae reload。订阅链接也会随重载重新拉取。',
    positiveText: '保存并重载',
    negativeText: '取消',
    onPositiveClick: () => save(true),
  })
}

// ---- 节点 ----
const importVisible = ref(false)
const importText = ref('')

function importNodes() {
  const links = importText.value.split('\n').map((line) => line.trim()).filter((line) => line !== '')
  if (links.length === 0) {
    message.warning('请粘贴至少一个分享链接')
    return
  }
  const invalid = links.filter((link) => !/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(link))
  if (invalid.length > 0) {
    message.error(`有 ${invalid.length} 行不是有效的分享链接: ${invalid[0].slice(0, 40)}…`)
    return
  }
  const unrepresentable = links.filter((link) => !isQuotable(link))
  if (unrepresentable.length > 0) {
    message.error('链接同时包含单引号和双引号，dae 配置无法无损表示，请先修正链接')
    return
  }
  content.value = appendToSection(content.value, 'node', links.map((link) => quote(link)))
  importVisible.value = false
  importText.value = ''
  message.success(`已加入 ${links.length} 个节点，保存并重载后生效`)
}

function removeNode(row: NodeRow) {
  content.value = removeLine(content.value, row.entry.lineStart, row.entry.lineEnd)
}

const tagTarget = ref<Entry | null>(null)
const tagValue = ref('')

function openTagEditor(entry: Entry) {
  tagTarget.value = entry
  tagValue.value = entry.tag || ''
}

function applyTag() {
  const entry = tagTarget.value
  if (!entry || !entry.editable) return
  const tag = tagValue.value.trim()
  if (tag !== '' && !isValidTag(tag)) {
    message.error('标签只能使用字母、数字、下划线、点或横线，且以字母或下划线开头')
    return
  }
  if (!isQuotable(entry.value)) {
    message.error('该链接同时包含单引号和双引号，无法安全改写，请在配置管理页编辑原文')
    return
  }
  const line = tag === '' ? quote(entry.value) : `${tag}: ${quote(entry.value)}`
  content.value = replaceLine(content.value, entry.lineStart, entry.lineEnd, line)
  tagTarget.value = null
}

// ---- 节点延迟(面板主机 TCP 直连握手,非 dae 内部健康检查) ----
function latencyKey(info: NodeLinkInfo): string {
  return `${info.host}:${info.port}`
}

/** 与后端 netprobe.Target.validate 一致，避免把明显非法的目标发出去。 */
function probeTarget(info: NodeLinkInfo | null): LatencyTarget | null {
  const host = info?.host
  const port = info?.port
  if (!host || host !== host.trim() || host.length > 253 || /[\s/\\]/.test(host)) return null
  if (typeof port !== 'number' || !Number.isInteger(port) || port < 1 || port > 65535) return null
  return { host, port }
}

async function probeLatency() {
  const targets = new Map<string, LatencyTarget>()
  for (const row of nodes.value) {
    const target = probeTarget(row.info)
    if (target) targets.set(`${target.host}:${target.port}`, target)
  }
  if (targets.size === 0) {
    message.warning('没有可探测的节点(需要能解析出服务器与端口)')
    return
  }
  probing.value = true
  const batch = [...targets.values()]
  const merged = new Map(latency.value)
  try {
    for (let start = 0; start < batch.length; start += 64) {
      const { results } = await postJSON<{ results: LatencyResult[] }>('/api/v1/net/latency', {
        targets: batch.slice(start, start + 64),
      })
      for (const result of results) merged.set(`${result.host}:${result.port}`, result)
      // 逐批发布，某一批失败时前面的结果仍然可见
      latency.value = new Map(merged)
    }
  } catch (error) {
    message.error(error instanceof Error ? error.message : '延迟探测失败')
  } finally {
    probing.value = false
  }
}

function latencyCell(row: NodeRow) {
  if (!row.info || !probeTarget(row.info)) return h(NText, { depth: 3 }, { default: () => '—' })
  const result = latency.value.get(latencyKey(row.info))
  if (!result) return h(NText, { depth: 3 }, { default: () => '未测' })
  if (!result.reachable) {
    return h(NTooltip, null, {
      trigger: () => h(NTag, { size: 'small', type: 'error', bordered: false }, { default: () => '不可达' }),
      default: () => result.error || '连接失败',
    })
  }
  const value = result.latencyMs || 0
  const type = value < 100 ? 'success' : value < 300 ? 'warning' : 'error'
  return h(NTag, { size: 'small', type, bordered: false }, { default: () => `${value.toFixed(value < 10 ? 1 : 0)} ms` })
}

const nodeColumns: DataTableColumns<NodeRow> = [
  {
    title: '名称',
    key: 'name',
    minWidth: 160,
    ellipsis: { tooltip: true },
    render: (row) => row.entry.tag || row.info?.name || h(NText, { depth: 3 }, { default: () => '未命名' }),
  },
  {
    title: '标签',
    key: 'tag',
    width: 130,
    ellipsis: { tooltip: true },
    render: (row) => row.entry.tag
      ? h(NTag, { size: 'small', bordered: false }, { default: () => row.entry.tag })
      : h(NText, { depth: 3 }, { default: () => '—' }),
  },
  {
    title: '协议',
    key: 'protocol',
    width: 110,
    render: (row) => h(NTag, { size: 'small', type: 'info', bordered: false }, { default: () => row.info?.protocol || '未知' }),
  },
  {
    title: '服务器',
    key: 'host',
    minWidth: 180,
    ellipsis: { tooltip: true },
    render: (row) => h('span', { class: 'mono' }, row.info?.host || '—'),
  },
  {
    title: '端口',
    key: 'port',
    width: 90,
    render: (row) => row.info?.port ?? '—',
  },
  {
    title: () => h(NTooltip, null, {
      trigger: () => h('span', { class: 'column-hint' }, '直连延迟'),
      default: () => '面板主机到该服务器的 TCP 握手耗时，域名目标包含解析时间。这不是 dae 的健康检查结果，也不是 dae 选路所用的延迟；dae 开启 wan_interface 时会劫持本机流量，此时该连接同样由 dae 按路由规则转发。',
    }),
    key: 'latency',
    width: 110,
    render: latencyCell,
  },
  {
    title: '操作',
    key: 'actions',
    width: 130,
    fixed: 'right',
    render: (row) => entryActions(row.entry, [
      { title: '打标签', icon: PricetagOutline, onClick: () => openTagEditor(row.entry) },
      { title: '移除', icon: TrashOutline, type: 'error', onClick: () => removeNode(row) },
    ]),
  },
]

interface EntryAction {
  title: string
  icon: typeof TrashOutline
  type?: 'error'
  onClick: () => void
}

/** 跨行条目无法按行安全改写,把操作禁用并说明原因。 */
function entryActions(entry: Entry, actions: EntryAction[]) {
  const buttons = actions.map((action) => h(NButton, {
    size: 'tiny',
    quaternary: true,
    type: action.type,
    title: action.title,
    disabled: !entry.editable,
    onClick: action.onClick,
  }, { icon: () => h(NIcon, null, { default: () => h(action.icon) }) }))
  const row = h(NSpace, { size: 'small', wrap: false }, { default: () => buttons })
  if (entry.editable) return row
  return h(NTooltip, null, {
    trigger: () => h('span', null, [row]),
    default: () => '该条目跨行书写，无法安全地按行改写，请在配置管理页编辑原文。',
  })
}

// ---- 订阅 ----
const subscriptionTag = ref('')
const subscriptionURL = ref('')

function addSubscription() {
  const tag = subscriptionTag.value.trim()
  const url = subscriptionURL.value.trim()
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url) || !isQuotable(url)) {
    message.error('请输入完整的订阅链接，且不能同时包含单引号和双引号')
    return
  }
  if (tag !== '' && !isValidTag(tag)) {
    message.error('订阅标签只能使用字母、数字、下划线、点或横线，且以字母或下划线开头')
    return
  }
  const line = tag === '' ? quote(url) : `${tag}: ${quote(url)}`
  content.value = appendToSection(content.value, 'subscription', [line])
  subscriptionTag.value = ''
  subscriptionURL.value = ''
}

const subscriptionColumns: DataTableColumns<Entry> = [
  {
    title: '标签',
    key: 'tag',
    width: 120,
    ellipsis: { tooltip: true },
    render: (row) => row.tag
      ? h(NTag, { size: 'small', bordered: false }, { default: () => row.tag })
      : h(NText, { depth: 3 }, { default: () => '—' }),
  },
  {
    title: '订阅链接',
    key: 'value',
    minWidth: 220,
    ellipsis: { tooltip: true },
    render: (row) => h('span', { class: 'mono' }, row.value),
  },
  {
    title: '操作',
    key: 'actions',
    width: 70,
    render: (row) => entryActions(row, [
      {
        title: '移除',
        icon: TrashOutline,
        type: 'error',
        onClick: () => { content.value = removeLine(content.value, row.lineStart, row.lineEnd) },
      },
    ]),
  },
]

// ---- 分组 ----
const newGroupName = ref('')
const newGroupPolicy = ref('min_moving_avg')

function createGroup() {
  const name = newGroupName.value.trim()
  if (!isValidTag(name)) {
    message.error('分组名只能使用字母、数字、下划线、点或横线，且以字母或下划线开头')
    return
  }
  if (groupNames.value.has(name)) {
    message.error(`分组 ${name} 已存在`)
    return
  }
  content.value = addGroup(content.value, name, newGroupPolicy.value === 'fixed' ? 'fixed(0)' : newGroupPolicy.value)
  newGroupName.value = ''
}

function changePolicy(group: Group, name: string) {
  const serialized = name === 'fixed' ? `fixed(${parsePolicy(group.policy?.value).index})` : name
  content.value = setGroupPolicy(content.value, group, serialized)
}

function changeFixedIndex(group: Group, index: number | null) {
  content.value = setGroupPolicy(content.value, group, `fixed(${index ?? 0})`)
}

// 按位置而非名称回溯分组：dae 不保证分组名唯一，重名时按名查找会改错分组。
const filterTarget = ref<{ groupIndex: number; index: number } | null>(null)
const filterValue = ref('')

function openFilterEditor(groupIndex: number, index: number) {
  filterTarget.value = { groupIndex, index }
  filterValue.value = groups.value[groupIndex]?.filters[index]?.value || ''
}

function applyFilter() {
  const target = filterTarget.value
  if (!target) return
  const group = groups.value[target.groupIndex]
  if (!group) return
  content.value = setGroupFilter(content.value, group, target.index, filterValue.value.trim())
  filterTarget.value = null
}

// ---- 生命周期 ----
onBeforeRouteLeave(() => {
  if (!dirty.value) return true
  return window.confirm('当前编排尚未保存，确认离开？')
})

onMounted(() => void load())
</script>

<template>
  <div class="page-stack orchestrate-page">
    <div class="page-toolbar">
      <div>
        <h2>节点、订阅与分组</h2>
        <NText depth="3">对配置做结构化编排，注释与未涉及的节保持原样，保存时整体经 dae 校验</NText>
      </div>
      <NSpace>
        <NButton secondary :disabled="loading" @click="load">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>重新读取
        </NButton>
        <NButton :loading="validating" :disabled="loading" @click="validate">
          <template #icon><NIcon><CheckmarkCircleOutline /></NIcon></template>校验
        </NButton>
        <NButton :loading="saving" :disabled="loading || !dirty" @click="save(false)">
          <template #icon><NIcon><SaveOutline /></NIcon></template>仅保存
        </NButton>
        <NButton type="primary" :loading="saving" :disabled="loading || !dirty" @click="confirmReload">
          <template #icon><NIcon><CloudUploadOutline /></NIcon></template>保存并重载
        </NButton>
      </NSpace>
    </div>

    <NAlert v-if="validationMessage" type="success" closable @close="validationMessage = ''">{{ validationMessage }}</NAlert>
    <NAlert v-if="validationError" type="error" closable @close="validationError = ''"><pre class="error-detail">{{ validationError }}</pre></NAlert>
    <NAlert v-if="!loading && !document && !dirty" type="info" :bordered="false">
      入口配置尚不存在。在这里导入节点或添加订阅即可从零生成，保存时会自动创建配置文件。
    </NAlert>
    <NAlert v-if="dirty" type="warning" :bordered="false">
      有未保存的编排修改，保存并重载后才会应用到 dae。
    </NAlert>
    <NAlert v-if="unparsedLines > 0" type="info" :bordered="false">
      节点与订阅中有 {{ unparsedLines }} 行采用了跨行或多条目写法，未在下方列出。
      它们仍然生效，请在配置管理页查看和编辑原文。
    </NAlert>

    <NSpin :show="loading">
      <div class="page-stack">
        <NCard title="节点" class="panel-card" content-style="padding: 0;">
          <template #header-extra>
            <NSpace size="small">
              <NTag size="small" :bordered="false">{{ nodes.length }} 个</NTag>
              <NButton size="small" secondary :loading="probing" :disabled="nodes.length === 0" @click="probeLatency">
                <template #icon><NIcon><FlashOutline /></NIcon></template>测试直连延迟
              </NButton>
              <NButton size="small" type="primary" @click="importVisible = true">
                <template #icon><NIcon><DownloadOutline /></NIcon></template>导入节点
              </NButton>
            </NSpace>
          </template>
          <NDataTable
            :columns="nodeColumns"
            :data="nodes"
            :row-key="(row: NodeRow) => row.entry.lineStart"
            :scroll-x="960"
            :bordered="false"
            size="small"
          >
            <template #empty>
              <div class="orchestrate-empty">
                <NText depth="3">还没有手工节点。粘贴分享链接导入，或使用订阅。</NText>
              </div>
            </template>
          </NDataTable>
        </NCard>

        <NGrid responsive="screen" cols="1 l:2" :x-gap="16" :y-gap="16">
          <NGridItem>
            <NCard title="订阅" class="panel-card" content-style="padding: 0;">
              <template #header-extra>
                <NTag size="small" :bordered="false">{{ subscriptions.length }} 个</NTag>
              </template>
              <NDataTable
                :columns="subscriptionColumns"
                :data="subscriptions"
                :row-key="(row: Entry) => row.lineStart"
                :bordered="false"
                size="small"
              >
                <template #empty>
                  <div class="orchestrate-empty">
                    <NText depth="3">还没有订阅。订阅内容由 dae 在重载时拉取。</NText>
                  </div>
                </template>
              </NDataTable>
              <div class="orchestrate-add">
                <NInputGroup>
                  <NInput v-model:value="subscriptionTag" placeholder="标签(可选)" class="orchestrate-tag-input" />
                  <NInput v-model:value="subscriptionURL" placeholder="https://example.com/subscription" />
                  <NButton type="primary" ghost @click="addSubscription">
                    <template #icon><NIcon><AddOutline /></NIcon></template>添加
                  </NButton>
                </NInputGroup>
              </div>
            </NCard>
          </NGridItem>

          <NGridItem>
            <NCard title="分组" class="panel-card">
              <template #header-extra>
                <NTag size="small" :bordered="false">{{ groups.length }} 个</NTag>
              </template>
              <div v-if="groups.length === 0" class="orchestrate-empty">
                <NText depth="3">还没有分组。分组是路由规则的出站目标，按策略从命中的节点中选择。</NText>
              </div>
              <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="group-item">
                <div class="group-head">
                  <code>{{ group.name }}</code>
                  <NPopconfirm positive-text="删除" negative-text="取消" @positive-click="content = removeGroup(content, group)">
                    <template #trigger>
                      <NButton size="tiny" quaternary type="error" title="删除分组">
                        <template #icon><NIcon><TrashOutline /></NIcon></template>
                      </NButton>
                    </template>
                    删除分组后，引用它的路由规则会校验失败，确认删除？
                  </NPopconfirm>
                </div>
                <div class="group-row">
                  <NText depth="3">策略</NText>
                  <NSelect
                    size="small"
                    :value="parsePolicy(group.policy?.value).name"
                    :options="policyOptionsFor(group)"
                    :disabled="group.policy !== null && !group.policy.editable"
                    @update:value="(value: string) => changePolicy(group, value)"
                  />
                  <NInputNumber
                    v-if="parsePolicy(group.policy?.value).name === 'fixed'"
                    size="small"
                    class="group-fixed-index"
                    :min="0"
                    :value="parsePolicy(group.policy?.value).index"
                    @update:value="(value: number | null) => changeFixedIndex(group, value)"
                  />
                </div>
                <div class="group-row filters">
                  <NText depth="3">过滤</NText>
                  <NSpace size="small" wrap>
                    <NTooltip v-for="(filter, index) in group.filters" :key="index" :disabled="filter.editable">
                      <template #trigger>
                        <NTag
                          size="small"
                          class="filter-tag mono"
                          :class="{ locked: !filter.editable }"
                          :closable="filter.editable"
                          @close="content = setGroupFilter(content, group, index, '')"
                        >
                          <span class="filter-value" @click="filter.editable && openFilterEditor(groupIndex, index)">{{ filter.value }}</span>
                        </NTag>
                      </template>
                      该条件跨行或结构复杂，为避免改坏配置，请在配置管理页编辑原文。
                    </NTooltip>
                    <NButton size="tiny" dashed @click="openFilterEditor(groupIndex, group.filters.length)">
                      <template #icon><NIcon><AddOutline /></NIcon></template>
                      {{ group.filters.length === 0 ? '全部节点，添加过滤' : '添加' }}
                    </NButton>
                  </NSpace>
                </div>
              </div>
              <div class="orchestrate-add borderless">
                <NInputGroup>
                  <NInput v-model:value="newGroupName" placeholder="新分组名，如 proxy" @keyup.enter="createGroup" />
                  <NSelect v-model:value="newGroupPolicy" :options="POLICY_OPTIONS" class="group-policy-select" />
                  <NButton type="primary" ghost @click="createGroup">
                    <template #icon><NIcon><AddOutline /></NIcon></template>新建
                  </NButton>
                </NInputGroup>
              </div>
            </NCard>
          </NGridItem>
        </NGrid>

        <NCard title="路由规则" class="panel-card">
          <template #header-extra>
            <NSpace size="small" align="center">
              <NTag size="small" :bordered="false">{{ routingRules.length }} 条</NTag>
              <RouterLink :to="{ name: 'config' }" custom>
                <template #default="{ navigate }">
                  <NButton size="small" quaternary @click="navigate">
                    <template #icon><NIcon><CreateOutline /></NIcon></template>编辑原文
                  </NButton>
                </template>
              </RouterLink>
            </NSpace>
          </template>
          <div v-if="routingRules.length === 0" class="orchestrate-empty">
            <NText depth="3">配置中还没有 routing 节。路由规则自上而下匹配，决定流量走哪个分组。</NText>
          </div>
          <ol v-else class="routing-list">
            <li v-for="(rule, index) in routingRules" :key="index" class="routing-rule" :class="{ fallback: rule.isFallback }">
              <code class="routing-match">{{ rule.isFallback ? 'fallback（以上都未命中）' : rule.match }}</code>
              <NIcon class="routing-arrow"><ArrowForwardOutline /></NIcon>
              <NTag
                size="small"
                :type="rule.outbound === 'direct' ? 'success' : rule.outbound === 'block' ? 'error' : groupNames.has(rule.outbound) ? 'info' : 'default'"
                :bordered="false"
              >
                {{ rule.outbound }}
              </NTag>
            </li>
          </ol>
        </NCard>
      </div>
    </NSpin>

    <NModal v-model:show="importVisible" preset="card" title="导入节点" class="orchestrate-modal">
      <NText depth="3">
        每行一个分享链接，支持 vmess / vless / ss / ssr / trojan / tuic / juicity / hysteria2 / anytls / socks5 / http(s)。
        节点名称取自链接自身，导入后可单独打标签。
      </NText>
      <NInput
        v-model:value="importText"
        type="textarea"
        class="mono"
        :rows="8"
        placeholder="vmess://…&#10;vless://…&#10;hysteria2://…"
        spellcheck="false"
      />
      <template #footer>
        <NSpace justify="end">
          <NButton @click="importVisible = false">取消</NButton>
          <NButton type="primary" @click="importNodes">加入编排</NButton>
        </NSpace>
      </template>
    </NModal>

    <NModal :show="tagTarget !== null" preset="card" title="节点标签" class="orchestrate-modal" @update:show="tagTarget = null">
      <NText depth="3">标签用于在分组过滤中稳定引用节点，留空则恢复为匿名条目。</NText>
      <NInput v-model:value="tagValue" placeholder="如 hk_01" spellcheck="false" @keyup.enter="applyTag" />
      <template #footer>
        <NSpace justify="end">
          <NButton @click="tagTarget = null">取消</NButton>
          <NButton type="primary" @click="applyTag">确定</NButton>
        </NSpace>
      </template>
    </NModal>

    <NModal :show="filterTarget !== null" preset="card" title="分组过滤条件" class="orchestrate-modal" @update:show="filterTarget = null">
      <NText depth="3">
        过滤函数可用 <code>&amp;&amp;</code> 连接、<code>!</code> 取反：<code>name(keyword: HK)</code>、
        <code>name(regex: '^US')</code>、<code>subtag(my_sub)</code>。多条过滤之间是“或”关系。
      </NText>
      <NInput
        v-model:value="filterValue"
        class="mono"
        placeholder="subtag(my_sub) && !name(keyword: '到期')"
        spellcheck="false"
        @keyup.enter="applyFilter()"
      />
      <template #footer>
        <NSpace justify="end">
          <NButton @click="filterTarget = null">取消</NButton>
          <NButton type="primary" @click="applyFilter()">确定</NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>
