export type SimpleRoutingMode = 'gfw' | 'nonCn' | 'cnOnly' | 'global' | 'direct' | 'macOnly'
export type MacAction = 'proxy' | 'direct'

export const ROUTING_MATCH_KINDS = [
  'domain',
  'dip',
  'dport',
  'sip',
  'sport',
  'pname',
  'mac',
  'l4proto',
  'ipversion',
] as const

export type RoutingMatchKind = (typeof ROUTING_MATCH_KINDS)[number]

const routingMatchKinds: ReadonlySet<string> = new Set(ROUTING_MATCH_KINDS)

/**
 * 只拆分单个受支持的顶层匹配器。复合表达式和未知匹配器必须原样进入高级模式，
 * 否则编辑器会把首个左括号与最后一个右括号误当成同一调用的边界。
 */
export function splitRoutingMatch(match: string): { kind: RoutingMatchKind | 'raw'; value: string } {
  const head = /^([A-Za-z_][A-Za-z0-9_]*)\(/.exec(match)
  if (!head || !routingMatchKinds.has(head[1])) return { kind: 'raw', value: match }

  const openParen = head[0].length - 1
  let depth = 0
  let quote: "'" | '"' | null = null

  for (let index = openParen; index < match.length; index += 1) {
    const char = match[index]
    if (quote) {
      if (char === '\\' && match[index + 1] === quote) index += 1
      else if (char === quote) quote = null
      continue
    }
    if (char === "'" || char === '"') {
      quote = char
      continue
    }
    if (char === '(') {
      depth += 1
      continue
    }
    if (char !== ')') continue

    depth -= 1
    if (depth < 0) return { kind: 'raw', value: match }
    if (depth === 0) {
      if (index !== match.length - 1) return { kind: 'raw', value: match }
      return {
        kind: head[1] as RoutingMatchKind,
        value: match.slice(openParen + 1, index),
      }
    }
  }

  return { kind: 'raw', value: match }
}

export const SIMPLE_ROUTING_MODES: Array<{
  value: SimpleRoutingMode
  label: string
  description: string
}> = [
  { value: 'gfw', label: 'GFW 模式', description: '仅代理 GFW 列表内域名，其余流量直连。' },
  { value: 'nonCn', label: '中国列表以外', description: '中国 IP 与域名直连，其余流量走代理分组。' },
  { value: 'cnOnly', label: '仅代理中国列表', description: '中国 IP 与域名走代理分组，其余流量直连。' },
  { value: 'global', label: '全局代理', description: '私网与系统组件直连，其余流量全部走代理分组。' },
  { value: 'direct', label: '全直连', description: '私网与全部普通流量直连。' },
  { value: 'macOnly', label: '仅指定设备代理', description: '默认直连，仅列表内 MAC 设备走代理分组。' },
]

export const MAC_ADDRESS_REGEX = /^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$/i

export interface SimpleRouting {
  mode: SimpleRoutingMode
  group: string
  macs: string[]
  action: MacAction
}

/** 生成可直接放进 routing 大括号内的常用模板。 */
export function buildSimpleRouting(
  mode: SimpleRoutingMode,
  group: string,
  macs: string[] = [],
  action: MacAction = 'proxy',
): string {
  const lines = [
    '  pname(NetworkManager, systemd-resolved, dnsmasq) -> must_direct',
    '  dip(geoip:private) -> direct',
  ]
  if (macs.length > 0) {
    const target = action === 'direct' ? 'direct' : group
    lines.push(`  mac(${macs.map((mac) => `'${mac}'`).join(', ')}) -> ${target}`)
  }
  switch (mode) {
    case 'gfw':
      lines.push(`  domain(geosite:gfw) -> ${group}`, '  fallback: direct')
      break
    case 'nonCn':
      lines.push('  dip(geoip:cn) -> direct', '  domain(geosite:cn) -> direct', `  fallback: ${group}`)
      break
    case 'cnOnly':
      lines.push(`  dip(geoip:cn) -> ${group}`, `  domain(geosite:cn) -> ${group}`, '  fallback: direct')
      break
    case 'global':
      lines.push(`  fallback: ${group}`)
      break
    case 'direct':
      lines.push('  fallback: direct')
      break
    case 'macOnly':
      lines.push('  dip(geoip:cn) -> direct', '  domain(geosite:cn) -> direct', '  fallback: direct')
      break
  }
  return lines.join('\n')
}

function normalizedLines(body: string): string[] {
  return body.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function parseMac(lines: string[]): { values: string[]; action: MacAction; target: string } | null {
  const line = lines.find((candidate) => candidate.startsWith('mac('))
  if (!line) return null
  const matched = /^mac\((.*)\)\s*->\s*([^\s]+)$/.exec(line)
  if (!matched) return null
  const values = matched[1].split(',').map((value) => value.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
  if (values.some((value) => !MAC_ADDRESS_REGEX.test(value))) return null
  return { values, action: matched[2] === 'direct' ? 'direct' : 'proxy', target: matched[2] }
}

/**
 * 只识别面板自己能完整往返的模板。含注释或额外规则时返回 null，
 * 让界面直接进入高级模式，避免一次无意的“应用”抹掉用户内容。
 */
export function detectSimpleRouting(body: string, groups: string[]): SimpleRouting | null {
  if (/(^|\s)#|\/\*/m.test(body)) return null
  const lines = normalizedLines(body)
  const mac = parseMac(lines)
  for (const mode of SIMPLE_ROUTING_MODES.map((option) => option.value)) {
    if (mode === 'macOnly' && !mac) continue
    const groupCandidates = mode === 'direct' && mac?.action !== 'proxy' ? [''] : groups
    for (const group of groupCandidates) {
      const macs = mac?.values || []
      const action = mac?.action || 'proxy'
      if (mac && action === 'proxy' && mac.target !== group) continue
      if (normalizedLines(buildSimpleRouting(mode, group, macs, action)).join('\n') === lines.join('\n')) {
        return { mode, group, macs, action }
      }
    }
  }
  return null
}
