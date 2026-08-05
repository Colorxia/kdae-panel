import type { SubscriptionNodeSource } from '../types/api'
import { isQuotable, isValidTag, parseGroups, quote, readSection, setGroupFilter, unquote } from './daeconf'
import { parseNodeLink } from './nodelink'

export type GroupFilterKind = 'nodes' | 'subscriptionNodes' | 'subscriptions' | 'nameKeyword' | 'nameRegex' | 'raw'

export interface GroupFilterDraft {
  kind: GroupFilterKind
  value: string
  values: string[]
  source: string
  exclude: boolean
}

export function createGroupFilter(kind: GroupFilterKind): GroupFilterDraft {
  return { kind, value: '', values: [], source: '', exclude: false }
}

/**
 * 解析 name()/subtag() 中不带命名参数的简单值列表。
 * regex: 等高级写法故意返回 null，交给高级表达式原样处理。
 */
function parseArguments(body: string): string[] | null {
  const values: string[] = []
  let start = 0
  let quoteChar = ''

  const push = (end: number): boolean => {
    const raw = body.slice(start, end).trim()
    if (raw === '') return false
    const first = raw[0]
    if (first === "'" || first === '"') {
      if (raw.length < 2 || raw[raw.length - 1] !== first) return false
      values.push(unquote(raw))
      return true
    }
    // 裸参数只接受 dae 标识符的安全子集；空格、冒号和括号意味着更复杂的表达式。
    if (!/^[A-Za-z_][A-Za-z0-9_.-]*$/.test(raw)) return false
    values.push(raw)
    return true
  }

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index]
    if (quoteChar !== '') {
      if (char === '\\' && body[index + 1] === quoteChar) index += 1
      else if (char === quoteChar) quoteChar = ''
      continue
    }
    if (char === "'" || char === '"') quoteChar = char
    else if (char === ',') {
      if (!push(index)) return null
      start = index + 1
    } else if (char === ':' || char === '(' || char === ')') {
      return null
    }
  }
  if (quoteChar !== '' || !push(body.length)) return null
  return [...new Set(values)]
}

export function parseGroupFilter(value: string): GroupFilterDraft {
  const trimmed = value.trim()
  const exclude = trimmed.startsWith('!')
  const expression = exclude ? trimmed.slice(1).trim() : trimmed

  const subscriptionNodes = /^subtag\((.*?)\)\s*&&\s*name\((.*)\)$/.exec(expression)
  if (subscriptionNodes && !exclude) {
    const sources = parseArguments(subscriptionNodes[1])
    const values = parseArguments(subscriptionNodes[2])
    if (sources?.length === 1 && isValidTag(sources[0]) && values) {
      return { kind: 'subscriptionNodes', value: '', values, source: sources[0], exclude: false }
    }
  }

  const subscription = /^subtag\((.*)\)$/.exec(expression)
  if (subscription) {
    const values = parseArguments(subscription[1])
    if (values && values.every(isValidTag)) {
      return { kind: 'subscriptions', value: '', values, source: '', exclude }
    }
  }

  const nameMatcher = /^name\((keyword|regex)\s*:\s*(['"])(.*)\2\)$/.exec(expression)
  if (nameMatcher) {
    return {
      kind: nameMatcher[1] === 'keyword' ? 'nameKeyword' : 'nameRegex',
      value: nameMatcher[3],
      values: [],
      source: '',
      exclude,
    }
  }

  const nodes = /^name\((.*)\)$/.exec(expression)
  if (nodes) {
    const values = parseArguments(nodes[1])
    if (values) return { kind: 'nodes', value: '', values, source: '', exclude }
  }

  return { kind: 'raw', value: trimmed, values: [], source: '', exclude: false }
}

function uniqueValues(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))]
}

