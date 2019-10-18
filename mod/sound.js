/**
 * jsKeyboard
 *   Web Audio Keyboard
 *  
 * TGrif 2015 - MIT licence 
 */


var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var osc;
var volume = audioContext.createGain();
volume.gain.value = 0.2;  // set default volume gain

var oscType = ['sine', 'square', 'sawtooth', 'triangle'/*, 'custom'*/ ];
var oscActualType = oscType[0];  // set default osc type

var frequency = {};

var octaves = [ 3, 4, 5, 6 ];  // TODO

var touch = [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B' ];  // TODO


var B2 = 123.471;
    
var n = B2;     // TODO généraliser pour clavier 88 touches en partant du A4 = 440



for (var o = 0; o < octaves.length; o++) {
  for (var i = 0; i < touch.length; i++) {
    frequency[touch[i] + octaves[o]] = n = n * Math.pow(2, 1/12);
  }
}

frequency['L6'] = n * Math.pow(2, 1/12);   // last key (C7)
  
//console.log(frequency);


function play(touch) {

  console.info(touch);
  
  if (frequency[touch]) { // if this is a touch
    
    osc = audioContext.createOscillator();
    
    osc.frequency.value = frequency[touch];
    osc.type = oscActualType;
    
    osc.connect(volume);
    volume.connect(audioContext.destination);
    
    osc.start(0);
    
  } else { // this is a function button

    switch (touch) {
      case "touch1": // change osc type
        let i = oscType.indexOf(oscActualType)
        oscActualType = oscType[++i]
        // d3.select("#touch1")    
        //     .append("g")
        //     .append("text").text('toto')
        break;
    }
    // console.log(touch)
  }
}


function stop() {
  if (osc) osc.stop(0);
}

