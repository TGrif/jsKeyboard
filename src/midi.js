const { ipcRenderer } = require('electron');
const midi = require('midi');
// console.log(midi)

const midiTool = require('./midi-tool');

const config = {};

const input = new midi.Input();
input.ignoreTypes(false, false, false);
// console.log(input)

input.openVirtualPort("jsKeyboard Virtual MIDI in");
// input.openPort(0);

const output = new midi.Output();

output.openVirtualPort("jsKeyboard Virtual MIDI out");
// output.openPort(0);
// console.log(output)


const nbInputPort = input.getPortCount();
console.log('___________________________________')
console.log('Clients en lecture (' + nbInputPort + ')');

config['Input'] = {};

for (let i = 0; i < nbInputPort; i++) {
  console.log(input.getPortName(i));
  config['Input'][i] = input.getPortName(i);
}

const nbOutputPort = output.getPortCount();
console.log('___________________________________')
console.log('Clients en ecriture (' + nbOutputPort + ')');

config['Output'] = {};

for (let i = 0; i < nbOutputPort; i++) {
  console.log(output.getPortName(i));
  config['Output'][i] = output.getPortName(i);
}

ipcRenderer.send('setMidiConfig', config);



function sendMsg(channel, note) {
  ipcRenderer.send('updateLog', 'Send a MIDI message: ' + channel + ' ' + note);
  // console.log('Send a MIDI message:', channel, note)
  // console.log(midiTool.note_to_MIDI(note, 1, -1))
  console.log(note);
  output.sendMessage([channel, midiTool.note_to_MIDI(note), 80]);
}


// Configure a callback.
input.on('message', (deltaTime, message) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  // console.log(message)
  // console.log(`m: ${message} d: ${deltaTime}`);
  console.log('MIDI channel: ', message[0], 'Pitch value:', message[1], 'Velocity value:', message[2], 'Time:', deltaTime)
  console.log(midiTool.MIDI_to_note(message[1]))
});

// output.on('message', (deltaTime, message) => {
//   console.log('->', message)
// });

// ... receive MIDI messages ...

// Close the port when done.
setTimeout(function() {
  midiCleanUp()
}, 100000);


function midiCleanUp() {
  input.closePort();
  output.closePort();
}



// console.log(midiTool.MIDINote(69))
// console.log(midiTool.MIDINote('3C', 1, -1))


// Web midi

// navigator.requestMIDIAccess({ sysex: true })
//   .then(function(access) {
// 
//      // Get lists of available MIDI controllers
//      const inputs = access.inputs.values();
//      const outputs = access.outputs.values();
// 
//       console.log(inputs.next().value)
//       console.log(outputs.next().value)
// 
//      access.onstatechange = function(e) {
// 
//        // Print information about the (dis)connected MIDI controller
//        console.log(e.port.name, e.port.manufacturer, e.port.state);
//      };
//   });

