import { onMounted, ref } from 'vue'

export function useSiteInfo(enabled = true) {
  const siteInfo = ref<SiteInfo | undefined>(undefined)

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

  async function updateTab() {
    if (!enabled) return
    const result = await checkTab()
    console.log('%cupdateTab:', `color: ${result ? 'Lime' : 'Yellow'}`, result)
    if (!result) return
    siteInfo.value = result
  }

  onMounted(async () => {
    await updateTab()
  })

  return { siteInfo, updateTab }
}
