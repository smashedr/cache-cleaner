<script setup lang="ts">
withDefaults(
  defineProps<{
    cacheType?: 'site' | 'browser'
  }>(),
  {
    cacheType: 'site',
  },
)

const emit = defineEmits(['change'])
</script>

<template>
  <div class="d-flex gap-4 px-4 my-1">
    <span
      class="badge user-select-none w-100 px-0"
      :class="cacheType === 'site' ? 'text-bg-primary' : 'text-bg-secondary'"
      role="button"
      @click="emit('change', 'site')"
      >{{ i18n.t('ui.text.siteCache') }}</span
    >
    <span
      class="badge user-select-none w-100 px-0"
      :class="cacheType === 'browser' ? 'text-bg-primary' : 'text-bg-secondary'"
      role="button"
      @click="emit('change', 'browser')"
      >{{ i18n.t('ui.text.browserCache') }}</span
    >
  </div>
</template>

<!--<style scoped></style>-->
