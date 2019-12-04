 
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const appIcon = path.join(__dirname, 'src/img/jsKeyboard.png');


function createWindow() {
  
  let masterWindow = new BrowserWindow({
    width: 1850,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    icon: appIcon
  });

  masterWindow.loadFile('index.html');
  
  createMenu();
  
  // DEBUG
  masterWindow.webContents.openDevTools();
  
}


function createMenu() {
  
  let templateMenu = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Ctrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'MIDI log',
          click() {
            openMIDILogWindow()
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click() {
            openAboutWindow()
          }
        }
      ]
    }
  ];
  
  Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu));
  
}


function openMIDILogWindow() {
  
  let aboutWindow = new BrowserWindow({
    width: 400,
    height: 600,
    icon: appIcon
  });

  aboutWindow.setMenuBarVisibility(false);
  
}


function openAboutWindow() {
  
  let aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    icon: appIcon
  });

  aboutWindow.setMenuBarVisibility(false);
  aboutWindow.loadFile(path.join(__dirname, 'src/screen/about.html'));

}


app.on('ready', createWindow);

