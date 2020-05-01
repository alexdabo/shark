import * as i18n from 'i18next'
const resources = {
  en: {
    translation: {
      version: 'Version',
      description: 'Make your computer your personal cloud.',
      issues: 'Report issues',
    },
  },
  es: {
    translation: {
      version: 'Versión',
      description: 'Convierta su computadora en su nube personal.',
      issues: 'Reportar problemas',
    },
  },
}

// initialize i18next with catalog and language to use
i18n
  //@ts-ignore
  .init({
    resources,
    lng: process.env.APP_LANG,
  })

export default i18n as any
