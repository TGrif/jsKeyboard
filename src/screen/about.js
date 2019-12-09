
const { ipcRenderer } = require('electron');

ipcRenderer.on('app-version', (event, args) => {
  let appVersion = document.getElementById('app_version');
  appVersion.innerHTML += args;
});
