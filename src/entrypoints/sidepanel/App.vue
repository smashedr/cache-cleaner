<script setup lang="ts">
import { provide } from 'vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PanelFooter from '@/components/PanelFooter.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import FlushView from '@/components/FlushView.vue'
import { openPopup } from '@/utils/extension.ts'

console.debug('%c sidepanel/App.vue', 'color: Lime')

provide('siteInfo', undefined)
</script>

<template>
  <header class="flex-shrink-0">
    <PanelHeader :side-button="false" />
  </header>

  <main class="flex-grow-1 overflow-auto">
    <div class="d-grid gap-2 m-2">
      <FlushView cache-type="browser" :show-site="false" class="row-gap-2" />
      <button class="btn btn-success" @click="openPopup()">
        <i class="fa-solid fa-window-maximize"></i> {{ i18n.t('ui.text.siteCache') }}
      </button>
    </div>
    <OptionsForm :compact="true" />
  </main>

  <footer class="flex-shrink-0">
    <PanelFooter />
  </footer>

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