export function serializeGroupFilter(filter: GroupFilterDraft): string | null {
  if (filter.kind === 'raw') return filter.value.trim() || null

  let expression: string
  if (filter.kind === 'nodes') {
    const values = uniqueValues(filter.values)
    if (values.length === 0 || values.some((value) => !isQuotable(value))) return null
    expression = `name(${values.map((value) => isValidTag(value) ? value : quote(value)).join(', ')})`
  } else if (filter.kind === 'subscriptionNodes') {
    const values = uniqueValues(filter.values)
    if (!isValidTag(filter.source) || filter.exclude || values.length === 0
      || values.some((value) => !isQuotable(value))) return null
    expression = `subtag(${filter.source}) && name(${values.map((value) => isValidTag(value) ? value : quote(value)).join(', ')})`
  } else if (filter.kind === 'subscriptions') {
    const values = uniqueValues(filter.values)
    if (values.length === 0 || values.some((value) => !isValidTag(value))) return null
    expression = `subtag(${values.join(', ')})`
  } else {
    const value = filter.value.trim()
    if (value === '' || !isQuotable(value)) return null
    expression = `name(${filter.kind === 'nameKeyword' ? 'keyword' : 'regex'}: ${quote(value)})`
  }
  return filter.exclude ? `!${expression}` : expression
}

export function describeGroupFilter(value: string): string {
  const parsed = parseGroupFilter(value)
  if (parsed.kind === 'nodes') return `${parsed.exclude ? '排除节点' : '节点'}：${parsed.values.join('、')}`
  if (parsed.kind === 'subscriptionNodes') return `订阅 ${parsed.source}：${parsed.values.join('、')}`
  if (parsed.kind === 'subscriptions') return `${parsed.exclude ? '排除订阅' : '订阅'}：${parsed.values.join('、')}`
  return value
}

/** 将新导入的显式节点标签加入指定分组；无过滤分组本来就包含全部节点。 */
export function includeNodesInGroups(text: string, groupNames: string[], nodeTags: string[]): string {
  const selected = new Set(groupNames)
  const tags = uniqueValues(nodeTags).filter(isValidTag)
  if (selected.size === 0 || tags.length === 0) return text

  let next = text
  for (const groupName of selected) {
    const group = parseGroups(next).find((candidate) => candidate.name === groupName)
    if (!group || group.filters.length === 0 || group.filters.some((filter) => !filter.editable)) continue

    const filterIndex = group.filters.findIndex((filter) => {
      const parsed = parseGroupFilter(filter.value)
      return filter.editable && parsed.kind === 'nodes' && !parsed.exclude
    })
    if (filterIndex >= 0) {
      const parsed = parseGroupFilter(group.filters[filterIndex].value)
      parsed.values = uniqueValues([...parsed.values, ...tags])
      next = setGroupFilter(next, group, filterIndex, serializeGroupFilter(parsed)!)
      continue
    }
    next = setGroupFilter(next, group, group.filters.length, `name(${tags.join(', ')})`)
  }
  return next
}

/**
 * 只在候选数量可由当前配置精确得出时返回数字；整份订阅、关键词和高级表达式均返回 null。
 * fixed(n) 的 n 是从 0 开始的索引。
 */
export function knownFixedCandidateCount(
  filters: GroupFilterDraft[],
  unfilteredNodeCount: number,
  hasSubscriptions: boolean,
): number | null {
  if (filters.length === 0) return hasSubscriptions ? null : unfilteredNodeCount
  if (filters.some((filter) => !['nodes', 'subscriptionNodes'].includes(filter.kind) || filter.exclude)) return null
  const candidates = new Set<string>()
  for (const filter of filters) {
    for (const value of filter.values.map((item) => item.trim()).filter(Boolean)) {
      candidates.add(filter.kind === 'nodes' ? `node:${value}` : `subscription:${filter.source}:${value}`)
    }
  }
  return candidates.size
}

export interface FixedCandidate {
  name: string
  protocol: string
  host: string
  port: number | null
}

export type FixedCandidateResult =
  | { resolvable: true; nodes: FixedCandidate[] }
  | { resolvable: false; reason: string }

function fixedUnresolvable(reason: string): FixedCandidateResult {
  return { resolvable: false, reason }
}

