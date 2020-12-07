const { app, BrowserWindow, Menu } = require('electron')

const template = [{
    label : 'Opciones',
    submenu : [
        { label : 'Administrar Álbumes', click(){ openWindow('src/pages/AlbumAdmin.html','Administrar Álbumes') } },
        { label:'Salir' , click(){ app.quit() } }
    ]
}]

const menu = Menu.buildFromTemplate( template ); 

function createWindow () {
    const mainWindow = new BrowserWindow({
        width : 1199,
        height : 767,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
          }
    })

    Menu.setApplicationMenu(menu);


    mainWindow.loadURL('http://localhost:8888/login')
    
}
var newWindow = null

function openWindow(path, title) {
  if (newWindow) {
    newWindow.focus()
    return
  }

  newWindow = new BrowserWindow({
    height: 600,
    resizable: false,
    width: 800,
    title: title,
    minimizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true
    }
  })


  newWindow.menuBarVisible = false;

  newWindow.loadFile(path)

  newWindow.on('closed', function() {
    newWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {

        app.quit()

    }
})

app.on('activate', () => {  
    createWindow()
})