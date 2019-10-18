/**
 * jsKeyboard
 *   Web Audio Keyboard
 *
 * TGrif 2015 - MIT licence
 */



window.onload = function() {


  var jsKeyboardContainer = d3.select("body")
                              .append("svg")
                              .attr("width", 1200)
                              .attr("height", 200);

  var whiteTouchlayer = jsKeyboardContainer.append('g');
  var blackTouchlayer = jsKeyboardContainer.append('g');

  var blackTouchHeight = 96;
  var blackTouchWidth = 25;

  var blackTouchShift = Math.floor(blackTouchWidth / 2);

  var whiteTouchHeight = 180;
  var whiteTouchWidth = 40;
  var whiteTouchWidthAlone = whiteTouchWidth + 1;


  var octaves = octaves || [ /*1, 2,*/ 3, 4, 5, 6/*, 7, 8, 9, 10*/ ];  // 49 touch keyboard

  var touch = touch || [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B' ];

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
        
          .attr("x",octaveShift + x * (i - j))
          .attr("y", 10)
          .attr("width", whiteTouchWidth)
          .attr("height", whiteTouchHeight)

          .attr("fill", "ivory")
          .attr("stroke-width", 1)
          .attr("stroke", "darkgray")

          .attr("id", touch[i] + octaves[o]);


      } else {

        blackTouchlayer.append("rect")

          .attr("x",octaveShift + (x * (i - j)) - blackTouchShift)
          .attr("y", 10)
          .attr("width", blackTouchWidth)
          .attr("height", blackTouchHeight)

          .attr("fill", "ebony")
          .attr("stroke-width", 1)
          .attr("stroke", "darkgray")

          .attr("id", touch[i] + octaves[o]);

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

    })
    
    .on("mouseup", function() {
        
      that.attr("fill", touchColor);
      stop();
        
    })
    
    
    .on("mousemove", function() {
      
      that = that || d3.select(this);
      touchColor = touchColor || that.attr("fill");
      that.attr("fill", touchColor);
        
    });

}
