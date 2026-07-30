<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NInput,
  NInputGroup,
  NInputNumber,
  NModal,
  NPopconfirm,
  NSelect,
  NSpace,
  NSwitch,
  NTag,
  NText,
  NTooltip,
  useMessage,
} from 'naive-ui'
import { AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import {
  addGroup,
  isQuotable,
  isValidTag,
  parseGroups,
  quote,
  readSection,
  removeGroup,
  setGroupFilter,
  setGroupPolicy,
  type Group,
} from '../../utils/daeconf'
import SectionEditorModal from './SectionEditorModal.vue'

const content = defineModel<string>({ required: true })
const message = useMessage()

const groups = computed<Group[]>(() => parseGroups(content.value))
const groupNames = computed(() => new Set(groups.value.map((group) => group.name)))
const sourceVisible = ref(false)

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

type FilterKind = 'subscription' | 'nameKeyword' | 'nameRegex' | 'raw'

interface FilterDraft {
  kind: FilterKind
  value: string
  exclude: boolean
}

const FILTER_KIND_OPTIONS = [
  { label: '订阅标签', value: 'subscription' },
  { label: '节点名称关键词', value: 'nameKeyword' },
  { label: '节点名称正则', value: 'nameRegex' },
  { label: '高级表达式', value: 'raw' },
]

const subscriptionOptions = computed(() => readSection(content.value, 'subscription').entries
  .filter((entry) => entry.tag)
  .map((entry) => ({ label: entry.tag!, value: entry.tag! })))

const groupEditVisible = ref(false)
const groupTarget = ref<{ index: number; snapshot: string } | null>(null)
const groupPolicy = ref('min_moving_avg')
const groupFixedIndex = ref(0)
const groupFilters = ref<FilterDraft[]>([])

function parseFilter(value: string): FilterDraft {
  const trimmed = value.trim()
  const exclude = trimmed.startsWith('!')
  const expression = exclude ? trimmed.slice(1).trim() : trimmed
  const subscription = /^subtag\(([^()]+)\)$/.exec(expression)
  if (subscription) return { kind: 'subscription', value: subscription[1].trim(), exclude }
  const name = /^name\((keyword|regex)\s*:\s*(['"])(.*)\2\)$/.exec(expression)
  if (name) return { kind: name[1] === 'keyword' ? 'nameKeyword' : 'nameRegex', value: name[3], exclude }
  return { kind: 'raw', value: trimmed, exclude: false }
}

function newFilter(): FilterDraft {
  return subscriptionOptions.value.length > 0
    ? { kind: 'subscription', value: subscriptionOptions.value[0].value, exclude: false }
    : { kind: 'nameKeyword', value: '', exclude: false }
}

function openGroupEditor(groupIndex: number, appendFilter = false) {
  const group = groups.value[groupIndex]
  if (!group) return
  if ((group.policy && !group.policy.editable) || group.filters.some((filter) => !filter.editable)) {
    message.warning('该分组含跨行或重复声明，请使用卡片右上角的原文编辑')
    return
  }
  const policy = parsePolicy(group.policy?.value)
  groupTarget.value = {
    index: groupIndex,
    snapshot: content.value.slice(group.section.nameStart, group.section.bodyEnd + 1),
  }
  groupPolicy.value = policy.name
  groupFixedIndex.value = policy.index
  groupFilters.value = group.filters.map((filter) => parseFilter(filter.value))
  if (appendFilter) groupFilters.value.push(newFilter())
  groupEditVisible.value = true
}

function serializeFilter(filter: FilterDraft): string | null {
  const value = filter.value.trim()
  if (value === '') return null
  if (filter.kind === 'raw') return value
  let expression: string
  if (filter.kind === 'subscription') {
    if (!isValidTag(value)) return null
    expression = `subtag(${value})`
  } else {
    if (!isQuotable(value)) return null
    expression = `name(${filter.kind === 'nameKeyword' ? 'keyword' : 'regex'}: ${quote(value)})`
  }
  return filter.exclude ? `!${expression}` : expression
}

function applyGroupEdit() {
  const target = groupTarget.value
  if (!target) return
  const current = groups.value[target.index]
  if (!current || content.value.slice(current.section.nameStart, current.section.bodyEnd + 1) !== target.snapshot) {
    message.error('配置在编辑期间发生了变化，请关闭后重新打开')
    return
  }
  const serialized = groupFilters.value.map(serializeFilter)
  if (serialized.some((value) => value === null)) {
    message.error('过滤条件不能为空；订阅标签必须是有效标识，名称条件不能同时含单双引号')
    return
  }

  let next = content.value
  for (let index = current.filters.length - 1; index >= 0; index -= 1) {
    next = setGroupFilter(next, current, index, serialized[index] || '')
  }
  for (let index = current.filters.length; index < serialized.length; index += 1) {
    const latest = parseGroups(next)[target.index]
    if (!latest) return
    next = setGroupFilter(next, latest, latest.filters.length, serialized[index]!)
  }
  const latest = parseGroups(next)[target.index]
  if (!latest) return
  const policy = groupPolicy.value === 'fixed' ? `fixed(${groupFixedIndex.value})` : groupPolicy.value
  content.value = setGroupPolicy(next, latest, policy)
  groupEditVisible.value = false
  groupTarget.value = null
}
</script>

<template>
  <NCard title="分组" class="panel-card" data-testid="groups-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <NTag size="small" :bordered="false">{{ groups.length }} 个</NTag>
        <NButton size="small" quaternary @click="sourceVisible = true">
          <template #icon><NIcon><CreateOutline /></NIcon></template>编辑原文
        </NButton>
      </NSpace>
    </template>
    <div class="orchestrate-add inset" data-testid="group-add">
      <NInputGroup>
        <NInput v-model:value="newGroupName" placeholder="新分组名，如 proxy" @keyup.enter="createGroup" />
        <NSelect v-model:value="newGroupPolicy" :options="POLICY_OPTIONS" class="group-policy-select" />
        <NButton type="primary" ghost @click="createGroup">
          <template #icon><NIcon><AddOutline /></NIcon></template>新建
        </NButton>
      </NInputGroup>
    </div>
    <div v-if="groups.length === 0" class="orchestrate-empty" data-testid="group-list">
      <NText depth="3">还没有分组。分组是路由规则的出站目标，按策略从命中的节点中选择。</NText>
    </div>
    <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="group-item" data-testid="group-list">
      <div class="group-head">
        <code>{{ group.name }}</code>
        <NSpace size="small">
          <NButton size="tiny" secondary @click="openGroupEditor(groupIndex)">
            <template #icon><NIcon><CreateOutline /></NIcon></template>编辑
          </NButton>
          <NPopconfirm positive-text="删除" negative-text="取消" @positive-click="content = removeGroup(content, group)">
            <template #trigger>
              <NButton size="tiny" quaternary type="error" title="删除分组">
                <template #icon><NIcon><TrashOutline /></NIcon></template>
              </NButton>
            </template>
            删除分组后，引用它的路由规则会校验失败，确认删除？
          </NPopconfirm>
        </NSpace>
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
                <span class="filter-value" @click="filter.editable && openGroupEditor(groupIndex)">{{ filter.value }}</span>
              </NTag>
            </template>
            该条件跨行或结构复杂，请使用卡片右上角的原文编辑。
          </NTooltip>
          <NButton size="tiny" dashed @click="openGroupEditor(groupIndex, true)">
            <template #icon><NIcon><AddOutline /></NIcon></template>
            {{ group.filters.length === 0 ? '全部节点，添加过滤' : '添加' }}
          </NButton>
        </NSpace>
      </div>
    </div>
  </NCard>

  <NModal v-model:show="groupEditVisible" preset="card" title="编辑分组" class="orchestrate-group-modal" :mask-closable="false" data-testid="group-editor-modal">
    <NAlert type="info" :bordered="false">
      多条过滤之间是“或”关系。一个条件需要组合多个函数时请选择“高级表达式”。
    </NAlert>
    <div class="group-editor-policy">
      <NText depth="3">策略</NText>
      <NSelect v-model:value="groupPolicy" :options="POLICY_OPTIONS" />
      <NInputNumber v-if="groupPolicy === 'fixed'" v-model:value="groupFixedIndex" :min="0" />
    </div>
    <div class="group-filter-editor">
      <div class="group-filter-editor-head">
        <strong>过滤条件</strong>
        <NButton size="small" dashed @click="groupFilters.push(newFilter())">
          <template #icon><NIcon><AddOutline /></NIcon></template>添加条件
        </NButton>
      </div>
      <NText v-if="groupFilters.length === 0" depth="3">不设置过滤时，该分组包含全部节点。</NText>
      <div v-for="(filter, index) in groupFilters" :key="index" class="group-filter-editor-row">
        <NSelect v-model:value="filter.kind" :options="FILTER_KIND_OPTIONS" />
        <NSelect
          v-if="filter.kind === 'subscription'"
          v-model:value="filter.value"
          :options="subscriptionOptions"
          filterable
          tag
          placeholder="订阅标签"
        />
        <NInput
          v-else
          v-model:value="filter.value"
          class="mono"
          :placeholder="filter.kind === 'raw' ? 'subtag(my_sub) && !name(keyword: 过期)' : '匹配内容'"
          spellcheck="false"
        />
        <label v-if="filter.kind !== 'raw'" class="filter-exclude">
          <NSwitch v-model:value="filter.exclude" size="small" />
          <span>排除</span>
        </label>
        <span v-else class="filter-exclude-placeholder"></span>
        <NButton quaternary circle type="error" title="删除条件" @click="groupFilters.splice(index, 1)">
          <template #icon><NIcon><TrashOutline /></NIcon></template>
        </NButton>
      </div>
    </div>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="groupEditVisible = false">取消</NButton>
        <NButton type="primary" @click="applyGroupEdit">应用到编排</NButton>
      </NSpace>
    </template>
  </NModal>

  <SectionEditorModal
    v-model:show="sourceVisible"
    v-model:content="content"
    section="group"
    title="编辑分组原文"
    description="这里只替换 group 节内部内容，适合处理跨行条件或分组级高级参数。其他配置保持不变。"
  />
</template>
