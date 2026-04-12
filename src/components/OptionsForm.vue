<!--suppress JSUnusedLocalSymbols -->
<script setup lang="ts">
import { i18n } from '#imports'
import { isFirefox } from '@/utils/system.ts'
import { useOptions } from '@/composables/useOptions.ts'
import HorizontalRule from '@/components/HorizontalRule.vue'
import FormSwitch from '@/components/FormSwitch.vue'

const props = withDefaults(
  defineProps<{
    compact?: boolean
    heading?: boolean
    subPadding?: string

    browserHeading?: 'short' | 'full'
    browserClass?: string

    show?: string[]
    extension?: string[]
  }>(),
  {
    compact: false,
    heading: true,
    subPadding: '66',
    browserHeading: 'short',
    browserClass: 'ms-0',
    show: () => ['site', 'browser', 'extension'],
    extension: () => [
      'autoReload',
      'showAllButtons',
      'popupBrowser',
      'showConfirmation',
      'contextMenu',
      'showDeprecated',
      'showUpdate',
    ],
  },
)

const options = useOptions()

const extensionKeys = computed(() => props.extension.filter((ext) => ext !== 'contextMenu' || !!chrome?.contextMenus))

const siteKeys = computed(() => Object.keys(options.value?.site)) // Site

const browserKeys = computed(() => Object.keys(options.value?.browser))
const allSiteKeys = computed(() => browserKeys.value.slice(0, 7)) // Browser - Site
const allBrowserKeys = computed(() => browserKeys.value.slice(-7)) // Browser - Browser

const deprecated = ['passwords', 'pluginData']
const ffExcludes = ['fileSystems', 'webSQL']
const ffExcludesAll = [...ffExcludes, 'cacheStorage']
</script>

<template>
  <form v-if="options">
    <template v-if="options?.site && show.includes('site')">
      <HorizontalRule v-if="heading" class="my-2">{{ i18n.t('options.form.siteSpecific') }}</HorizontalRule>
      <div class="px-2">
        <template v-for="id in siteKeys" :key="id">
          <FormSwitch
            v-if="!(isFirefox && ffExcludes.includes(id))"
            v-model="(options['site'] as Record<string, boolean>)[id]"
            :id="id"
            subkey="site"
          />
        </template>
      </div>
    </template>

    <template v-if="options?.browser && show.includes('browser')">
      <HorizontalRule v-if="heading" class="my-2">{{ i18n.t('options.form.globalBrowser') }}</HorizontalRule>

      <div v-if="browserHeading === 'short'" class="ms-2">{{ i18n.t('options.form.allSites') }}:</div>
      <HorizontalRule v-if="browserHeading === 'full'">{{ i18n.t('options.form.allSites') }}</HorizontalRule>

      <div class="px-2">
        <template v-for="id in allSiteKeys" :key="id">
          <FormSwitch
            v-if="!(isFirefox && ffExcludesAll.includes(id))"
            v-model="(options['browser'] as Record<string, boolean>)[id]"
            :id="id"
            subkey="browser"
            class="col-12"
            :class="browserClass"
          />
        </template>
      </div>

      <div v-if="browserHeading === 'short'" class="ms-2">{{ i18n.t('options.form.browser') }}:</div>
      <HorizontalRule v-if="browserHeading === 'full'">{{ i18n.t('options.form.browser') }}</HorizontalRule>

      <div class="px-2">
        <template v-for="id in allBrowserKeys" :key="id">
          <FormSwitch
            v-if="!deprecated.includes(id) || options.showDeprecated"
            v-model="(options['browser'] as Record<string, boolean>)[id]"
            :id="id"
            subkey="browser"
            class="col-12"
            :class="browserClass"
          />
        </template>
      </div>
    </template>

    <template v-if="show.includes('extension')">
      <HorizontalRule v-if="heading" class="my-2">{{ i18n.t('options.extension') }}</HorizontalRule>
      <div class="px-2">
        <template v-for="id in extensionKeys" :key="id">
          <FormSwitch v-model="options[id]" :id="id" class="col-12" />

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
                class="col-12"
                :padding="subPadding"
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
                class="col-12"
                :padding="subPadding"
              />
            </div>
          </Transition>
        </template>
      </div>
    </template>
  </form>
</template>

<!--<style scoped></style>-->
