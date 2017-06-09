 /**
 * jsKeyboard
 *   Web Audio Keyboard / GUI module
 *  
 * TGrif 2015 / 2016 - MIT licence
 */

"use strict";


        // init GUI Globals
            
        paddingTopGUI = 45,
        paddingLeftGUI = 210;


 

    function touch() {}
    
    touch.prototype.append = function (param) {
       
        d3.select("#jsKeyboard")        
    
            .append('g')
    
                .append("rect")

                    .attr({
                        
                        id: param.id,
                
                        x: param.x,
                        y: param.y,
                        
                        rx: 8,
                        ry: 8,
                        
                        width: 40,
                        height: 25,
                        
                        fill: param.color
                        
                    });
    
     };
 



document.addEventListener("DOMContentLoaded", () => { 


        // keyboard body
            
    d3.select("#jsKeyboard")
    
            .append('g')
        
        
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


                    // .attr("stroke-width", 1)
                    // .attr("stroke", "darkgray")




            // pitch control
            
        
    d3.select("#jsKeyboard")
    
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
        
    
                        
                        
//    .attr("width", 200)
//    .attr("height", 200);
                             
//    var circle = pitchControl.append("ellipse")
//                          .attr("cx", 100)
//                          .attr("cy", 190)
//                        .attr("rx", 65)
//                       .attr("ry", 20)
//               .attr("stroke-width", 2)
//       .attr("stroke", "darkgray");
       
//               .attr("fill", "grey");
                        



    var touchControl = new touch();
    
        touchControl
    
            .append({
                id: 'touch1',
                x: 25,
                y: 120,
                color: 'beige',
                label: 'Func 1'
                
          });
            
         
    
    
    var touchControl2 = new touch();
    
        touchControl2
    
            .append({
                id: 'touch2',
                x: 80,
                y: 120,
                color: 'beige',
                label: 'Func 2'
                
          });
          
          
          
          
//    var touchControl3 = new touch();
//    
//    touchControl3
//    
//            .append({
//                id: 'touch3',
//                x: 135,
//                y: 120,
//                color: 'beige',
//                label: 'Func 3'
//                
//          });
          
          
          

    var touchControl5 = new touch();
    
        touchControl5
    
            .append({
                id: 'touch5',
                x: 80,
                y: 80,
                color: 'beige',
                label: 'Func 5'
                
          });
          
          
          
});



