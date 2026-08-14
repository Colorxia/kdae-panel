import { describe, expect, it } from 'vitest'
import { buildSimpleRouting, detectSimpleRouting, splitRoutingMatch } from './routing'

describe('路由规则编辑回填', () => {
  it.each([
    ['pname(AdGuardHome)', 'pname', 'AdGuardHome'],
    ["domain(regex: 'example\\(com\\)')", 'domain', "regex: 'example\\(com\\)'"],
    ['domain(suffix(example.com))', 'domain', 'suffix(example.com)'],
  ] as const)('拆分单个匹配器：%s', (match, kind, value) => {
    expect(splitRoutingMatch(match)).toEqual({ kind, value })
  })

  it.each([
    'pname(AdGuardHome) && l4proto(udp) && dport(53)',
    '!domain(geosite:cn)',
    'custom(foo)',
    'raw(foo)',
    'pname(AdGuardHome))',
  ])('复合或未知表达式原样进入高级模式：%s', (match) => {
    expect(splitRoutingMatch(match)).toEqual({ kind: 'raw', value: match })
  })
})

describe('常用路由模板', () => {
  it.each([
    ['gfw', 'domain(geosite:gfw) -> proxy\n  fallback: direct'],
    ['nonCn', 'domain(geosite:cn) -> direct\n  fallback: proxy'],
    ['cnOnly', 'domain(geosite:cn) -> proxy\n  fallback: direct'],
    ['global', 'dip(geoip:private) -> direct\n  fallback: proxy'],
    ['direct', 'dip(geoip:private) -> direct\n  fallback: direct'],
  ] as const)('%s 模式生成预期规则', (mode, expected) => {
    expect(buildSimpleRouting(mode, 'proxy')).toContain(expected)
  })

  it('模板生成与识别可以往返', () => {
    for (const mode of ['gfw', 'nonCn', 'cnOnly', 'global'] as const) {
      const body = buildSimpleRouting(mode, 'proxy', ['AA:BB:CC:DD:EE:FF'], 'direct')
      expect(detectSimpleRouting(body, ['proxy'])).toEqual({
        mode,
        group: 'proxy',
        macs: ['AA:BB:CC:DD:EE:FF'],
        action: 'direct',
      })
    }
  })

  it('全直连也能识别 MAC 代理覆盖', () => {
    const body = buildSimpleRouting('direct', 'proxy', ['AA:BB:CC:DD:EE:FF'], 'proxy')
    expect(detectSimpleRouting(body, ['proxy'])).toMatchObject({ mode: 'direct', group: 'proxy', action: 'proxy' })
  })

  it('仅指定设备代理必须真的包含 MAC 规则', () => {
    expect(detectSimpleRouting(buildSimpleRouting('macOnly', 'proxy'), ['proxy'])).toBeNull()
    const body = buildSimpleRouting('macOnly', 'proxy', ['AA:BB:CC:DD:EE:FF'])
    expect(detectSimpleRouting(body, ['proxy'])).toMatchObject({ mode: 'macOnly', group: 'proxy' })
  })

  it('含注释、额外规则或未知分组时降级到高级模式', () => {
    const body = buildSimpleRouting('gfw', 'proxy')
    expect(detectSimpleRouting(`# 保留说明\n${body}`, ['proxy'])).toBeNull()
    expect(detectSimpleRouting(`${body}\n  dport(443) -> block`, ['proxy'])).toBeNull()
    expect(detectSimpleRouting(body, ['other'])).toBeNull()
  })
})
