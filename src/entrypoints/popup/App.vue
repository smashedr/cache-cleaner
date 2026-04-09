<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { isMobile } from '@/utils/system.ts'
import { useSiteInfo } from '@/composables/useSiteInfo.ts'
import ToastAlerts from '@/components/ToastAlerts.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import FlushView from '@/components/FlushView.vue'
import FlushSwitch from '@/components/FlushSwitch.vue'
import FlushOptions from '@/components/FlushOptions.vue'
import SiteView from '@/components/SiteView.vue'

console.debug('%c popup/App.vue', 'color: Lime')

const siteInfo = useSiteInfo()
provide('siteInfo', siteInfo)

const cacheType = ref<'site' | 'browser'>('site')

// TODO: Determine better method to set popup width
// const isBrowser = isFirefox ? '340px' : null
const width = computed(() => (isMobile ? '100%' : '360px'))
console.log('width:', width.value)
</script>

<template>
  <div id="popupContainer">
    <PanelHeader :icon="false" :close-window="true" :popup-button="false" />

    <FlushView :cache-type="cacheType" pad-x="px-1" class="row-gap-1 my-1" />
    <FlushSwitch :cache-type="cacheType" @change="(value) => (cacheType = value)" />
    <SiteView v-if="cacheType === 'site'" class="mx-2" />
    <FlushOptions :cache-type="cacheType" />

    <ToastAlerts />
  </div>
</template>

<style scoped>
#popupContainer {
  width: v-bind(width);
}
</style>
