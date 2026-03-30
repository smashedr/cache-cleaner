<script setup lang="ts">
import { i18n } from '#imports'
import { openOptions } from '@/utils/extension.ts'
import OptionsForm from '@/components/OptionsForm.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#optionsModal" v-bind="$attrs">
    <slot />
  </button>

  <div class="modal fade" id="optionsModal" tabindex="-1" aria-labelledby="optionsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header p-2">
          <ThemeSwitch />
          <div class="ms-2" id="optionsModalLabel">{{ i18n.t('options.quickOptions') }}</div>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="i18n.t('ui.action.close')"
          ></button>
        </div>

        <div class="modal-body py-2">
          <OptionsForm
            :extension="['autoReload', 'showAllButtons', 'showDeprecated', 'showConfirmation']"
            :compact="true"
            :show="['extension']"
            :heading="false"
          />
        </div>

        <div class="modal-footer p-0">
          <button type="button" class="btn btn-sm btn-secondary me-auto" data-bs-dismiss="modal">
            {{ i18n.t('ui.action.close') }}
          </button>
          <button type="button" class="btn btn-sm btn-primary" @click="openOptions(true)">
            <i class="fa-solid fa-gears me-2"></i> {{ i18n.t('options.moreOptions') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<style scoped></style>-->
