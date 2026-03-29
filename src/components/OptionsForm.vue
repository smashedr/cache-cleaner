<!--suppress JSUnusedLocalSymbols -->
<script setup lang="ts">
import { i18n } from '#imports'
import { isFirefox } from '@/utils/system.ts'
import { saveKeyValue } from '@/utils/options.ts'
import { useOptions } from '@/composables/useOptions.ts'
import FormSwitch from '@/components/FormSwitch.vue'
import HorizontalRule from '@/components/HorizontalRule.vue'

withDefaults(
  defineProps<{
    compact?: boolean
    heading?: boolean
    ms?: '0' | '1' | '2' | '3' | '4' | '5' // TODO: Fix this logic
    subheading?: 'short' | 'full'
    show?: string[]
  }>(),
  {
    compact: false,
    heading: true,
    ms: '0',
    subheading: 'short',
    show: () => ['site', 'browser', 'extension'],
  },
)

const options = useOptions()

const switches = ['autoReload', 'showConfirmation', 'contextMenu', 'showUpdate']

// const siteKeys = computed(() => Object.keys(options.value?.site))
// const browserKeys = computed(() => Object.keys(options.value?.browser))
// const allSiteKeys = computed(() => browserKeys.value.slice(0, 7))
// const allBrowserKeys = computed(() => browserKeys.value.slice(-7))

// The reason I dont like typescript...
const siteKeys = [
  'cookies',
  'indexedDB',
  'localStorage',
  'serviceWorkers',
  'cacheStorage',
  'fileSystems',
  'webSQL',
] as const
const allSiteKeys = [
  'cookies',
  'fileSystems',
  'indexedDB',
  'localStorage',
  'serviceWorkers',
  'cacheStorage',
  'webSQL',
] as const
const allBrowserKeys = ['appcache', 'cache', 'downloads', 'formData', 'history', 'passwords', 'pluginData'] as const

const ffExcludes = ['fileSystems', 'webSQL']
const ffExcludesAll = [...ffExcludes, 'cacheStorage']
</script>

<template>
  <form v-if="options">
    <template v-if="options?.site && show.includes('site')">
      <HorizontalRule v-if="heading">Site Specific Settings</HorizontalRule>
      <template v-for="key in siteKeys" :key="key">
        <!--<p v-for="key in siteKeys">{{ key }}</p>-->
        <FormSwitch
          v-if="!(isFirefox && ffExcludes.includes(key))"
          :pk="key"
          subkey="site"
          :value="options?.site[key]"
          :label="i18n.t(`option.site.${key}.label` as any)"
          :tooltip="i18n.t(`option.site.${key}.label` as any)"
          :class="`ms-${ms}`"
          @change="saveKeyValue"
        />
      </template>
    </template>

    <template v-if="options?.browser && show.includes('browser')">
      <HorizontalRule v-if="heading">Global Browser Settings</HorizontalRule>

      <div v-if="subheading === 'short'">All Sites:</div>
      <HorizontalRule v-if="subheading === 'full'">All Sites</HorizontalRule>

      <template v-for="key in allSiteKeys" :key="key">
        <!--<p v-for="key in allSiteKeys">{{ key }}</p>-->
        <FormSwitch
          v-if="!(isFirefox && ffExcludesAll.includes(key))"
          :pk="key"
          subkey="browser"
          :value="options?.browser[key]"
          :label="i18n.t(`option.browser.${key}.label` as any)"
          :tooltip="i18n.t(`option.browser.${key}.label` as any)"
          :class="'col-12' + `${subheading === 'short' ? ' ms-2' : ` ms-${ms}`}`"
          @change="saveKeyValue"
        />
      </template>

      <div v-if="subheading === 'short'">Browser:</div>
      <HorizontalRule v-if="subheading === 'full'">Browser</HorizontalRule>

      <FormSwitch
        v-for="key in allBrowserKeys"
        :key="key"
        :pk="key"
        subkey="browser"
        :value="options?.browser[key]"
        :label="i18n.t(`option.browser.${key}.label` as any)"
        :tooltip="i18n.t(`option.browser.${key}.label` as any)"
        :class="'col-12' + `${subheading === 'short' ? ' ms-2' : ` ms-${ms}`}`"
        @change="saveKeyValue"
      />
    </template>

    <template v-if="show.includes('extension')">
      <HorizontalRule v-if="heading">{{ i18n.t('options.extension') }}</HorizontalRule>
      <div class="row m-0">
        <template v-for="key in switches" :key="key">
          <FormSwitch
            :pk="key"
            :value="!!options[key]"
            :label="i18n.t(`option.toggle.${key}.label` as any)"
            :tooltip="i18n.t(`option.toggle.${key}.tip` as any)"
            :class="{ 'col-12': true }"
            @change="saveKeyValue"
          />

          <Transition name="fade">
            <div v-if="key === 'contextMenu' && options['contextMenu']">
              <!--TODO: Loop through a consistent list and not options keys-->
              <FormSwitch
                v-for="(_, key) in options.ctx"
                :key="key"
                subkey="ctx"
                :pk="key"
                :value="options.ctx[key] as boolean"
                :label="i18n.t(`ctx.${key}.tip` as any)"
                :tooltip="i18n.t(`ctx.${key}.label` as any)"
                :class="{ 'col-12': true, 'ms-2': true }"
                @change="saveKeyValue"
              />
            </div>
          </Transition>

          <Transition name="fade">
            <div v-if="key === 'showConfirmation' && options['showConfirmation']">
              <!--TODO: Loop through a consistent list and not options keys-->
              <FormSwitch
                v-for="(_, key) in options.confirm"
                :key="key"
                subkey="confirm"
                :pk="key"
                :value="options.confirm[key] as boolean"
                :label="i18n.t(`confirm.${key}.label` as any)"
                :tooltip="i18n.t(`confirm.${key}.tip` as any)"
                :class="{ 'col-12': true, 'ms-2': true }"
                @change="saveKeyValue"
              />
            </div>
          </Transition>
        </template>
      </div>
    </template>
  </form>
</template>

<!--<style scoped></style>-->
