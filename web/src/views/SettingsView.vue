<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NSwitch,
  NText,
  useMessage,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { CloudDownloadOutline, DownloadOutline, KeyOutline, RefreshOutline } from '@vicons/ionicons5'
import { getDownload, getJSON, postJSON, putJSON } from '../api/client'
import type { PanelUpdatePayload, PanelUpdateStatus } from '../types/api'
import { useAuthStore } from '../stores/auth'
import { formatDateTime } from '../utils/format'

const auth = useAuthStore()
const message = useMessage()
const form = ref<FormInst | null>(null)
const passwordLoading = ref(false)
const dumpLoading = ref(false)
const updateLoading = ref(true)
const updateChecking = ref(false)
const updateSaving = ref(false)
const panelUpdate = ref<PanelUpdatePayload | null>(null)
const updateError = ref('')
const model = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const rules: FormRules = {
  currentPassword: { required: true, message: '请输入当前密码', trigger: ['input', 'blur'] },
  newPassword: [
    { required: true, message: '请输入新密码', trigger: ['input', 'blur'] },
    { min: 12, message: '新密码至少需要 12 个字符', trigger: ['input', 'blur'] },
  ],
  confirmPassword: {
    validator: (_rule, value: string) => value === model.newPassword,
    message: '两次输入的新密码不一致',
    trigger: ['input', 'blur'],
  },
}

async function changePassword() {
  await form.value?.validate()
  passwordLoading.value = true
  try {
    await auth.changePassword(model.currentPassword, model.newPassword)
    model.currentPassword = ''
    model.newPassword = ''
    model.confirmPassword = ''
    message.success('密码已修改，其他登录会话均已注销')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '修改密码失败')
  } finally {
    passwordLoading.value = false
  }
}

async function downloadSysdump() {
  dumpLoading.value = true
  try {
    const result = await getDownload('/api/v1/diagnostics/sysdump')
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement('a')
    link.href = url
    link.download = result.filename
    link.click()
    URL.revokeObjectURL(url)
    message.success('诊断归档已生成')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '生成诊断文件失败')
  } finally {
    dumpLoading.value = false
  }
}

async function loadPanelUpdate() {
  try {
    panelUpdate.value = await getJSON<PanelUpdatePayload>('/api/v1/panel/update')
    updateError.value = ''
  } catch (error) {
    updateError.value = error instanceof Error ? error.message : '读取面板更新设置失败'
  } finally {
    updateLoading.value = false
  }
}

async function checkPanelUpdate() {
  updateChecking.value = true
  try {
    panelUpdate.value = await postJSON<PanelUpdatePayload>('/api/v1/panel/update/check')
    updateError.value = ''
    const check = panelUpdate.value.check
    if (check.error) {
      message.warning(`检查失败：${check.error}`)
    } else if (check.updateAvailable) {
      message.success(`发现新版本 ${check.latest}`)
    } else {
      message.success('当前已经是最新版本')
    }
  } catch (error) {
    updateError.value = error instanceof Error ? error.message : '检查面板更新失败'
  } finally {
    updateChecking.value = false
  }
}

async function setSelfUpdate(enabled: boolean) {
  const previous = panelUpdate.value?.status?.enabled
  if (panelUpdate.value?.status) panelUpdate.value.status.enabled = enabled
  updateSaving.value = true
  try {
    const payload = await putJSON<{ status: PanelUpdateStatus }>('/api/v1/panel/update/preference', { enabled })
    if (panelUpdate.value) panelUpdate.value.status = payload.status
    window.dispatchEvent(new CustomEvent('kdae-panel:self-update-changed', { detail: payload.status }))
    message.success(enabled ? '已开启面板一键升级' : '已关闭面板一键升级')
  } catch (error) {
    if (panelUpdate.value?.status && previous !== undefined) panelUpdate.value.status.enabled = previous
    message.error(error instanceof Error ? error.message : '保存面板更新设置失败')
  } finally {
    updateSaving.value = false
  }
}

onMounted(() => void loadPanelUpdate())
</script>

