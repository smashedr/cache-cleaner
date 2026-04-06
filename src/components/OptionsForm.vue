<!--suppress JSUnusedLocalSymbols -->
<script setup lang="ts">
import { i18n } from '#imports'
import { isFirefox } from '@/utils/system.ts'
import { useOptions } from '@/composables/useOptions.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'
import FormSwitch from '@/components/FormSwitch.vue'

withDefaults(
  defineProps<{
    compact?: boolean
    heading?: boolean
    ms?: '0' | '1' | '2' | '3' | '4' | '5' // TODO: Fix this logic
    subheading?: 'short' | 'full'
    show?: string[]
    extension?: string[]
  }>(),
  {
    compact: false,
    heading: true,
    ms: '0',
    subheading: 'short',
    show: () => ['site', 'browser', 'extension'],
    extension: () => [
      'autoReload',
      'showAllButtons',
      'showConfirmation',
      'contextMenu',
      'showDeprecated',
      'showUpdate',
    ],
  },
)

const options = useOptions()

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

const deprecated = ['passwords', 'pluginData']
const ffExcludes = ['fileSystems', 'webSQL']
const ffExcludesAll = [...ffExcludes, 'cacheStorage']
</script>

<template>
  <form v-if="options">
    <template v-if="options?.site && show.includes('site')">
      <HorizontalRule v-if="heading">Site Specific Settings</HorizontalRule>
      <template v-for="id in siteKeys" :key="id">
        <!--<p v-for="key in siteKeys">{{ key }}</p>-->
        <FormSwitch
          v-if="!(isFirefox && ffExcludes.includes(id))"
          v-model="options['site'][id]"
          :id="id"
          subkey="site"
          :class="`ms-${ms}`"
        />
      </template>
    </template>

    <template v-if="options?.browser && show.includes('browser')">
      <HorizontalRule v-if="heading">Global Browser Settings</HorizontalRule>

      <div v-if="subheading === 'short'">All Sites:</div>
      <HorizontalRule v-if="subheading === 'full'">All Sites</HorizontalRule>

      <template v-for="id in allSiteKeys" :key="id">
        <!--<p v-for="key in allSiteKeys">{{ key }}</p>-->
        <FormSwitch
          v-if="!(isFirefox && ffExcludesAll.includes(id))"
          v-model="options['site'][id]"
          :id="id"
          subkey="site"
          :class="'col-12' + `${subheading === 'short' ? ' ms-2' : ` ms-${ms}`}`"
        />
      </template>

      <div v-if="subheading === 'short'">Browser:</div>
      <HorizontalRule v-if="subheading === 'full'">Browser</HorizontalRule>

      <template v-for="id in allBrowserKeys" :key="id">
        <FormSwitch
          v-if="!deprecated.includes(id) || options.showDeprecated"
          v-model="options['browser'][id]"
          :id="id"
          subkey="browser"
          :class="'col-12' + `${subheading === 'short' ? ' ms-2' : ` ms-${ms}`}`"
        />
      </template>
    </template>

    <template v-if="show.includes('extension')">
      <HorizontalRule v-if="heading">{{ i18n.t('options.extension') }}</HorizontalRule>
      <div class="row m-0">
        <template v-for="id in extension" :key="id">
          <FormSwitch v-model="options[id]" :id="id" :class="{ 'col-12': true }" />

          <Transition name="fade">
            <div v-if="id === 'contextMenu' && options['contextMenu']">
              <!--TODO: Loop through a consistent list and not options keys-->
              <FormSwitch
                v-for="(_, id) in options.ctx"
                :key="id"
                v-model="options['ctx'][id]"
                :id="id"
                subkey="ctx"
                :label="i18n.t(`ctx.${id}.label` as any)"
                :tooltip="i18n.t(`ctx.${id}.tip` as any)"
                :class="{ 'col-12': true, 'ms-2': true }"
              />
            </div>
          </Transition>

          <Transition name="fade">
            <div v-if="id === 'showConfirmation' && options['showConfirmation']">
              <!--TODO: Loop through a consistent list and not options keys-->
              <FormSwitch
                v-for="(_, id) in options.confirm"
                :key="id"
                v-model="options['confirm'][id]"
                :id="id"
                subkey="confirm"
                :label="i18n.t(`confirm.${id}.label` as any)"
                :tooltip="i18n.t(`confirm.${id}.tip` as any)"
                :class="{ 'col-12': true, 'ms-2': true }"
              />
            </div>
          </Transition>
        </template>
      </div>
    </template>
  </form>
</template>

<!--<style scoped></style>-->
