<script setup lang="ts">
import { computed } from 'vue'
import { isMobile } from '@/utils/system.ts'
import ToastAlerts from '@/components/ToastAlerts.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PermsCheck from '@/components/PermsCheck.vue'
import PopupView from '@/components/PopupView.vue'

console.debug('%c popup/App.vue', 'color: Lime')

// TODO: Determine better method to set popup width
// const isBrowser = isFirefox ? '340px' : null
const width = computed(() => (isMobile ? '100%' : '360px'))
console.log('width:', width.value)
</script>

<template>
  <div id="popupContainer">
    <PanelHeader :icon="false" :close-window="true" :popup-button="false" />

    <PermsCheck :close-window="true" />

    <PopupView />

    <ToastAlerts />
  </div>
</template>

<style scoped>
#popupContainer {
  width: v-bind(width);
}
</style>
