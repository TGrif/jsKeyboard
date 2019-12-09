
const { remote } = require('electron');

let config = remote.getGlobal( "MidiConfig" );


document.getElementById('nb_input').innerHTML = Object.keys(config.Input).length;
let divConfigInput = document.getElementById('config_input');
// divConfigInput.innerHTML = '<h4>Clients en lecture (' + Object.keys(config.Input).length + ')</h4>';

for (let input in config.Input) {
  divConfigInput.innerHTML += '<option>' + config.Input[input] + '</option>';
}


document.getElementById('nb_output').innerHTML = Object.keys(config.Output).length;
let divConfigOutput = document.getElementById('config_output');
// divConfigOutput.innerHTML = '<h4>Clients en écriture (' + Object.keys(config.Output).length + ')</h4>';
for (let output in config.Output) {
  divConfigOutput.innerHTML += '<option>' + config.Output[output] + '</option>';
}
