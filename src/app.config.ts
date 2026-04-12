// https://wxt.dev/guide/essentials/config/runtime.html
// noinspection JSUnusedGlobalSymbols

import { defineAppConfig } from '#imports'

declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    githubUrl: string
    uninstallUrl: string
  }
}

export default defineAppConfig({
  githubUrl: 'https://github.com/smashedr/cache-cleaner', // TODO: UPDATE BEFORE MERGE
  uninstallUrl: 'https://cssnr.github.io/feedback/?name=cache-cleaner',
})
