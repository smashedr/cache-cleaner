<script setup lang="ts">
import OptionsForm from '@/components/OptionsForm.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'

withDefaults(
  defineProps<{
    cacheType?: 'site' | 'browser'
    siteHeading?: boolean
  }>(),
  {
    cacheType: 'site',
    siteHeading: false,
  },
)
</script>

<template>
  <HorizontalRule v-if="cacheType === 'site' && siteHeading">Site Specific Settings</HorizontalRule>
  <OptionsForm
    v-show="cacheType === 'site'"
    :show="['extension']"
    :extension="['autoReload']"
    subheading="full"
    :heading="false"
    :close-window="true"
    :compact="true"
    class="ms-2"
  />

  <OptionsForm
    :show="[cacheType]"
    subheading="full"
    :heading="false"
    :close-window="true"
    :compact="true"
    ms="2"
    class="overflow-x-hidden"
  />
</template>

<!--<style scoped></style>-->
