import { Options } from '@/utils/options.ts'

const config = {
  cache: {
    site: ['all'],
    siteAll: ['all'],
    browser: ['all'],
    browserAll: ['all'],
  },
  extension: {
    options: ['all'],
    popup: ['all'],
    sidepanel: ['all'],
  },
}

export async function createContextMenus(ctx: Options['ctx']) {
  console.debug('createContextMenus:', ctx)
  if (!chrome.contextMenus) {
    return console.debug('Skipping: chrome.contextMenus')
  }

  // await chrome.contextMenus.removeAll()

  const contexts: chrome.contextMenus.CreateProperties[] = []

  for (const [key, value] of Object.entries(config['cache'])) {
    addContextMenuItem(contexts, ctx, key, value)
  }

  if (contexts.length) contexts.push({ type: 'separator', id: crypto.randomUUID() })
  let length = contexts.length

  for (const [key, value] of Object.entries(config['extension'])) {
    addContextMenuItem(contexts, ctx, key, value)
  }

  if (length == contexts.length) contexts.pop()

  console.debug(`contexts: ${contexts.length}:`, contexts)

  chrome.contextMenus.removeAll().then(() => {
    contexts.forEach((item) => chrome.contextMenus.create(item))
  })
}

function addContextMenuItem(
  contexts: chrome.contextMenus.CreateProperties[],
  ctx: Options['ctx'],
  key: string,
  value: unknown,
): boolean {
  const ctxKey = key as keyof Options['ctx']
  // console.log('options.ctx[ctxKey]:', ctx[ctxKey])
  if (!ctx[ctxKey]) return false
  // console.log('%c add item:', 'color: SpringGreen', ctxKey)
  contexts.push({
    id: key,
    contexts: value as chrome.contextMenus.CreateProperties['contexts'],
    title: i18n.t(`ctx.${key}.label` as any),
  })
  return true
}
