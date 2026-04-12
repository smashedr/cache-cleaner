import { useAppConfig } from '#imports'

export function useTitle(page: string) {
  const config = useAppConfig()
  console.log('config:', config)
  document.title = `${config.name} ${page}`
}
