import * as path from 'path'
import { App } from 'electron'
import { dialog } from 'electron'
import { ipcMain } from 'electron'
import { BrowserWindow } from 'electron'
import { Menu as menu } from 'electron'
import { MenuItemConstructorOptions } from 'electron'
import { language } from '../../configs/app.config'
import i18n from '../locales/MenuI18n'
import clI18n from '../locales/ChangeLangI18n'
import AboutWindow from './AboutWindow'
import ConfigRepository from '../../repositories/ConfigRepository'

let serverIsListening: boolean = false

ipcMain.on('serverStatusChange', (event, listening) => {
  serverIsListening = listening
})

export default (app: App): BrowserWindow => {
  let window = new BrowserWindow({
    show: false,
    width: 500,
    height: 425,
    autoHideMenuBar: true,
    resizable: false,
    maximizable: true,
    icon: path.join(__dirname, '../../../public/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/MainPreload.js'),
    },
  })

  // set menu
  app.applicationMenu = Menu(app, window)

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, '../../../public/index.html'))

  // Emitted when the window is Launched
  window.once('ready-to-show', () => {
    window.show()
  })

  // Emitted when the window is close.
  window.on('close', (event) => {
    if (serverIsListening) {
      const choice = dialog.showMessageBoxSync({
        type: 'question',
        title: i18n.t('dialog.confirm'),
        message: i18n.t('dialog.serverListening'),
        detail: i18n.t('dialog.areYouSure'),
        buttons: [i18n.t('dialog.cancel'), i18n.t('dialog.ok')],
      })

      if (choice === 0) {
        event.preventDefault()
      }
    }
  })

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null
  })

  return window
}

const Menu = (app: App, mainWindow: BrowserWindow): menu => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: i18n.t('view.label'),
      submenu: [
        {
          label: i18n.t('view.reload'),
          accelerator: 'CmdOrCtrl+R',
          click: function (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          },
        },
        {
          label: i18n.t('view.lang.label'),
          submenu: [
            {
              label: i18n.t('view.lang.english'),
              click: () => updateLanguage('en'),
              type: 'radio',
              checked: process.env.APP_LANG === 'en',
            },
            {
              label: i18n.t('view.lang.spanish'),
              click: () => updateLanguage('es'),
              type: 'radio',
              checked: process.env.APP_LANG === 'es',
            },
          ],
        },
        {
          label: i18n.t('view.devTools'),
          accelerator: (function () {
            if (process.platform === 'darwin') return 'Alt+Command+I'
            else return 'Ctrl+Shift+I'
          })(),
          click: function (item, focusedWindow) {
            if (focusedWindow) {
              //@ts-ignore
              focusedWindow.toggleDevTools()
            }
          },
        },
      ],
    },
    {
      label: i18n.t('window.label'),
      role: 'window',
      submenu: [
        {
          label: i18n.t('window.minimize'),
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: i18n.t('window.close'),
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },
    {
      label: i18n.t('help.label'),
      role: 'help',
      submenu: [
        {
          label: i18n.t('help.about'),
          click: () => {
            // show about window as child of parent
            AboutWindow(mainWindow)
          },
        },
      ],
    },
  ]

  if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
      label: name,
      submenu: [
        {
          label: i18n.t('mac.about', { app: name }),
          //@ts-ignore
          role: 'about',
        },
        {
          //@ts-ignore
          type: 'separator',
        },
        {
          label: i18n.t('mac.services'),
          //@ts-ignore
          role: 'services',
          submenu: [],
        },
        {
          //@ts-ignore
          type: 'separator',
        },
        {
          label: i18n.t('mac.hide', { app: name }),
          accelerator: 'Command+H',
          //@ts-ignore
          role: 'hide',
        },
        {
          label: i18n.t('mac.hideOther'),
          accelerator: 'Command+Shift+H',
          //@ts-ignore
          role: 'hideothers',
        },
        {
          label: i18n.t('mac.showAll'),
          //@ts-ignore
          role: 'unhide',
        },
        {
          //@ts-ignore
          type: 'separator',
        },
        {
          label: i18n.t('mac.quit'),
          accelerator: 'Command+Q',
          click: function () {
            app.quit()
          },
        },
      ],
    })
    const windowMenu = template.find(function (m) {
      return m.role === 'window'
    })
    if (windowMenu) {
      //@ts-ignore
      windowMenu.submenu.push(
        {
          type: 'separator',
        },
        {
          label: i18n.t('mac.front'),
          role: 'front',
        }
      )
    }
  }

  return menu.buildFromTemplate(template)
}

const updateLanguage = (lang: language) => {
  const repository: ConfigRepository = new ConfigRepository()
  //@ts-ignore
  dialog.showMessageBox(clI18n(lang), async (event: number) => {
    if (event === 1) {
      await repository.update({ lang })
      ipcMain.emit('changeLang', lang)
    }
  })
}
