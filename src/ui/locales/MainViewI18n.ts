import * as i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
const resources = {
  en: {
    translation: {
      starting: 'Starting',
      stopping: 'Stopping',
      directory: 'Directory',
      port: 'Port',
      portInUse: 'Port "{{port}}" in use.',
      notExist: 'Does not exist "{{dir}}".',
      save: 'Save',
      saved: 'Changes saved',
      serverListeningAt: 'Server listening at',
      serverErrorStarting: 'Error starting server.',
      serverStopped: 'Server stopped',
      openBrowser: 'Open your browser at: "{{domain}}".',
    },
  },
  es: {
    translation: {
      starting: 'Iniciando',
      stopping: 'Apagando',
      directory: 'Directorio',
      port: 'Puerto',
      portInUse: 'Puerto  "{{port}}" en uso.',
      notExist: 'El directorio "{{dir}}" no existe.',
      save: 'Guardar',
      saved: 'Cambios guardados',
      serverListeningAt: 'Servidor escuchando en:',
      serverErrorStarting: 'Error al iniciar el servidor.',
      serverStopped: 'Servidor apagado',
      openBrowser: 'Abre tu navegador en:  "{{domain}}".',
    },
  },
}

// initialize i18next with catalog and language to use
i18n
  //@ts-ignore
  .use(initReactI18next)
  .init({
    resources,
    lng: process.env.APP_LANG,
  })

export default i18n as any
