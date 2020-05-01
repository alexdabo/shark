import * as i18n from 'i18next'
const resources = {
  en: {
    translation: {
      mac: {
        about: 'About {{app}}',
        services: 'Services',
        hide: 'Hide {{app}}',
        hideOther: 'Hide Others',
        showAll: 'Show All',
        front: 'Bring All to Front',
        quit: 'Quit',
      },
      view: {
        label: 'View',
        reload: 'Reload',
        devTools: 'Developer Tools',
        lang: {
          label: 'Language',
          english: 'English',
          spanish: 'Spanish',
        },
      },
      window: {
        label: 'Window',
        minimize: 'Minimize',
        close: 'Close',
      },
      help: {
        label: 'Help',
        about: 'About',
      },

      dialog: {
        ok: 'Ok',
        cancel: 'Cancel',
        confirm: 'Confirm',
        serverListening: 'The server is up.',
        areYouSure: 'Are you sure you want to quit?',
      },
    },
  },
  es: {
    translation: {
      mac: {
        about: 'Acerca de {{app}}',
        services: 'Servicios',
        hide: 'Ocultar {{app}}',
        hideOther: 'Ocultar Otros',
        showAll: 'Mostrat Todos',
        front: 'Traer todo al frente',
        quit: 'Salir',
      },
      view: {
        label: 'Vista',
        reload: 'Recargar',
        devTools: 'Herramientas',
        lang: {
          label: 'Idioma',
          english: 'Inglés',
          spanish: 'Español',
        },
      },
      window: {
        label: 'Ventana',
        minimize: 'Minimizar',
        close: 'Cerrar',
      },
      help: {
        label: 'Ayuda',
        about: 'Acerda de shark',
      },

      dialog: {
        ok: 'Ok',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        serverListening: 'El servidor está activo.',
        areYouSure: '¿Estás seguro de que quieres salir?',
      },
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
