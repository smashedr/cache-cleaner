<script setup lang="ts">
import ToastAlerts from '@/components/ToastAlerts.vue'
import BackToTop from '@/components/BackToTop.vue'
import PanelHeader from '@/components/PanelHeader.vue'
import PanelFooter from '@/components/PanelFooter.vue'
import PermsCheck from '@/components/PermsCheck.vue'
import FlushView from '@/components/FlushView.vue'
import FlushSwitch from '@/components/FlushSwitch.vue'
import FlushOptions from '@/components/FlushOptions.vue'

console.debug('%c sidepanel/App.vue', 'color: Lime')

const cacheType = ref<'site' | 'browser'>('browser')
</script>

<template>
  <header class="flex-shrink-0">
    <PanelHeader :side-button="false" />
  </header>

  <main class="flex-grow-1 overflow-auto p-1">
    <div class="d-grid gap-2">
      <PermsCheck />
      <!--<OptionsForm :compact="true" class="p-1" />-->
    </div>

    <FlushView cache-type="browser" :show-site="false" />
    <FlushSwitch :cache-type="cacheType" @change="(value) => (cacheType = value)" />
    <FlushOptions :cache-type="cacheType" :site-heading="true" />
  </main>

  <footer class="flex-shrink-0">
    <PanelFooter />
  </footer>

  <ToastAlerts />
  <BackToTop />
</template>

<!--<style scoped></style>-->
