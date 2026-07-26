<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { NButton, NCard, NIcon, NSpace, NTag, NText } from 'naive-ui'
import { ArrowForwardOutline, CreateOutline } from '@vicons/ionicons5'
import { parseGroups, parseRoutingRules } from '../../utils/daeconf'

// 路由规则的编排语义复杂（自上而下、fallback），这里只做只读呈现，
// 编辑引导去配置管理页改原文。
const props = defineProps<{ content: string }>()

const routingRules = computed(() => parseRoutingRules(props.content))
const groupNames = computed(() => new Set(parseGroups(props.content).map((group) => group.name)))
</script>

<template>
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
</template>
