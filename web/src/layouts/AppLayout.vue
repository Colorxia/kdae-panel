<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  NAlert,
  NAvatar,
  NButton,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NText,
  useDialog,
  useMessage,
  type MenuOption,
} from 'naive-ui'
import {
  ArchiveOutline,
  CloudDownloadOutline,
  CodeSlashOutline,
  CubeOutline,
  DocumentTextOutline,
  GitNetworkOutline,
  GridOutline,
  LogOutOutline,
  ReaderOutline,
  SettingsOutline,
} from '@vicons/ionicons5'
import { getJSON, postJSON, putJSON } from '../api/client'
import type { PanelUpdatePayload, PanelUpdateStatus } from '../types/api'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const message = useMessage()
const dialog = useDialog()
const collapsed = ref(window.innerWidth < 900)

function menuLink(label: string, name: string, icon: typeof GridOutline): MenuOption {
  return {
    label: () => h(RouterLink, { to: { name } }, { default: () => label }),
    key: name,
    icon: () => h(NIcon, null, { default: () => h(icon) }),
  }
}

const menuOptions: MenuOption[] = [
  menuLink('运行概览', 'dashboard', GridOutline),
  menuLink('代理编排', 'orchestration', GitNetworkOutline),
  menuLink('配置管理', 'config', DocumentTextOutline),
  menuLink('配置能力', 'schema', CodeSlashOutline),
  menuLink('dae 版本', 'versions', CubeOutline),
  menuLink('运行日志', 'logs', ReaderOutline),
  menuLink('配置备份', 'backups', ArchiveOutline),
  menuLink('面板设置', 'settings', SettingsOutline),
]

const selectedKey = computed(() => String(route.name || 'dashboard'))
const title = computed(() => String(route.meta.title || 'kdae-panel'))

async function logout() {
  try {
    await auth.logout()
    await router.replace({ name: 'login' })
  } catch (error) {
    message.error(error instanceof Error ? error.message : '退出登录失败')
  }
}

function handleExpired() {
  auth.clearSession()
  void router.replace({ name: 'login' })
  message.warning('登录会话已过期，请重新登录')
}

function handleResize() {
  if (window.innerWidth < 900) collapsed.value = true
}

// 新版本提醒：后端带缓存，这里每次进入布局查一次即可。
// 检查失败保持沉默——提醒是锦上添花，不该因为 GitHub 不可达而打扰使用。
const update = ref<PanelUpdatePayload | null>(null)
const updateDismissed = ref(false)
const upgrading = ref(false)
const preferenceSaving = ref(false)
const canSelfUpdate = computed(() => update.value?.status?.enabled === true && update.value.status.updatable)
const canEnableSelfUpdate = computed(() => update.value?.status !== undefined && !update.value.status.enabled)

async function checkUpdate() {
  try {
    update.value = await getJSON<PanelUpdatePayload>('/api/v1/panel/update')
  } catch {
    update.value = null
  }
}

function confirmUpgrade() {
  const latest = update.value?.check.latest
  dialog.warning({
    title: `升级面板到 ${latest}`,
    content: '面板会下载发布包、比对 sha256，用新版本自证能在本机运行，'
      + `然后替换 ${update.value?.status?.binaryPath} 并重启自身。`
      + '重启期间面板会短暂无法访问（通常几秒），dae 与代理流量不受影响。'
      + '上一版会保留一份副本，万一新版本起不来可以手工换回。',
    positiveText: '下载并升级',
    negativeText: '取消',
    onPositiveClick: () => upgrade(latest),
  })
}

async function upgrade(version?: string) {
  upgrading.value = true
  try {
    await postJSON('/api/v1/panel/update', version ? { version } : {})
    message.info('已开始升级，面板重启后页面会自动刷新')
    void waitForRestart(version)
  } catch (error) {
    upgrading.value = false
    message.error(error instanceof Error ? error.message : '启动升级失败')
  }
}

function confirmEnableAndUpgrade() {
  const latest = update.value?.check.latest
  dialog.warning({
    title: `启用并升级到 ${latest}`,
    content: '启用状态会保存在面板数据目录，以后有新版本即可直接在这里升级。'
      + '本次会下载并校验发布包、备份当前二进制，然后重启面板；dae 与代理流量不受影响。',
    positiveText: '启用并升级',
    negativeText: '取消',
    onPositiveClick: async () => {
      preferenceSaving.value = true
      try {
        const payload = await putJSON<{ status: PanelUpdateStatus }>('/api/v1/panel/update/preference', { enabled: true })
        if (update.value) update.value.status = payload.status
        window.dispatchEvent(new CustomEvent('kdae-panel:self-update-changed', { detail: payload.status }))
        await upgrade(latest)
      } catch (error) {
        message.error(error instanceof Error ? error.message : '启用面板一键升级失败')
      } finally {
        preferenceSaving.value = false
      }
    },
  })
}

