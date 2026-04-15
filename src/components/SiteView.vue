<script setup lang="ts">
import { i18n } from '#imports'
import { type Ref, inject, computed } from 'vue'
import { showToast } from '@/composables/useToast.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'

defineOptions({ inheritAttrs: false })

const siteInfo = inject<Ref<SiteInfo | undefined>>('siteInfo')

const cacheSize = computed(() => {
  if (typeof siteInfo?.value?.estimate?.usage !== 'number') return 'Unknown'
  return formatBytes(siteInfo?.value?.estimate?.usage)
})

function formatBytes(bytes: number | string | undefined, decimals = 2): string {
  const numBytes = typeof bytes === 'string' ? Number.parseInt(bytes) : bytes
  if (!numBytes) return '0 Bytes'
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(numBytes) / Math.log(1024))
  return `${Number.parseFloat((numBytes / Math.pow(1024, i)).toFixed(decimals))} ${sizes[i]}`
}

async function copyText(e: MouseEvent) {
  const target = e.target as HTMLElement
  const text = target.textContent
  console.log('copyText:', text)
  if (!text) return
  await navigator.clipboard.writeText(text)
  showToast('Host Copied to Clipboard.')
}
</script>

<template>
  <HorizontalRule v-if="siteInfo">
    Site Cache Size: <span class="text-warning-emphasis fw-bolder">{{ cacheSize }}</span>
  </HorizontalRule>
  <HorizontalRule v-else>{{ i18n.t('options.form.siteSpecific') }}</HorizontalRule>

  <div
    v-bind="$attrs"
    class="text-center text-ellipsis border border-2 rounded p-1"
    :class="{ 'border-success': siteInfo, 'border-danger': !siteInfo, 'pb-0': siteInfo }"
    style="margin-top: 5px; margin-bottom: 5px"
  >
    <kbd v-if="siteInfo" class="d-inline-block text-ellipsis py-0" role="button" @click="copyText">{{
      siteInfo.hostname
    }}</kbd>
    <template v-else>{{ i18n.t('ui.text.noTabAccess') }}</template>
  </div>
</template>
