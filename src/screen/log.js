const { ipcRenderer } = require('electron');

let logDiv = document.getElementById('log');

// let log = remote.getGlobal( "MidiLog" );
// console.log(log)
// 
// if (log) {
//   let logDiv = document.getElementById('log');
//   logDiv.innerHTML = log;
// 
// }

ipcRenderer.on('log', (event, log) => {
  console.log(log)
  logDiv.innerHTML += log;
})
