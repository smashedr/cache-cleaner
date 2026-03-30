export const defaultOptions = {
  autoReload: true,
  showAllButtons: false,
  showConfirmation: true,
  showDeprecated: false,
  contextMenu: true,
  showUpdate: false,

  confirm: {
    site: false,
    siteAll: true,
    browser: true,
    browserAll: true,
  },

  site: {
    cookies: false,
    indexedDB: true,
    localStorage: true,
    serviceWorkers: true,
    cacheStorage: true,
    fileSystems: true,
    webSQL: true,
  },

  browser: {
    cookies: false,
    fileSystems: true,
    indexedDB: true,
    localStorage: false,
    serviceWorkers: true,
    cacheStorage: true,
    webSQL: true,

    appcache: true,
    cache: true,
    downloads: true,
    formData: false,
    history: false,
    passwords: false,
    pluginData: false,
  },

  ctx: {
    site: true,
    siteAll: true,
    browser: false,
    browserAll: false,
    options: true,
    popup: true,
    sidepanel: true,
  },
}

export type Options = typeof defaultOptions & { [key: string]: unknown }

export async function getOptions(): Promise<Options> {
  let { options } = await chrome.storage.sync.get(['options'])
  options = options || {}
  return options as Options
}

// NOTE: This is a WIP to replace the VanillaJS saveOptions
export async function saveKeyValue(key: string, value: unknown, subkey?: string) {
  console.debug(`saveKeyValue: ${key}/${subkey}:`, value)
  if (!key || value === undefined) return

  const options = await getOptions()
  console.log('options:', options)

  if (subkey) {
    const nested = options[subkey] as Record<string, unknown>
    console.log('options[subkey][key]:', nested[key])
    if (nested?.[key] === value) return
    options[subkey] = { ...nested, [key]: value }
    console.log(`Set %c options[${subkey}][${key}]:`, 'color: Lime', value)
  } else {
    console.log('options[key]:', options[key])
    if (options[key] === value) return
    options[key] = value
    console.log(`Set %c${key}:`, 'color: Lime', value)
  }
  console.log('%c chrome.storage.sync.set', 'color: Yellow')
  await chrome.storage.sync.set({ options })
}
