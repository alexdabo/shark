import { App } from 'electron'
import { BrowserWindow } from 'electron'
import { Menu as menu } from 'electron'
import { MenuItemConstructorOptions } from 'electron'
import AboutWindow from './AboutWindow'
import * as path from 'path'

export default (): BrowserWindow => {
  let window = new BrowserWindow({
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

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, '../../../public/index.html'))

  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null
  })
  return window
}

export const Menu = (app: App, mainWindow: BrowserWindow): menu => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          },
        },
        {
          label: 'Developer Tools',
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
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'About',
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
          label: 'About ' + name,
          //@ts-ignore
          role: 'about',
        },
        {
          //@ts-ignore
          type: 'separator',
        },
        {
          label: 'Services',
          //@ts-ignore
          role: 'services',
          submenu: [],
        },
        {
          //@ts-ignore
          type: 'separator',
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          //@ts-ignore
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          //@ts-ignore
          role: 'hideothers',
        },
        {
          label: 'Show All',
          //@ts-ignore
          role: 'unhide',
        },
        {
          //@ts-ignore
          type: 'separator',
        },
        {
          label: 'Quit',
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
          label: 'Bring All to Front',
          role: 'front',
        }
      )
    }
  }

  return menu.buildFromTemplate(template)
}
