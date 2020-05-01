import { lang } from './configs/app.config'
lang()
import { app, ipcRenderer } from 'electron'
import { ipcMain } from 'electron'
import { dialog } from 'electron'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'
import MainWindow from './ui/windows/MainWindow'

let mainWindow: Electron.BrowserWindow

function createWindow() {
  mainWindow = MainWindow(app)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// Change language
ipcMain.on('changeLang', () => {
  app.relaunch()
  app.quit()
})

// Create tmp folder
// Compressed files are created in this folder for subsequent downloading
const tmpdir = path.join(os.tmpdir(), 'shark')
if (!fs.existsSync(tmpdir)) {
  fs.mkdirSync(tmpdir)
}

// Create config folder
// Configuration data is stored in this folder
const configdir = path.join(os.homedir(), '.shark')
if (!fs.existsSync(configdir)) {
  fs.mkdirSync(configdir)
}

// Create fileicons folder
// file icons are stored here
const fileIconsDestination = path.join(os.homedir(), '.shark', 'fileicons')
const fileIconsOrigin = path.join(__dirname, '../public/fileicons')
if (!fs.existsSync(fileIconsDestination)) {
  fs.mkdirSync(fileIconsDestination)
  const files = fs.readdirSync(fileIconsOrigin)
  files.forEach((file) => {
    fs.copyFileSync(path.join(fileIconsOrigin, file), path.join(fileIconsDestination, file))
  })
}
