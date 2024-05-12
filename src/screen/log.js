const { ipcRenderer } = require('electron');

let logDiv = document.getElementById('log');

ipcRenderer.on('log', (event, log) => {
  logDiv.innerHTML += "<div>" + log + "</div>";
});