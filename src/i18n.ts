import { createI18n } from 'vue-i18n'
import caES from '@/locales/ca-ES.json'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  fallbackLocale: {
    'ca-ES': ['es'],
    default: ['en'],
  },
  messages: {
    'ca-ES': caES,
    en: en,
    es: es,
  },
})

export default i18n
