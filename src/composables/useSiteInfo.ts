import { ref, onMounted } from 'vue'

export function useSiteInfo(enabled = true) {
  const tabAccess = ref<SiteInfo | undefined>(undefined)

  async function getInfo(): Promise<SiteInfo> {
    return {
      hostname: window.location.hostname,
      estimate: await navigator.storage?.estimate(),
    }
  }

  async function checkTab(): Promise<SiteInfo | undefined> {
    try {
      const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })
      console.log('tab:', tab)
      if (!tab.id) return
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        injectImmediately: true,
        func: getInfo,
      })
      console.log('results:', results)
      return results[0]?.result
    } catch (e) {
      if (e instanceof Error) console.log(e.message)
    }
  }

  onMounted(async () => {
    console.log('window.location.href:', window.location.href)
    if (!enabled) return
    const result = await checkTab()
    console.log('%c checkTab:', `color: ${result ? 'Lime' : 'Red'}`, result)
    tabAccess.value = result
  })

  // return { tabAccess, checkTab }
  return tabAccess
}