function handleSelfUpdateChanged(event: Event) {
  const status = (event as CustomEvent<PanelUpdateStatus>).detail
  if (update.value && status) update.value.status = status
}

// 面板重启期间请求必然失败，因此这里不能把错误当结论：只认"健康接口
// 报出了新版本"这一个成功信号，其余一律继续等，直到超时。
async function waitForRestart(expected?: string) {
  const deadline = Date.now() + 120_000
  while (Date.now() < deadline) {
    await new Promise((resolve) => window.setTimeout(resolve, 2000))
    try {
      const health = await getJSON<{ version: string }>('/api/v1/health')
      if (!expected || health.version === expected) {
        // 前端资源也换了新的，必须整页重载而不是只更新状态
        window.location.reload()
        return
      }
    } catch {
      // 重启中，继续等
    }
  }
  upgrading.value = false
  message.warning('等待面板重启超时，请手动刷新页面确认升级结果')
}

onMounted(() => {
  window.addEventListener('kdae-panel:auth-expired', handleExpired)
  window.addEventListener('kdae-panel:self-update-changed', handleSelfUpdateChanged)
  window.addEventListener('resize', handleResize)
  void checkUpdate()
})
onBeforeUnmount(() => {
  window.removeEventListener('kdae-panel:auth-expired', handleExpired)
  window.removeEventListener('kdae-panel:self-update-changed', handleSelfUpdateChanged)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <NLayout has-sider class="app-shell">
    <NLayoutSider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="236"
      :collapsed="collapsed"
      show-trigger="bar"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="brand" :class="{ compact: collapsed }">
        <div class="brand-mark">K</div>
        <div v-if="!collapsed" class="brand-copy">
          <strong>kdae-panel</strong>
          <span>零侵入管理面板</span>
        </div>
      </div>
      <NMenu :value="selectedKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
    </NLayoutSider>

    <NLayout>
      <NLayoutHeader bordered class="app-header">
        <div>
          <NText depth="3" class="eyebrow">KDAE CONTROL PLANE</NText>
          <h1>{{ title }}</h1>
        </div>
        <div class="account">
          <NAvatar round size="small">{{ auth.user?.username?.slice(0, 1).toUpperCase() }}</NAvatar>
          <div class="account-copy">
            <strong>{{ auth.user?.username }}</strong>
            <span>管理员</span>
          </div>
          <NButton quaternary circle title="退出登录" @click="logout">
            <template #icon><NIcon><LogOutOutline /></NIcon></template>
          </NButton>
        </div>
      </NLayoutHeader>
      <NLayoutContent class="app-content" content-style="padding: 28px;">
        <NAlert
          v-if="update?.check.updateAvailable && !updateDismissed"
          type="info"
          :closable="!upgrading"
          class="update-banner"
          @close="updateDismissed = true"
        >
          <div class="update-banner-body">
            <span>
              面板有新版本 <strong>{{ update.check.latest }}</strong>（当前 {{ update.check.current }}）。
              <template v-if="canSelfUpdate">升级会替换面板二进制并重启自身，配置与账号数据都会保留。</template>
              <template v-else-if="canEnableSelfUpdate">可直接在这里启用一键升级，不需要 SSH。</template>
              <template v-else-if="update.status?.problem">当前无法一键升级：{{ update.status.problem }}</template>
              <template v-else>当前部署不支持一键升级，可重新执行一键部署命令。</template>
              <a href="https://github.com/tuoro/kdae-panel/releases/latest" target="_blank" rel="noopener">查看发布说明</a>
            </span>
            <NButton
              v-if="canSelfUpdate"
              size="small"
              type="primary"
              :loading="upgrading"
              :disabled="upgrading"
              @click="confirmUpgrade"
            >
              <template #icon><NIcon><CloudDownloadOutline /></NIcon></template>
              {{ upgrading ? '升级中…' : '立即升级' }}
            </NButton>
            <NButton
              v-else-if="canEnableSelfUpdate"
              size="small"
              type="primary"
              :loading="preferenceSaving || upgrading"
              :disabled="preferenceSaving || upgrading"
              @click="confirmEnableAndUpgrade"
            >
              <template #icon><NIcon><CloudDownloadOutline /></NIcon></template>
              启用并升级
            </NButton>
          </div>
        </NAlert>
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
