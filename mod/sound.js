/**
 * jsKeyboard
 *  jsPlay Keyboard Play
 *  
 * @author TGrif 2015 - MIT licence 
 */

 
 
var

    audioContext = new AudioContext(),
        
        
        osc,
        
         
            frequency = {},


                octaves = [ 3, 4, 5, 6 ],
                
                touch = [ 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B' ],
               
        

    B2 = 123.471,
    
    n = B2;     // TODO généraliser pour clavier 88 touches en partant du A4 = 440




    
    for (var o = 0; o < octaves.length; o++) {
        for (var i = 0; i < touch.length; i++) {            
            frequency[touch[i] + octaves[o]] = n = n * Math.pow(2, 1/12);
        }
    }
    
    frequency['L6'] = n * Math.pow(2, 1/12);   // last key (C7)
    
        //console.log(frequency);
    





    function play(touch) {
        
            console.info(touch);

                
        osc = audioContext.createOscillator();
        
        osc.frequency.value = frequency[touch];
        osc.type = 'sine';
        
        
        osc.connect(audioContext.destination);
        osc.start(0);
        
    }
    
    
    
    
    function stop() {
        osc.stop(0);
    }
    
    
    

