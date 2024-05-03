/**
 * jsKeyboard
 *   Web Audio Keyboard
 *
 * TGrif 2015 - MIT licence
 */


  // keyboard body

d3.select("body")
    .append('svg')
    .attr({
        id: "svg_gui", width: 1415, height: 250
    })
    .append("rect")
    .attr({
        id: "gui", width: 1415, height: 250, rx: 8, ry: 8, fill: "black"
    });


  // pitch control

d3.select("svg")
    .append("rect")
    .attr({
        id: "ctrlPitch", x: 50, y: 190, rx: 8, ry: 8, width: 100, height: 25, fill: "orange"
    });


  // modulation wheel (TODO)
/*
d3.select("svg")
    .append("g")
    .append("svg:image")
    .attr({  // FIXME modulation_wheel.png doesn't exists
        id: "ctrlPitch", x: 50, y: 190, rx: 8, ry: 8, width: 100, height: 25, "xlink:href": "src/img/modulation_wheel.png"
    });
*/


  // btn control

d3.select("svg")
    .append("rect")
    .attr({
        id: 'ctrl1', x: 25, y: 120, rx: 8, ry: 8, width: 40, height: 25, fill: 'beige'
    });


d3.select("svg")
    .append("rect")
    .attr({
        id: 'ctrl2', x: 80, y: 120, rx: 8, ry: 8, width: 40, height: 25, fill: 'beige'
    });


d3.select("svg")
    .append("rect")
    .attr({
        id: 'ctrl3', x: 80, y: 80, rx: 8, ry: 8, width: 40, height: 25, fill: 'beige'
    });


  // screen (TODO)
/*  
d3.select("svg")
    .append("rect")
    .attr({
        id: 'screen', x: 210, y: 18, rx: 5, ry: 5, width: 450, height: 35, fill: 'lightblue'
    });
*/

  // label

d3.select("svg")
    .append("text")
    .attr({
        id: 'label', x: 1272, y: 38, 'font-style': 'italic', fill: 'lightgrey'
    })
    .text('jsKeyboard');


  // submenu keys (TODO)
/*
d3.select("svg")
    .append("text")
    .attr({
        id: 'f', x: 205, y: 53, fill: 'lightgrey', 'font-size': 10
    })
    .text('panic');
*/

var jsKeyboardContainer = d3.select("#svg_gui")
    // .append("g")
    .append("svg")
    .attr({
        width: 1500, height: 400, x: 200, y: 52
    });



var whiteTouchlayer = jsKeyboardContainer.append('g');
var blackTouchlayer = jsKeyboardContainer.append('g');

var blackTouchHeight = 96;
var blackTouchWidth = 25;

var blackTouchShift = Math.floor(blackTouchWidth / 2);

var whiteTouchHeight = 180;
var whiteTouchWidth = 40;
var whiteTouchWidthAlone = whiteTouchWidth + 1;


var octaves = octaves || [ /*1, 2,*/ 3, 4, 5, 6/*, 7, 8, 9, 10*/ ];  // 49 touch keyboard

// console.log(midiTool.NOTES)
// var touch = midiTool.NOTES;
var touch = [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B' ];

var octaveShift = 0;
var nbOctaves = 4;

var x = 40;
var j = 0;



for (var o = 0; o < nbOctaves; o++) {

  if (o === nbOctaves - 1) {
    touch.push('L');   // last white touch (whiteTouchWidthAlone)
  }


  for (var i = 0; i < touch.length; i++) {

    if (touch[i].match(/^[A-Z]$/)) {    // match one char only

      if (i === touch.length - 1 && o === nbOctaves - 1) {
         whiteTouchWidth = whiteTouchWidthAlone;
      }

      whiteTouchlayer.append("rect")
        .attr({
          id: touch[i] + octaves[o],
          x: octaveShift + x * (i - j),
          y: 10,
          width: whiteTouchWidth,
          height: whiteTouchHeight,
          fill: 'ivory',
          'stroke-width': 1,
          stroke: 'darkgray'
        })

    } else {

      blackTouchlayer.append("rect")
        .attr({
          id: touch[i] + octaves[o],
          x: octaveShift + (x * (i - j)) - blackTouchShift,
          y: 10,
          width: blackTouchWidth,
          height: blackTouchHeight,
          ry: 1,
          fill: 'ebony',
          'stroke-width': 1,
          stroke: 'darkgray'
        })

        j++;

    }

  }

  octaveShift += 480;

}


var that, touchColor, key;


d3.selectAll("rect")

  .on("mousedown", function() {

    that = d3.select(this);

    touchColor = that.attr("fill");
    that.attr("fill", "#fbc97f");   // light orange

    key = that.attr("id");

    if (key.indexOf('ctrl') === -1) {
      play(key);
      sendMsg('144', key);
    } else {
      console.log(key)
      if (key = 'ctrl1') changeOSCType();
    }

  })

  .on("mouseup", function() {
    that.attr("fill", touchColor);
    if (key.indexOf('ctrl') === -1) {
      stop();
      sendMsg('128', key);
    } else {
      console.log(key)
    }
  })

  .on("mousemove", function() {
    that = that || d3.select(this);
    touchColor = touchColor || that.attr("fill");
    that.attr("fill", touchColor);
  });
