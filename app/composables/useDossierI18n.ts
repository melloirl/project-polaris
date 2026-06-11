import { DEFAULT_LOCALE, getLocaleMessages, type AppLocale } from '~/i18n/messages'
import { getPath } from '~/utils/dossier'

type Params = Record<string, string | number>

export function useDossierI18n() {
  const locale = useState<AppLocale>('app-locale', () => DEFAULT_LOCALE)
  const message = computed(() => getLocaleMessages(locale.value))

  function t(path: string, params: Params = {}) {
    const value = getPath(message.value, path)
    const template = typeof value === 'string' ? value : path

    return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`))
  }

  function tm<T = unknown>(path: string): T {
    return getPath(message.value, path) as T
  }

  return {
    locale,
    message,
    t,
    tm,
  }
}
