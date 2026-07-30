import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const configPath = join(here, '.work', 'config.dae')

const PASSWORD = 'e2e-Password-2026'
const NODE_LINK = 'trojan://demo@e2e-node.example.com:443?sni=e2e-node.example.com#E2E-01'

async function expectCardsAligned(locator: import('@playwright/test').Locator) {
  await expect.poll(async () => {
    const boxes = await locator.evaluateAll((cards) => cards.map((card) => {
      const box = card.getBoundingClientRect()
      return { top: Math.round(box.top), height: box.height }
    }))
    const rows = Map.groupBy(boxes, ({ top }) => top)
    const sharedRows = [...rows.values()].filter((row) => row.length > 1)
    if (!sharedRows.length) return Number.POSITIVE_INFINITY
    return Math.max(...sharedRows.map((row) => {
      const heights = row.map(({ height }) => height)
      return Math.max(...heights) - Math.min(...heights)
    }))
  }).toBeLessThanOrEqual(1)
}

async function expectColumnsAligned(locator: import('@playwright/test').Locator) {
  await expect.poll(async () => {
    const bottoms = await locator.evaluateAll((columns) => columns.map((column) => column.getBoundingClientRect().bottom))
    if (bottoms.length < 2) return Number.POSITIVE_INFINITY
    return Math.max(...bottoms) - Math.min(...bottoms)
  }).toBeLessThanOrEqual(1)
}

