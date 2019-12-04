 
const { app, BrowserWindow/*, Menu*/ } = require('electron');
const path = require('path');


function createWindow () {
  
  let win = new BrowserWindow({
    width: 1850,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'img/jsKeyboard.png')
  });


  win.loadFile('index.html');
  
  win.webContents.openDevTools();
  
}


app.on('ready', createWindow);
