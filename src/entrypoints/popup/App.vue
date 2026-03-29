<script setup lang="ts">
import { computed, ref } from 'vue'
import { isMobile } from '@/utils/system.ts'
import { useOptions } from '@/composables/useOptions.ts'
import { useSiteInfo } from '@/composables/useSiteInfo.ts'
import { showToast } from '@/composables/useToast.ts'
import { ClearCacheType, clearCache } from '@/utils/cache.ts'
import ToastAlerts from '@/components/ToastAlerts.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PermsCheck from '@/components/PermsCheck.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

console.debug('%c popup/App.vue', 'color: Lime')

const options = useOptions()
const siteInfo = useSiteInfo()
const cacheType = ref('site')
const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)

// TODO: Determine better method to set popup width
// const isBrowser = isFirefox ? '340px' : null
const width = computed(() => (isMobile ? '100%' : '360px'))
console.log('width:', width.value)

// TODO: Cleanup these functions...

function setCacheType(type: 'site' | 'browser') {
  cacheType.value = type
}

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

async function onConfirm(type: ClearCacheType) {
  console.log('onConfirm:', type)
  try {
    await clearCache(type)
    const text = i18n.t(`cache.type.${type}`)
    showToast(`${i18n.t('cache.cleared')} ${text} ${i18n.t('cache.cache')}.`)
  } catch (e) {
    console.log(e)
    if (e instanceof Error) showToast(e.message, 'danger')
  }
}

function clearCacheClick(type: ClearCacheType) {
  console.log('siteCache:', type)
  console.log('confirm:', options.value?.confirm[type])
  if (options.value?.confirm[type]) {
    confirmModal.value?.show(type)
  } else {
    onConfirm(type)
  }
}
</script>

<template>
  <div id="popupContainer">
    <PanelHeader :icon="false" :close-window="true" :popup-button="false" />

    <PermsCheck :close-window="true" />

    <div class="d-flex gap-4 px-4 my-1">
      <span
        class="badge user-select-none w-100"
        :class="cacheType === 'site' ? 'text-bg-primary' : 'text-bg-secondary'"
        role="button"
        @click="setCacheType('site')"
        >{{ i18n.t('ui.siteCache') }}</span
      >
      <span
        class="badge user-select-none w-100"
        :class="cacheType === 'browser' ? 'text-bg-primary' : 'text-bg-secondary'"
        role="button"
        @click="setCacheType('browser')"
        >{{ i18n.t('ui.browserCache') }}</span
      >
    </div>

    <!--<div class="text-center">-->
    <!--  <div class="form-check form-check-inline">-->
    <!--    <label class="form-check-label">-->
    <!--      <input class="form-check-input" type="radio" name="cacheType" value="site" v-model="cacheType" />-->
    <!--      {{ i18n.t('ui.siteCache') }}-->
    <!--    </label>-->
    <!--  </div>-->
    <!--  <div class="form-check form-check-inline">-->
    <!--    <label class="form-check-label">-->
    <!--      <input class="form-check-input" type="radio" name="cacheType" value="browser" v-model="cacheType" />-->
    <!--      {{ i18n.t('ui.browserCache') }}-->
    <!--    </label>-->
    <!--  </div>-->
    <!--</div>-->

    <!--<div class="text-center">-->
    <!--  <ul class="nav nav-tabs justify-content-center">-->
    <!--    <li class="nav-item">-->
    <!--      <a class="nav-link active" aria-current="page" href="#" @click="setCacheType('site')">Site Cache</a>-->
    <!--    </li>-->
    <!--    <li class="nav-item">-->
    <!--      <a class="nav-link" href="#" @click="setCacheType('browser')">Browser Cache</a>-->
    <!--    </li>-->
    <!--  </ul>-->
    <!--</div>-->

    <div v-if="cacheType === 'site'">
      <div v-if="!siteInfo" class="text-center text-ellipsis border border-danger border-2 rounded p-1 my-1">
        {{ i18n.t('ui.noTabAccess') }}.
      </div>
      <div v-if="siteInfo">
        <div class="row m-0 g-0">
          <div class="col-6 px-1">
            <button class="btn btn-success w-100" @click="clearCacheClick('site')">
              <i class="fa-solid fa-toggle-on me-1"></i> {{ i18n.t('cache.selected') }}
            </button>
          </div>
          <div class="col-6 px-1">
            <button class="btn btn-info w-100" @click="clearCacheClick('siteAll')">
              <i class="fa-solid fa-broom me-1"></i> {{ i18n.t('cache.all') }}
            </button>
          </div>
        </div>

        <HorizontalRule>
          Site Cache Size:
          <span class="text-warning-emphasis fw-bolder">{{ formatBytes(siteInfo.estimate?.usage) }}</span>
        </HorizontalRule>

        <div class="text-center">
          <kbd class="d-inline-block text-ellipsis" role="button" @click="copyText">{{ siteInfo.hostname }}</kbd>
        </div>
      </div>
    </div>

    <div v-if="cacheType === 'browser'" class="row m-0">
      <div class="col-6 px-1">
        <button class="btn btn-warning w-100" @click="clearCacheClick('browser')">
          <i class="fa-solid fa-toggle-on me-1"></i> {{ i18n.t('cache.selected') }}
        </button>
      </div>
      <div class="col-6 px-1">
        <button class="btn btn-danger w-100" @click="clearCacheClick('browserAll')">
          <i class="fa-solid fa-skull-crossbones me-1"></i> {{ i18n.t('cache.all') }}
        </button>
      </div>
    </div>

    <OptionsForm
      :show="[cacheType]"
      subheading="full"
      :heading="false"
      :close-window="true"
      :compact="true"
      ms="2"
      class="overflow-x-hidden"
    />

    <ToastAlerts />

    <ConfirmModal ref="confirmModal" @confirm="onConfirm" />
  </div>
</template>

<style scoped>
#popupContainer {
  width: v-bind(width);
}
</style>