function singleSubscriptionTag(filters: GroupFilterDraft[]): string | null {
  if (filters.length === 0 || filters.some((filter) => filter.exclude)) return null
  const tags: string[] = []
  for (const filter of filters) {
    if (filter.kind === 'subscriptionNodes' && filter.source) {
      tags.push(filter.source)
      continue
    }
    if (filter.kind === 'subscriptions' && filter.values.length === 1 && filter.values[0]) {
      tags.push(filter.values[0])
      continue
    }
    return null
  }
  return new Set(tags).size === 1 ? tags[0] : null
}

function resolveSubscriptionCandidates(
  tag: string,
  filters: GroupFilterDraft[],
  sources: SubscriptionNodeSource[],
  sourcesLoaded: boolean,
): FixedCandidateResult {
  if (!sourcesLoaded) return fixedUnresolvable('订阅节点缓存尚未读取，暂时无法安全选择节点')
  const source = sources.find((candidate) => candidate.tag === tag)
  if (!source) return fixedUnresolvable(`订阅 ${tag} 没有可用缓存，无法确认节点顺序`)
  if (source.problem) return fixedUnresolvable(`订阅 ${tag} 的缓存不可用：${source.problem}`)
  if (source.skipped) {
    return fixedUnresolvable(`订阅 ${tag} 还有 ${source.skipped} 个未命名节点，无法确认固定索引`)
  }
  if (source.nodes.some((node) => node.matches > 1)) {
    return fixedUnresolvable(`订阅 ${tag} 存在同名节点，无法确认固定索引`)
  }

  const wanted = filters.every((filter) => filter.kind === 'subscriptionNodes')
    ? new Set(filters.flatMap((filter) => filter.values.map((value) => value.trim()).filter(Boolean)))
    : null
  const known = new Set(source.nodes.map((node) => node.name))
  if (wanted) {
    const missing = [...wanted].filter((name) => !known.has(name))
    if (missing.length > 0) return fixedUnresolvable(`${missing.join('、')} 不在订阅 ${tag} 的缓存中`)
  }
  const nodes = source.nodes
    .filter((node) => !wanted || wanted.has(node.name))
    .map((node) => ({
      name: node.name,
      protocol: node.protocol || '',
      host: node.host || '',
      port: null,
    }))
  return nodes.length > 0 ? { resolvable: true, nodes } : fixedUnresolvable('当前过滤条件没有可选节点')
}

