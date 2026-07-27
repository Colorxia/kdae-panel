import { chromium } from 'playwright'

const baseURL = process.env.BASE
if (!baseURL) {
  throw new Error('缺少 BASE，无法定位已安装的面板')
}

const failures = []
const browser = await chromium.launch({
  headless: true,
  channel: process.env.E2E_BROWSER_CHANNEL || undefined,
})
try {
  const page = await browser.newPage()
  const origin = new URL(baseURL).origin
  const isPageResource = (request) =>
    ['document', 'script', 'stylesheet', 'fetch', 'xhr'].includes(request.resourceType())

  page.on('pageerror', (error) => failures.push(`页面异常：${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      failures.push(`控制台错误：${message.text()}`)
    }
  })
  page.on('requestfailed', (request) => {
    if (isPageResource(request) && new URL(request.url()).origin === origin) {
      failures.push(`资源请求失败：${request.url()}（${request.failure()?.errorText ?? '未知错误'}）`)
    }
  })
  page.on('response', (response) => {
    const request = response.request()
    if (isPageResource(request) && new URL(response.url()).origin === origin && !response.ok()) {
      failures.push(`资源响应异常：${response.status()} ${response.url()}`)
    }
  })

  await page.goto(baseURL, { waitUntil: 'networkidle', timeout: 30_000 })
  await page.getByRole('heading', { name: '创建管理员' }).waitFor({
    state: 'visible',
    timeout: 15_000,
  })
  const authResponse = await page.request.get(new URL('/api/v1/auth/status', baseURL).toString())
  if (!authResponse.ok()) {
    failures.push(`认证状态接口返回 ${authResponse.status()}`)
  } else {
    const authStatus = await authResponse.json()
    if (authStatus.initialized !== false) {
      failures.push(`全新安装的认证状态异常：${JSON.stringify(authStatus)}`)
    }
  }

  if (failures.length > 0) {
    throw new Error(failures.join('\n'))
  }
} finally {
  await browser.close()
}
