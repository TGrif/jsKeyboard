
const midi = require('midi');

const midiTool = require('./midi-tool');


// window && window.process && window.process.type
// console.log(window.process.type)
console.log(process.versions['electron'])

const input = new midi.Input();
input.ignoreTypes(false, false, false);

input.openVirtualPort("jsKeyboard Virtual MIDI in");
// input.openPort(0);

const output = new midi.Output();

output.openVirtualPort("jsKeyboard Virtual MIDI out");
// output.openPort(0);


// console.log(midi);
const nbInputPort = input.getPortCount();
console.log('___________________________________')
console.log('Clients en lecture (' + nbInputPort + ')');

for (let i = 0; i < nbInputPort; i++) {
  console.log(input.getPortName(i));
}

const nbOutputPort = output.getPortCount();
console.log('___________________________________')
console.log('Clients en ecriture (' + nbOutputPort + ')');

for (let i = 0; i < nbOutputPort; i++) {
  console.log(output.getPortName(i));
}




function sendMsg(channel, note) {
  console.log('Send a MIDI message:', channel, note)
  // console.log(midiTool.note_to_MIDI(note, 1, -1))
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


// ... receive MIDI messages ...

// Close the port when done.
setTimeout(function() {
  input.closePort();
  // Close the port when done.
  output.closePort();
}, 100000);




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

