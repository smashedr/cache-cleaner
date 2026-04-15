import { useAppConfig } from '#imports'

export function useTitle(page: string) {
  const config = useAppConfig()
  document.title = `${config.name} ${page}`
}
