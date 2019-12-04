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
            id: "svg_gui",
            width: 1415,
            height: 250
        })
    .append("rect")
        .attr({
            id: "gui",
            x: 0,
            y: 0,
            rx: 8,
            ry: 8,
            width: 1415,
            height: 250,
            fill: "black"
        });


  // pitch control

d3.select("svg")
    .append("g")
    .append("rect")
        .attr({
            x: 50,
            y: 190,
            rx: 8,
            ry: 8,
            width: 100,
            height: 25,
            fill: "orange"
      });


  // btn control
  
d3.select("svg")
    .append('g')
    .append("rect")
        .attr({
            id: 'touch1',
            x: 25,
            y: 120,
            rx: 8,
            ry: 8,
            width: 40,
            height: 25,
            fill: 'beige'
        });


d3.select("svg")
    .append('g')
    .append("rect")
        .attr({
            id: 'touch2',
            x: 80,
            y: 120,
            rx: 8,
            ry: 8,
            width: 40,
            height: 25,
            fill: 'beige'
        });


d3.select("svg")
    .append('g')
    .append("rect")
        .attr({
            id: 'touch3',
            x: 80,
            y: 80,
            rx: 8,
            ry: 8,
            width: 40,
            height: 25,
            fill: 'beige'
        });



var jsKeyboardContainer = d3.select("#svg_gui")
    .append("g")
    .append("svg")
        .attr({
            width: 1500,
            height: 400,
            x: 200,
            y: 55
        });



// jsKeyboardContainer.append('g').append('rec').attr({ x: 50, y: 50, id: 'vol_knob', width: 200, height: 200, fill: 'red' });

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
var touch = midiTool.NOTES;
// var touch = touch || [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B' ];

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
          
          fill: 'ebony',
          'stroke-width': 1,
          stroke: 'darkgray'
        })

        j++;

    }

  }

  octaveShift += 480;

}


var that, touchColor;


d3.selectAll("rect")

  .on("mousedown", function() {
    
    that = d3.select(this);

    touchColor = that.attr("fill");
    that.attr("fill", "#fbc97f");   // light orange
    
    play(that.attr("id"));
    // console.log(that.attr("id"))
    
    sendMsg('144', that.attr("id"))

  })
  
  .on("mouseup", function() {
    
    that.attr("fill", touchColor);
    stop();
    
    sendMsg('128', that.attr("id"))
  })
  
  
  .on("mousemove", function() {
    
    that = that || d3.select(this);
    touchColor = touchColor || that.attr("fill");
    that.attr("fill", touchColor);
      
  });


    

    // var el = document.getElementById('vol_knob');
    // var dial = JogDial(el, {debug: true});
    
    
// }