function resolveLocalCandidates(
  content: string,
  filters: GroupFilterDraft[],
  sources: SubscriptionNodeSource[],
  sourcesLoaded: boolean,
): FixedCandidateResult {
  const nodeSection = readSection(content, 'node')
  const subscriptionSection = readSection(content, 'subscription')
  if (nodeSection.unparsedLines > 0 || subscriptionSection.unparsedLines > 0) {
    return fixedUnresolvable('配置中有跨行或无法解析的节点声明，无法确认固定索引')
  }

  const entries = nodeSection.entries
  if (entries.some((entry) => !entry.tag?.trim())) {
    return fixedUnresolvable('本地节点存在未命名条目，无法确认固定索引')
  }
  const filtersAreExplicitNodes = filters.length > 0
    && filters.every((filter) => filter.kind === 'nodes' && !filter.exclude)
  if (filters.length > 0 && !filtersAreExplicitNodes) {
    return fixedUnresolvable('当前过滤条件不是明确的本地节点列表')
  }

  const wanted = filtersAreExplicitNodes
    ? new Set(filters.flatMap((filter) => filter.values.map((value) => value.trim()).filter(Boolean)))
    : null
  const available = new Set(entries.map((entry) => entry.tag!.trim()))
  if (wanted) {
    const missing = [...wanted].filter((name) => !available.has(name))
    if (missing.length > 0) return fixedUnresolvable(`${missing.join('、')} 不是显式的本地节点标签`)
  }

  const selected = entries.filter((entry) => !wanted || wanted.has(entry.tag!.trim()))
  const parsed = selected.map((entry) => ({ entry, info: parseNodeLink(entry.value) }))
  if (parsed.some((candidate) => candidate.info === null)) {
    return fixedUnresolvable('候选中有无法解析的节点链接，无法安全选择节点')
  }
  const names = parsed.map((candidate) => candidate.entry.tag!.trim())
  if (new Set(names).size !== names.length) {
    return fixedUnresolvable('本地节点存在重复标签，无法确认固定索引')
  }

  if (subscriptionSection.entries.length > 0) {
    if (!sourcesLoaded) return fixedUnresolvable('配置包含订阅，正在读取缓存以确认节点顺序')
    const subscriptionTags = subscriptionSection.entries.map((entry) => entry.tag?.trim() || '')
    if (subscriptionTags.some((tag) => tag === '')) {
      return fixedUnresolvable('存在未命名订阅，无法确认节点顺序')
    }
    if (new Set(subscriptionTags).size !== subscriptionTags.length) {
      return fixedUnresolvable('配置中存在重复订阅标签，dae 合并节点的顺序无法安全确认')
    }
    const cacheSources = subscriptionTags.map((tag) => sources.find((source) => source.tag === tag))
    if (cacheSources.some((source) => !source || source.problem || source.skipped || source.nodes.some((node) => node.matches > 1))) {
      return fixedUnresolvable('订阅缓存不完整或存在重名节点，无法确认本地节点顺序')
    }
    const subscriptionNames = new Set(cacheSources.flatMap((source) => source?.nodes.map((node) => node.name) || []))
    const collisions = names.filter((name) => subscriptionNames.has(name))
    if (collisions.length > 0) {
      return fixedUnresolvable(`${collisions.join('、')} 与订阅节点重名，无法确认固定索引`)
    }
  }

  const nodes = parsed.map(({ entry, info }) => ({
    name: entry.tag!.trim(),
    protocol: info!.protocol,
    host: info!.host,
    port: info!.port,
  }))
  return nodes.length > 0 ? { resolvable: true, nodes } : fixedUnresolvable('当前过滤条件没有可选节点')
}

/**
 * 解析 fixed 策略的候选顺序。无法证明名称与 dae 内部索引一一对应时不返回节点列表，
 * 调用方应禁用名称选择，而不是猜一个 fixed(n)。
 */
export function resolveFixedCandidates(
  content: string,
  filters: GroupFilterDraft[],
  sources: SubscriptionNodeSource[],
  sourcesLoaded: boolean,
): FixedCandidateResult {
  const subscriptionSection = readSection(content, 'subscription')
  if (subscriptionSection.unparsedLines > 0) {
    return fixedUnresolvable('配置中有跨行或无法解析的订阅声明，无法确认固定索引')
  }

  const subscriptionTag = singleSubscriptionTag(filters)
  if (subscriptionTag !== null) {
    const matchingSubscriptions = subscriptionSection.entries
      .filter((entry) => entry.tag?.trim() === subscriptionTag)
    if (matchingSubscriptions.length !== 1) {
      return fixedUnresolvable(matchingSubscriptions.length === 0
        ? `配置中没有名为 ${subscriptionTag} 的订阅`
        : `订阅标签 ${subscriptionTag} 重复，dae 合并节点的顺序无法安全确认`)
    }
    return resolveSubscriptionCandidates(subscriptionTag, filters, sources, sourcesLoaded)
  }
  if (filters.length === 0 && subscriptionSection.entries.length > 0) {
    // dae 遍历 tagToNodeList 这个 Go map 构造全局节点池，跨来源顺序没有稳定承诺。
    return fixedUnresolvable('该分组包含本地节点和订阅节点，dae 不保证不同来源之间的固定顺序；请先明确选择成员')
  }
  if (filters.length === 0 || filters.every((filter) => filter.kind === 'nodes' && !filter.exclude)) {
    return resolveLocalCandidates(content, filters, sources, sourcesLoaded)
  }
  return fixedUnresolvable('当前过滤条件无法安全展开为节点列表')
}