// 一条链路走完初始化 → 概览 → 编排保存 → 退出重登：
// 这是唯一同时压到路由守卫、CSRF、配置事务与 dae 校验桩的测试，
// 步骤之间共享账号与磁盘状态，因此收在一个用例里按序执行。
test('首次初始化到编排保存的完整链路', async ({ page }) => {
  await test.step('通过一次性链接初始化管理员', async () => {
    await page.goto('/setup#bootstrap=e2e-bootstrap')
    await expect(page.getByRole('heading', { name: '创建管理员' })).toBeVisible()
    await page.getByPlaceholder('至少 12 个字符').fill(PASSWORD)
    await page.locator('.n-form-item', { hasText: '确认密码' }).locator('input').fill(PASSWORD)
    await page.getByRole('button', { name: '完成初始化' }).click()
    // 初始化成功即已登录，落在运行概览
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
  })

  await test.step('概览呈现 systemd 桩给出的健康状态', async () => {
    await expect(page.locator('.metric-card').first()).toContainText('运行中')
    await expect(page.getByText('dae version v1.0.6')).toBeVisible()
    await expectCardsAligned(page.locator('.equal-height-grid .panel-card'))
  })

  await test.step('导入节点并保存重载，改动落到磁盘', async () => {
    await page.route('**/api/v1/host/interfaces', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        { name: 'dae0', addresses: ['10.0.0.1/24'] },
        { name: 'ens2', addresses: ['192.168.50.23/24', 'fe80::1/64'] },
        { name: 'lo', addresses: ['127.0.0.1/8', '::1/128'] },
      ]),
    }))
    await page.goto('/proxy')
    await expectCardsAligned(page.locator('.equal-height-grid .panel-card'))
    for (const [toolbar, content] of [
      ['subscription-add', 'subscription-list'],
      ['group-add', 'group-list'],
    ] as const) {
      const positions = await Promise.all([
        page.getByTestId(toolbar).evaluate((element) => element.getBoundingClientRect().top),
        page.getByTestId(content).first().evaluate((element) => element.getBoundingClientRect().top),
      ])
      expect(positions[0], `${toolbar} 应固定在内容区上方`).toBeLessThan(positions[1])
    }

    const global = page.getByTestId('global-card')
    await expect(global).toBeVisible()
    await global.getByRole('button', { name: '编辑设置' }).click()
    const globalModal = page.getByTestId('global-editor-modal')
    const logLevel = globalModal.locator('.global-field', { hasText: '日志级别' })
    const logLevelSelect = logLevel.locator('.n-base-selection')
    await expect(logLevelSelect).toContainText('info')
    await logLevelSelect.click()
    await page.locator('.n-base-select-option', { hasText: 'debug' }).click()
    const lanInterface = globalModal.locator('.global-field', { hasText: '局域网接口' })
    await lanInterface.locator('.n-base-selection').click()
    const ens2Option = page.locator('.interface-option', { hasText: 'ens2' })
    await expect(ens2Option).toContainText('192.168.50.23/24')
    await ens2Option.click()
    await expect(lanInterface.locator('.n-base-selection')).toContainText('ens2')

    const wanInterface = globalModal.locator('.global-field', { hasText: '广域网接口' })
    await wanInterface.locator('.n-base-selection').click()
    const autoOption = page.locator('.interface-option', { hasText: '自动识别' })
    await expect(autoOption).toContainText('由 dae 自动选择默认广域网接口')
    await autoOption.click()
    await expect(wanInterface.locator('.n-base-selection')).toContainText('自动识别')
    await globalModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(global).toContainText('debug')
    await expect(global).toContainText('auto')

    await page.getByRole('button', { name: '导入节点' }).click()
    await page.getByPlaceholder(/vmess/).fill(NODE_LINK)
    await page.getByRole('button', { name: '加入编排' }).click()
    await expect(page.getByText('e2e-node.example.com').first()).toBeVisible()
    await page.getByTestId('nodes-card').getByRole('button', { name: '编辑原文' }).click()
    const nodeSourceModal = page.locator('.n-modal', { hasText: '编辑节点原文' })
    await expect(nodeSourceModal).toBeVisible()
    await expect(page).toHaveURL(/\/proxy$/)
    await nodeSourceModal.getByRole('button', { name: '取消' }).click()

    const subscriptions = page.getByTestId('subscriptions-card')
    await subscriptions.getByPlaceholder('标签(可选)').fill('e2e_sub')
    await subscriptions.getByPlaceholder('https://example.com/subscription').fill('https://example.com/e2e')
    await subscriptions.getByRole('button', { name: '添加', exact: true }).click()
    const subscriptionRow = subscriptions.locator('tr', { hasText: 'e2e_sub' })
    await expect(subscriptionRow).toBeVisible()
    await subscriptionRow.getByRole('button', { name: '编辑' }).click()
    const subscriptionModal = page.locator('.n-modal', { hasText: '编辑订阅' })
    await subscriptionModal.getByPlaceholder('https://example.com/subscription').fill('https://example.com/e2e-updated')
    await subscriptionModal.getByRole('button', { name: '确定' }).click()
    await expect(subscriptionRow).toContainText('e2e-updated')

    const groups = page.getByTestId('groups-card')
    await groups.getByPlaceholder('新分组名，如 proxy').fill('proxy')
    await groups.getByRole('button', { name: '新建' }).click()
    const groupItem = groups.locator('.group-item', { hasText: 'proxy' })
    await groupItem.getByRole('button', { name: '编辑' }).click()
    const groupModal = page.getByTestId('group-editor-modal')
    await groupModal.getByRole('button', { name: '选择节点' }).click()
    await groupModal.getByTestId('group-node-picker').locator('.n-base-selection').click()
    await page.locator('.n-base-select-option', { hasText: 'E2E-01' }).click()
    await groupModal.getByRole('button', { name: '选择订阅' }).click()
    await groupModal.getByTestId('group-subscription-picker').locator('.n-base-selection').click()
    await page.locator('.n-base-select-option', { hasText: 'e2e_sub' }).click()
    await groupModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(groupItem).toContainText('节点：E2E-01')
    await expect(groupItem).toContainText('订阅：e2e_sub')

    const routing = page.getByTestId('routing-card')
    await routing.getByRole('button', { name: '添加规则' }).click()
    const ruleModal = page.getByTestId('routing-rule-modal')
    await ruleModal.getByRole('button', { name: '应用到编排' }).click()
    const rule = routing.locator('.routing-rule', { hasText: 'domain(geosite:gfw)' })
    await expect(rule).toContainText('proxy')
    await rule.getByRole('button', { name: '编辑' }).click()
    await ruleModal.getByPlaceholder('geosite:gfw').fill('geosite:cn')
    await ruleModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(routing.getByText('domain(geosite:cn)')).toBeVisible()

    await routing.getByRole('button', { name: '编辑路由' }).click()
    const routingModal = page.getByTestId('routing-editor-modal')
    const advancedTab = routingModal.locator('.n-tabs-tab', { hasText: '高级模式' })
    const simpleTab = routingModal.locator('.n-tabs-tab', { hasText: '简单模式' })
    await expect(advancedTab).toHaveClass(/n-tabs-tab--active/)
    await expect(page).toHaveURL(/\/proxy$/)
    const originalAdvanced = await routingModal.locator('textarea').inputValue()
    await simpleTab.click()
    await advancedTab.click()
    await expect(routingModal.locator('textarea')).toHaveValue(originalAdvanced)
    await routingModal.getByRole('button', { name: '取消' }).click()
    await expect(routing.getByText('domain(geosite:cn)')).toBeVisible()

    await routing.getByRole('button', { name: '编辑路由' }).click()
    const reopenedRoutingModal = page.getByTestId('routing-editor-modal')
    await reopenedRoutingModal.locator('.n-tabs-tab', { hasText: '简单模式' }).click()
    await reopenedRoutingModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(routing.getByText('pname(NetworkManager, systemd-resolved, dnsmasq)')).toBeVisible()

    await page.locator('.page-toolbar').getByRole('button', { name: '保存并重载' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '保存并重载' }).click()
    await expect(page.getByText('编排结果已保存并完成无损重载').first()).toBeVisible()

    // 面板宣称保存成功，磁盘上必须真的有这一行——这是配置事务的最终断言
    const saved = readFileSync(configPath, 'utf8')
    expect(saved).toContain(NODE_LINK)
    expect(saved).toContain("e2e_sub: 'https://example.com/e2e-updated'")
    expect(saved).toContain('filter: name(E2E-01)')
    expect(saved).toContain('filter: subtag(e2e_sub)')
    expect(saved).toContain('domain(geosite:gfw) -> proxy')
    expect(saved).toContain('log_level: debug')
    expect(saved).toContain("lan_interface: 'ens2'")
    expect(saved).toContain("wan_interface: 'auto'")
  })

  await test.step('设置页左右列保持同一底边', async () => {
    await page.goto('/settings')
    await expect(page.getByRole('heading', { name: '面板设置', level: 2 })).toBeVisible()
    await expectColumnsAligned(page.locator('.settings-page .equal-height-grid > *'))

    const forcedPanelCheck = page.waitForResponse((response) =>
      response.url().endsWith('/api/v1/panel/update/check') && response.request().method() === 'POST')
    await page.getByRole('button', { name: '立即检查' }).click()
    expect((await forcedPanelCheck).status()).toBe(200)

    const selfUpdate = page.getByRole('switch', { name: '允许面板一键升级' })
    await expect(selfUpdate).toBeChecked()
    await expect(selfUpdate).toBeEnabled()
    await selfUpdate.click()
    await expect(selfUpdate).not.toBeChecked()
    await page.reload()
    const reloadedSelfUpdate = page.getByRole('switch', { name: '允许面板一键升级' })
    await expect(reloadedSelfUpdate).not.toBeChecked()
    await expect(reloadedSelfUpdate).toBeEnabled()
    await reloadedSelfUpdate.click()
    await expect(reloadedSelfUpdate).toBeChecked()
  })

  await test.step('卸载 dae 时由用户独立选择配置与 geo 去留', async () => {
    await page.route('**/api/v1/dae/install', async (route) => {
      if (route.request().method() !== 'GET') return route.continue()
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            binaryPath: '/usr/bin/dae',
            platform: 'linux-amd64',
            ready: true,
            present: true,
            version: 'dae version v2.0.0',
            managed: {
              source: 'official',
              ref: 'v2.0.0',
              label: 'v2.0.0',
              installedAt: '2026-07-30T00:00:00Z',
              sha256: 'e2e',
            },
            rollbackAvailable: false,
            serviceActive: true,
          },
          job: { phase: 'idle' },
        }),
      })
    })
    await page.route('**/api/v1/dae/versions**', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ versions: [] }),
    }))

    await page.goto('/versions')
    await page.getByRole('button', { name: '卸载 dae' }).click()
    const dialog = page.locator('.n-dialog')
    const purgeConfig = dialog.getByRole('checkbox', { name: '同时删除 dae 主配置文件' })
    const purgeGeo = dialog.getByRole('checkbox', { name: '同时删除面板可见的全部 geo 数据副本' })
    await expect(purgeConfig).toBeVisible()
    await expect(purgeGeo).toBeVisible()
    await expect(purgeConfig).not.toBeChecked()
    await expect(purgeGeo).not.toBeChecked()
    await dialog.getByRole('button', { name: '取消' }).click()
    await page.unroute('**/api/v1/dae/install')
    await page.unroute('**/api/v1/dae/versions**')
  })

  await test.step('切换中隐藏事务告警并可管理本地版本', async () => {
    let applying = true
    let cached = true
    let deleted: unknown
    await page.route('**/api/v1/dae/install', async (route) => {
      if (route.request().method() !== 'GET') return route.continue()
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            binaryPath: '/usr/bin/dae',
            platform: 'x86_64_v3_avx2',
            ready: true,
            present: true,
            version: applying ? 'dae version v1.9.0' : 'dae version v2.0.0',
            managed: {
              source: 'official',
              ref: 'v2.0.0',
              label: 'v2.0.0',
              installedAt: '2026-07-30T00:00:00Z',
              sha256: 'e2e',
            },
            drifted: applying,
            rollbackAvailable: true,
            serviceActive: true,
            warnings: applying
              ? ['发现上一次安装留下的暂存备份，说明它在中途被打断；请核对上面的运行版本是否符合预期']
              : [],
          },
          job: applying
            ? { phase: 'applying', source: 'official', ref: 'v1.9.0', label: 'v1.9.0', cached: true }
            : { phase: 'idle' },
        }),
      })
    })
    await page.route('**/api/v1/dae/versions**', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        versions: [{
          source: 'official',
          ref: 'v1.9.0',
          label: 'v1.9.0',
          description: 'Local cache E2E',
          publishedAt: '2026-07-01T00:00:00Z',
          installable: true,
          cached,
          cachedAt: '2026-07-30T00:00:00Z',
          cachedBytes: 33_554_432,
        }],
      }),
    }))
    await page.route('**/api/v1/dae/cache', async (route) => {
      if (route.request().method() !== 'DELETE') return route.continue()
      deleted = route.request().postDataJSON()
      cached = false
      await route.fulfill({ status: 204, body: '' })
    })

    await page.goto('/versions')
    await expect(page.getByText('正在使用本地版本替换二进制并重启 dae')).toBeVisible()
    await expect(page.getByText(/发现上一次安装留下的暂存备份/)).toHaveCount(0)
    await expect(page.getByText(/磁盘上的二进制与面板记录不一致/)).toHaveCount(0)

    applying = false
    await page.reload()
    const row = page.locator('tr', { hasText: 'v1.9.0' })
    await expect(row.getByText('已下载')).toBeVisible()
    await row.getByRole('button', { name: '删除 v1.9.0 的本地缓存' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '删除缓存' }).click()
    await expect.poll(() => deleted).toEqual({ source: 'official', ref: 'v1.9.0' })
    await expect(row.getByText('已下载')).toHaveCount(0)

    await page.unroute('**/api/v1/dae/install')
    await page.unroute('**/api/v1/dae/versions**')
    await page.unroute('**/api/v1/dae/cache')
  })

  await test.step('移动端代理编排与弹窗没有横向溢出', async () => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/proxy')
    await expect(page.getByRole('heading', { name: '代理编排', level: 2 })).toBeVisible()
    let overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)

    await page.getByTestId('global-card').getByRole('button', { name: '编辑设置' }).click()
    const globalModal = page.getByTestId('global-editor-modal')
    const globalModalBox = await globalModal.boundingBox()
    expect(globalModalBox).not.toBeNull()
    expect(globalModalBox!.x).toBeGreaterThanOrEqual(0)
    expect(globalModalBox!.x + globalModalBox!.width).toBeLessThanOrEqual(390)
    expect(await globalModal.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    await globalModal.getByRole('button', { name: '取消' }).click()

    await page.getByTestId('routing-card').getByRole('button', { name: '编辑路由' }).click()
    const routingModal = page.getByTestId('routing-editor-modal')
    const modalBox = await routingModal.boundingBox()
    expect(modalBox).not.toBeNull()
    expect(modalBox!.x).toBeGreaterThanOrEqual(0)
    expect(modalBox!.x + modalBox!.width).toBeLessThanOrEqual(390)
    expect(await routingModal.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    await routingModal.getByRole('button', { name: '取消' }).click()

    await page.goto('/')
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  await test.step('退出后凭密码重新登录', async () => {
    await page.getByRole('button', { name: '退出登录' }).click()
    await expect(page.getByRole('heading', { name: '管理员登录' })).toBeVisible()
    await page.getByPlaceholder('admin').fill('admin')
    await page.getByPlaceholder('输入管理员密码').fill(PASSWORD)
    await page.getByRole('button', { name: '登录', exact: true }).click()
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
  })
})
