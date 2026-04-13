<script setup lang="ts">
import { i18n, useAppConfig } from '#imports'
import { clickOpen } from '@/utils/extension.ts'
import { useTitle } from '@/composables/useTitle.ts'
import { useBackground } from '@/composables/useBackground.ts'
import BackToTop from '@/components/BackToTop.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import OptionsForm from '@/components/OptionsForm.vue'
import KeyboardShortcuts from '@/components/KeyboardShortcuts.vue'
import PageFooter from '@/components/PageFooter.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'
import CopySupport from '@/components/CopySupport.vue'
import BackgroundForm from '@/components/BackgroundForm.vue'

console.debug('%c options/App.vue', 'color: Lime')

useTitle(i18n.t('options.title'))

useBackground()

const config = useAppConfig()
console.log('config:', config)
</script>

<template>
  <div class="d-flex align-items-center justify-content-center h-100 w-100 p-1 p-md-3">
    <div class="m-auto pb-4 w-100">
      <div id="options-wrapper" class="glass-outline rounded rounded-3 w-100 m-auto p-2 p-md-3">
        <div class="d-flex flex-row justify-content-center align-items-center">
          <img :src="'/icons/48.png'" class="me-1" height="48" width="48" :alt="config.name" :title="config.name" />
          <div>
            <a
              class="link-body-emphasis text-decoration-none fs-1"
              :title="i18n.t('ui.text.homePage')"
              :href="config.githubUrl"
              target="_blank"
              rel="nofollow"
              @click.prevent="clickOpen"
            >
              {{ config.name }}</a
            >
            <a
              class="link-body-emphasis text-decoration-none small"
              :title="i18n.t('ui.text.releaseNotes')"
              :href="`${config.githubUrl}/releases/tag/${config.version}`"
              target="_blank"
              rel="nofollow"
              @click.prevent="clickOpen"
            >
              v<span class="version">{{ config.version }}</span></a
            >
          </div>
        </div>

        <KeyboardShortcuts />

        <OptionsForm browser-class="ms-2" />

        <HorizontalRule class="my-3">{{ i18n.t('options.optionsBackground') }}</HorizontalRule>
        <BackgroundForm />

        <CopySupport
          class="fst-italic small my-4"
          :message="i18n.t('options.copySupportMsg')"
          :tip="i18n.t('options.copySupportTip')"
          >{{ i18n.t('options.copySupport') }}</CopySupport
        >

        <hr class="my-2 my-md-3" />

        <PageFooter />
      </div>
      <!-- #options-wrapper -->
    </div>
  </div>

  <ToastAlerts />
  <BackToTop />
</template>

<style scoped>
#options-wrapper {
  max-width: 576px;
}
</style>
