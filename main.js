const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

const appVersion = process.env.npm_package_version

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

  masterWindow.loadFile(path.join(__dirname, 'index.html'));
  
  createMenu();
  
  // DEBUG
  masterWindow.webContents.openDevTools();
  
  masterWindow.on('close', () => {
    // TODO close other windows
  });

  
  ipcMain.on("setMidiConfig", (event, config) => {
    global.MidiConfig = config;
  });

  
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
            openMIDILogWindow();
          }
        },
        {
          label: 'MIDI config',
          click() {
            openMIDIConfigWindow();
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
            openAboutWindow();
          }
        }
      ]
    }
  ];
  
  Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu));
  
}


function openMIDILogWindow() {
  
  let logWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: appIcon
  });

  logWindow.setMenuBarVisibility(false);
  logWindow.loadFile(path.join(__dirname, 'src/screen/log.html'));
  
  // DEBUG
  // logWindow.webContents.openDevTools();
  
  
  ipcMain.on('updateLog', (event, log) => {
    logWindow.webContents.send('log', log);
  });
  
}


function openMIDIConfigWindow() {
  let configWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    },
    icon: appIcon
  });

  configWindow.setMenuBarVisibility(false);
  configWindow.loadFile(path.join(__dirname, 'src/screen/config.html'));
  
  // DEBUG
  // configWindow.webContents.openDevTools();
  
}


function openAboutWindow() {
  
  let aboutWindow = new BrowserWindow({
    width: 300,
    height: 100,
    webPreferences: {
      nodeIntegration: true
    },
    icon: appIcon
  });

  aboutWindow.setMenuBarVisibility(false);
  aboutWindow.loadFile(path.join(__dirname, 'src/screen/about.html'));

  aboutWindow.webContents.on('dom-ready', () => {
    aboutWindow.webContents.send('app-version', appVersion);
  });
  
  // DEBUG
  // aboutWindow.webContents.openDevTools();
  
}


app.on('ready', createWindow);

