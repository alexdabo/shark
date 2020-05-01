const resources = {
  en: {
    translation: {
      ok: 'Ok',
      cancel: 'Cancel',
      confirm: 'Confirm',
      message: 'Restart shark to apply changes?',
    },
  },
  es: {
    translation: {
      ok: 'Ok',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      message: '¿Reiniciar Shark para aplicar cambios?',
    },
  },
}

const options = (lang: string): object => {
  const i18n = require('i18next')
  i18n.init({
    resources,
    lng: lang,
  })

  return {
    type: 'info',
    title: i18n.t('confirm'),
    message: i18n.t('message'),
    buttons: [i18n.t('cancel'), i18n.t('ok')],
  }
}
export default options
