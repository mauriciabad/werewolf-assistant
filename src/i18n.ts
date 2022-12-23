import flagCA from '@/assets/flags/flagCA.svg'
import flagEN from '@/assets/flags/flagEN.svg'
import flagES from '@/assets/flags/flagES.svg'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

type Locales = 'en' | 'es' | 'ca'

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  fallbackLocale: {
    ca: ['es'],
    default: ['en', 'es', 'ca'],
  },
  messages,
  fallbackWarn: false,
  missingWarn: false,
})

export interface LocaleInfo {
  id: Locales
  name: string
  icon: string
}

export const localesInfo: LocaleInfo[] = [
  { id: 'ca', name: 'Català', icon: flagCA },
  { id: 'en', name: 'English', icon: flagEN },
  { id: 'es', name: 'Español', icon: flagES },
]

export function getLocaleInfo(locale: Locales): LocaleInfo
export function getLocaleInfo(locale: string): LocaleInfo | undefined
export function getLocaleInfo(locale: string): LocaleInfo | undefined {
  return localesInfo.find((l) => l.id === locale)
}

export default i18n
