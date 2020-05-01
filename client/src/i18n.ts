import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      simple: {
        cancel: 'Cancel',
        confirm: 'Click to confirm',
        create: 'Create',
        delete: 'Delete',
        download: 'Download',
        gridView: 'Grid View',
        folder: 'Folder',
        home: 'Home',
        listView: 'List View',
        name: 'Name',
        new: 'New',
        newFolder: 'New Folder',
        refresh: 'Refresh',
        search: 'Search ...',
        upload: 'Upload',
      },
      msg: {
        dragAndDrop: 'Drag and drop files here to upload.',
        clickToSelect: 'Or click to select files,',
        folderIsEmpty: 'Folder is empty.',
      },
      error: {
        creatingFolder: 'Error creating folder.',
        deleteFile: 'Failed to delete file.',
        deleteFolder: 'Failed to delete folder.',
        downloadFile: 'Failed to download file.',
        downloadFolder: 'Failed to download folder.',
        loadingData: 'Error loading data.',
      },
      info: {
        compressing: 'compressing the {{name}} folder.',
      },
    },
  },
  es: {
    translation: {
      simple: {
        cancel: 'Cancelar',
        confirm: 'Click para confirmar',
        create: 'Crear',
        delete: 'Eliminar',
        download: 'Descargar',
        gridView: 'Ver Cuadrícula',
        folder: 'Carpeta',
        home: 'Hogar',
        listView: 'Ver Lista',
        name: 'Nombre',
        new: 'Nuevo',
        newFolder: 'Nueva carpeta',
        refresh: 'Actualizar',
        search: 'Buscar ...',
        upload: 'Subir',
      },
      msg: {
        dragAndDrop: 'Arrastra y suelta archivos aquí para cargarlos.',
        clickToSelect: 'O haga clic para seleccionar archivos.',
        folderIsEmpty: 'La carpeta está vacía.',
      },
      error: {
        creatingFolder: 'Error al crear la carpeta.',
        deleteFile: 'Error al eliminar el archivo.',
        deleteFolder: 'Error al eliminar la carpeta.',
        downloadFile: 'Error al descargar el archivo.',
        downloadFolder: 'Error al descargar la carpeta.',
        loadingData: 'Error al cargar datos.',
      },
      info: {
        compressing: 'Comprimiendo la carpeta {{name}}.',
      },
    },
  },
}

//const options =

// initialize i18next with catalog and language to use
i18n.use(LanguageDetector).init({
  resources,
  fallbackLng: ['en'], // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier

  whitelist: ['en', 'es'],
  detection: {
    // order and from where user language should be detected
    order: ['navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,

    // only detect languages that are in the whitelist
    checkWhitelist: true,
  },
})

export default i18n
