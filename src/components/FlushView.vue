<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { showToast } from '@/composables/useToast.ts'
import { useOptions } from '@/composables/useOptions.ts'
import { clearCache, type ClearCacheType } from '@/utils/cache.ts'
import ConfirmModal from '@/components/ConfirmModal.vue'

const siteInfo = inject<Ref<SiteInfo | undefined>>('siteInfo')

withDefaults(
  defineProps<{
    cacheType?: 'site' | 'browser'
    showSite?: boolean
  }>(),
  {
    cacheType: 'site',
    showSite: true,
  },
)

const options = useOptions()
const confirmModal = ref<InstanceType<typeof ConfirmModal> | null>(null)

async function onConfirm(type: ClearCacheType) {
  console.log('onConfirm:', type)
  try {
    await clearCache(type)
    const text = i18n.t(`ui.cache.type.${type}`)
    showToast(`${i18n.t('ui.cache.cleared')} ${text} ${i18n.t('ui.cache.cache')}.`)
  } catch (e) {
    console.log(e)
    if (e instanceof Error) showToast(e.message, 'danger')
  }
}

function clearCacheClick(type: ClearCacheType) {
  console.log('siteCache:', type)
  console.log('confirm:', options.value?.confirm[type])
  if (options.value.showConfirmation && options.value?.confirm[type]) {
    confirmModal.value?.show(type)
  } else {
    onConfirm(type)
  }
}
</script>

<template>
  <div v-if="cacheType === 'browser' || options.showAllButtons" class="row m-0 my-1">
    <div class="px-1" :class="showSite ? 'col-6' : 'col-12 my-1'">
      <button class="btn btn-warning text-truncate w-100 px-1" @click="clearCacheClick('browser')">
        <i class="fa-solid fa-toggle-on me-1"></i> {{ i18n.t('ui.cache.type.browser') }}
      </button>
    </div>
    <div class="px-1" :class="showSite ? 'col-6' : 'col-12 my-1'">
      <button class="btn btn-danger text-truncate w-100 px-1" @click="clearCacheClick('browserAll')">
        <i class="fa-solid fa-skull-crossbones me-1"></i> {{ i18n.t('ui.cache.type.browserAll') }}
      </button>
    </div>
  </div>

  <div v-if="showSite && (cacheType === 'site' || options.showAllButtons)">
    <div class="row m-0 g-0 my-1">
      <div class="col-6 px-1">
        <button
          class="btn btn-success text-truncate w-100 px-1"
          :class="{ disabled: !siteInfo }"
          @click="clearCacheClick('site')"
        >
          <i class="fa-solid fa-toggle-on me-1"></i> {{ i18n.t('ui.cache.type.site') }}
        </button>
      </div>
      <div class="col-6 px-1">
        <button
          class="btn btn-info text-truncate w-100 px-1"
          :class="{ disabled: !siteInfo }"
          @click="clearCacheClick('siteAll')"
        >
          <i class="fa-solid fa-broom me-1"></i> {{ i18n.t('ui.cache.type.siteAll') }}
        </button>
      </div>
    </div>
  </div>

  <ConfirmModal ref="confirmModal" @confirm="onConfirm" />
</template>

<!--<style scoped></style>-->
