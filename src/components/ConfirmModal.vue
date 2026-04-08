<script setup lang="ts">
import { i18n } from '#imports'
import { ref } from 'vue'
import { Modal } from 'bootstrap'
import { ClearCacheType } from '@/utils/cache.ts'

type ModalConfig = {
  iconClass: string
  btnClass: string
  text: string
}

const modalEl = ref(null)
const modalConfig = ref<ModalConfig | null>(null)
const clearCacheType = ref<ClearCacheType | null>(null)

const emit = defineEmits(['confirm'])

function show(type: ClearCacheType) {
  if (!modalEl.value) return
  console.log('show:', type)
  clearCacheType.value = type
  modalConfig.value = resolveConfig(type)
  console.log('modalConfig.value:', modalConfig.value)
  Modal.getOrCreateInstance(modalEl.value).show()
}

function resolveConfig(type: ClearCacheType): ModalConfig {
  const config: Partial<ModalConfig> = { text: i18n.t(`ui.cache.type.${type}`) }
  const isAll = type.endsWith('All')
  if (type.startsWith('site')) {
    config.iconClass = isAll ? 'fa-broom' : 'fa-toggle-on'
    config.btnClass = isAll ? 'btn-info' : 'btn-success'
  } else {
    config.iconClass = isAll ? 'fa-skull-crossbones' : 'fa-toggle-on'
    config.btnClass = isAll ? 'btn-danger' : 'btn-warning'
  }
  return config as ModalConfig
}

function hide() {
  if (!modalEl.value) return
  console.log('hide:')
  Modal.getInstance(modalEl.value)?.hide()
}

function handleConfirm() {
  emit('confirm', clearCacheType.value)
  hide()
}

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <div class="modal fade" ref="modalEl" tabindex="-1" aria-labelledby="delete-modal-label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-truncate" id="delete-modal-label">
              {{ i18n.t('ui.cache.clear') }} {{ modalConfig?.text }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              :aria-label="i18n.t('ui.action.close')"
              tabindex="-1"
            ></button>
          </div>
          <div class="modal-body text-center p-2">
            <button type="button" class="btn w-100 mt-2" :class="modalConfig?.btnClass" @click="handleConfirm">
              <i class="fa-solid ms-2" :class="modalConfig?.iconClass"></i> {{ i18n.t('ui.cache.clear') }}
              {{ modalConfig?.text }} {{ i18n.t('ui.cache.cache') }}
            </button>
          </div>
          <div class="modal-footer p-2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              {{ i18n.t('ui.action.cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<!--<style scoped></style>-->
