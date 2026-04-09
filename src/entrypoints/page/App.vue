<script setup lang="ts">
import { i18n } from '#imports'
import { provide } from 'vue'
import { useTitle } from '@/composables/useTitle.ts'
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import OptionsOffscreen from '@/components/OptionsOffscreen.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import FlushView from '@/components/FlushView.vue'

console.debug('%c page/App.vue', 'color: Lime')

useTitle(i18n.t('page.title'))

provide('siteInfo', undefined)
</script>

<template>
  <header class="flex-shrink-0">
    <PanelHeader />
  </header>

  <main class="flex-grow-1 overflow-auto">
    <div class="container-fluid p-3 h-100">
      <FlushView cache-type="browser" :show-site="false" />
      <OptionsForm class="p-2" />
    </div>
  </main>

  <footer class="flex-shrink-0">
    <hr class="my-0" />
    <PageFooter class="m-3" />
  </footer>

  <OptionsOffscreen />

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
