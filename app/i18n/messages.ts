import en from './en.json'
import ptBR from './pt-BR.json'

export const DEFAULT_LOCALE = 'pt-BR'

export const messages = {
  en,
  'pt-BR': ptBR,
} as const

export type AppLocale = keyof typeof messages
export type LocaleMessages = typeof ptBR

export function getLocaleMessages(locale: AppLocale = DEFAULT_LOCALE): LocaleMessages {
  return messages[locale] as LocaleMessages
}
