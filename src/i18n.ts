import { createI18n } from 'vue-i18n'

import zh from './lang/zh'
import en from './lang/en'

const messages = {
  zh: zh,
  en: en
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: messages
})

export default i18n