<template>
  <div class="page-stack settings-page">
    <div class="page-toolbar">
      <div>
        <h2>面板设置</h2>
        <NText depth="3">管理管理员凭据、面板更新与系统诊断</NText>
      </div>
    </div>

    <NGrid class="equal-height-grid" responsive="screen" cols="1 l:2" :x-gap="16" :y-gap="16">
      <NGridItem>
        <NCard title="修改管理员密码" class="panel-card">
          <template #header-extra><NIcon size="20"><KeyOutline /></NIcon></template>
          <NAlert type="info" :bordered="false" class="settings-alert">
            修改成功后会注销该账户的所有旧会话，并为当前浏览器签发新会话。
          </NAlert>
          <NForm ref="form" :model="model" :rules="rules" label-placement="top" @submit.prevent="changePassword">
            <NFormItem label="当前密码" path="currentPassword">
              <NInput v-model:value="model.currentPassword" type="password" show-password-on="click" autocomplete="current-password" />
            </NFormItem>
            <NFormItem label="新密码" path="newPassword">
              <NInput v-model:value="model.newPassword" type="password" show-password-on="click" autocomplete="new-password" placeholder="至少 12 个字符" />
            </NFormItem>
            <NFormItem label="确认新密码" path="confirmPassword">
              <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" autocomplete="new-password" />
            </NFormItem>
            <NButton type="primary" attr-type="submit" :loading="passwordLoading">修改密码</NButton>
          </NForm>
        </NCard>
      </NGridItem>

      <NGridItem class="settings-column">
        <NCard title="账户信息" class="panel-card">
          <dl class="details-list">
            <div><dt>用户名</dt><dd>{{ auth.user?.username || '—' }}</dd></div>
            <div><dt>账户创建时间</dt><dd>{{ formatDateTime(auth.user?.createdAt) }}</dd></div>
            <div><dt>当前会话到期</dt><dd>{{ formatDateTime(auth.expiresAt) }}</dd></div>
          </dl>
        </NCard>
        <NCard title="系统诊断" class="panel-card settings-dump">
          <p class="panel-description">调用当前 dae 的 sysdump 命令生成 gzip 诊断归档。文件可能包含接口、路由和系统环境信息，请谨慎分享。</p>
          <NButton secondary :loading="dumpLoading" @click="downloadSysdump">
            <template #icon><NIcon><DownloadOutline /></NIcon></template>导出 sysdump
          </NButton>
        </NCard>
      </NGridItem>
    </NGrid>

    <NCard title="面板更新" class="panel-card settings-update">
      <template #header-extra>
        <NSpace size="small" align="center">
          <NButton
            size="small"
            secondary
            :loading="updateChecking"
            :disabled="updateLoading || updateChecking"
            @click="checkPanelUpdate"
          >
            <template #icon><NIcon><RefreshOutline /></NIcon></template>立即检查
          </NButton>
          <NIcon size="20"><CloudDownloadOutline /></NIcon>
        </NSpace>
      </template>
      <NAlert v-if="updateError" type="error" :bordered="false" class="card-alert">{{ updateError }}</NAlert>
      <template v-else>
        <div class="settings-toggle-row">
          <div>
            <strong>允许一键升级</strong>
            <NText depth="3">有新版本时可直接在顶部提示中完成校验、备份、替换和重启。</NText>
          </div>
          <NSwitch
            :value="panelUpdate?.status?.enabled || false"
            :loading="updateLoading || updateSaving"
            :disabled="updateLoading || updateSaving || !panelUpdate?.status"
            aria-label="允许面板一键升级"
            @update:value="setSelfUpdate"
          />
        </div>
        <dl v-if="panelUpdate" class="details-list settings-update-details">
          <div><dt>当前版本</dt><dd class="mono">{{ panelUpdate.check.current }}</dd></div>
          <div><dt>最新版本</dt><dd class="mono">{{ panelUpdate.check.latest || '暂未取得' }}</dd></div>
          <div><dt>运行平台</dt><dd class="mono">{{ panelUpdate.status?.platform || '—' }}</dd></div>
          <div><dt>上一版副本</dt><dd class="mono">{{ panelUpdate.status?.previousPath || '尚未生成' }}</dd></div>
        </dl>
        <NAlert
          v-if="panelUpdate?.status?.enabled && !panelUpdate.status.updatable && panelUpdate.status.problem"
          type="warning"
          :bordered="false"
          class="card-alert"
        >
          {{ panelUpdate.status.problem }}
        </NAlert>
      </template>
    </NCard>
  </div>
</template>
