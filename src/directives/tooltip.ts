import { Tooltip } from 'bootstrap'
import type { ObjectDirective } from 'vue'

const tooltipDirective: ObjectDirective = {
  mounted(el: HTMLElement) {
    new Tooltip(el) // NOSONAR
  },
  unmounted(el: HTMLElement) {
    Tooltip.getInstance(el)?.dispose()
  },
}

// noinspection JSUnusedGlobalSymbols
export default tooltipDirective
