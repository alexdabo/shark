import { BrowserWindow } from 'electron'
import * as path from 'path'

export default (parent: BrowserWindow): BrowserWindow => {
  let window = new BrowserWindow({
    parent: parent,
    show: false,
    width: 425,
    height: 325,
    autoHideMenuBar: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    icon: path.join(__dirname, '../../../public/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload/AboutPreload.js'),
    },
  })

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, '../../../public/index.html'))

  // Emitted when the window is Launched
  window.once('ready-to-show', () => {
    window.show()
  })
  return window
}
