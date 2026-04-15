import { type Options } from '@/utils/options.ts'

export function processUpdate(
  options: Options,
  version: string,
  previous: string | undefined,
) {
  console.log('processUpdate:', options)
  console.log('version:', version)
  console.log('previous:', previous)

  if (
    previous !== undefined &&
    compareSemver(previous, '1.0.0') < 0 &&
    compareSemver(version, '1.0.0') >= 0
  ) {
    upgrade100(options)
  }
}

function upgrade100(options: Options) {
  console.log('%c--- Processing v1.0.0 Upgrade ---', 'color: Yellow')
  let changed
  if ('enable' in options.ctx) {
    console.log('Deleting: options.ctx.enable:', options.ctx.enable)
    delete options.ctx.enable
    changed = true
  }
  console.log('changed:', changed)
  if (changed) {
    chrome.storage.sync
      .set({ options })
      .then(() => console.log('%cUpdated Options', 'color: Lime'))
      .catch(console.error)
  }
}

function compareSemver(a: string, b: string): number {
  const pa = a.split('.').map(Number)
  const pb = b.split('.').map(Number)

  for (let i = 0; i < 3; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}
