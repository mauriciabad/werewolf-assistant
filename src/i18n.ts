import { createI18n } from 'vue-i18n'
import ca from '@/locales/ca.json'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import flagCA from '@/assets/flags/flagCA.svg'
import flagEN from '@/assets/flags/flagEN.svg'
import flagES from '@/assets/flags/flagES.svg'

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  fallbackLocale: {
    ca: ['es'],
    default: ['en'],
  },
  messages: {
    ca,
    en,
    es,
  },
  fallbackWarn: false,
  missingWarn: false,
})

export interface LocaleInfo {
  id: string
  name: string
  icon: string
}

export const localesInfo: LocaleInfo[] = [
  { id: 'ca', name: 'Català', icon: flagCA },
  { id: 'en', name: 'English', icon: flagEN },
  { id: 'es', name: 'Español', icon: flagES },
]

export default i18n
