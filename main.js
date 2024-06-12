const { app, BrowserWindow, globalShortcut, Menu, ipcRenderer } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
console.log('NODE_ENV', NODE_ENV)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win

function createWindow() {
  win = new BrowserWindow({
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  NODE_ENV === 'development'
    ? win.loadURL('http://localhost:3232/')
    : win.loadFile('dist/index.html')

  if (NODE_ENV === 'development') {
    const toggleDevTools = () => {
      if (win.isDevToolsOpened()) {
        win.webContents.closeDevTools()
      } else {
        win.webContents.openDevTools()
      }
    }
    win.webContents.on('before-input-event', (event, input) => {
      if (input.type === 'keyDown') {
        if (input.key === 'F12') {
          toggleDevTools()
        }
      }
    })
    toggleDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  app.on('before-quit', () => {
    if (NODE_ENV === 'development') {
      globalShortcut.unregister('F12')
    }
  })
  Menu.setApplicationMenu(null)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const handleTerminationSignals = () => {
  if (win) {
    win.close()
  }
  app.quit()
}

if (process.platform === 'win32') {
  require('readline')
    .createInterface({
      input: process.stdin,
      output: process.stdout
    })
    .on('SIGINT', () => {
      handleTerminationSignals()
    })
}

process.on('SIGINT', () => {
  handleTerminationSignals()
})

process.on('SIGTERM', () => {
  handleTerminationSignals()
})
