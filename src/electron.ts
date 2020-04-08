import { app } from 'electron'
import { BrowserWindow } from 'electron'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs'

console.log(path.join(__dirname, 'hola'))
let mainWindow: Electron.BrowserWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    width: 800,
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

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
