// ddr simulator
// joe kirelos
// a ddr like game which can be played with the arrow keys
// doesn't track score for now
// doesn't have music for now
//is very easy for now as the player can hold the button down <.<
// the idea will be that  an entity communicates with the player through the game to simulate the different hurdles of getting into
//a specific or niche subculte, in this case rhythm games, i plan to highlight
//entery barrier, initiation, elitism and finally the fun of the challenge.
//for now this is the primitive barebones, the arrows and the notes and detetection of the overlapping
//i plan to improve by adding sounds a menu and the communication of the entity

//coded in javascript OOP using p5 library


// variables to hold my arrays of objects, conditions and assets
var orientations = [];
var arrows = [];
var icon;
var notes = [[],[],[],[]];
var upKey = false;


// preload()
//
//preloads the images to be used later for the the objects
function preload(){
  icon = loadImage('assets/images/arrow.png')
}


// setup ()
//
// create the canvas and set the arrows in place and
// sets the interval for spawning notes
function setup(){
  createCanvas(800,600);
  orientations = [0,PI/2,3*PI/2,PI];
  for (var i = 0; i<4; i++){
  arrows.push(new Arrow(600-i*150,75,100,orientations[i],icon,255,0,0));
}
setInterval(noteSpawn,2000)
}


//draw()
//
// draws the background displays all the objects
function draw(){
  background(0);
  arrowDisplay();
  noteUpdate();
}


//noteupdate()
//
//update each of the notes in the array of arrays of notes
//display each of those notes
//delete each of the notes that go of screen which we get  from the offScreen method
//check if the keys are pressed to change color of the notes IF THE NOTES OVERLAP WITH THE ARROW which we get from its handleScore method
//(note the game can be "cheesed" right now as the player can just hold down each of the buttons as keyPressed doesn't work
//even on the p5.js reference for keyPressed the RIGHT_ARROW and LEFT_ARROW don't work as intended)
function noteUpdate(){
  for (var i = 0; i < notes.length; i++) {
  for (var j = 0; j < notes[i].length; j++) {
    notes[i][j].update();
    notes[i][j].display();
  if  (notes[i][j].offScreen()){
      notes[i].shift(-1);
    }
    else if (notes[i][j].handleScore()){
      if (i===2){
        if (keyIsPressed){
          if(keyCode === UP_ARROW){
          notes[i][j].colorR=255;
        }
        }
      }if (i===3){
        if (keyIsPressed){
          if(keyCode === LEFT_ARROW){
          notes[i][j].colorR=255;
        }
        }
      }if (i===0){
        if (keyIsPressed){
          if(keyCode === RIGHT_ARROW){
          notes[i][j].colorR=255;
        }
        }
      }if (i===1){
        if (keyIsPressed){
          if(keyCode === DOWN_ARROW){
          notes[i][j].colorR=255;
        }
        }
      }
    }
    }
  }
}

//noteSpawn()
//
//chooses a random value and depending on the result choose one of the lanes to spawn the note on
function noteSpawn(){
  //var to choose a random orientation
  var orientation = floor(random(4));
  if (orientation === 0){
    //push a new note into their respective array in this case the right one
    notes[orientation].push(new Note(600,height+75,75,-5,orientations[orientation],icon,0,255,0,0));
  }
  // the down one here
  if (orientation === 1){
    notes[orientation].push(new Note(450,height+75,75,-5,orientations[orientation],icon,0,255,0,1));
  }
  // the up one
  if (orientation === 2){
    notes[orientation].push(new Note(300,height+75,75,-5,orientations[orientation],icon,0,255,0,2));
  }
  //and the left one
  if (orientation === 3){
    notes[orientation].push(new Note(150,height+75,75,-5,orientations[orientation],icon,0,255,0,3));
  }
}
//arrowDisplay()
//
//display each of the arrows in the arry
function arrowDisplay(){
  for (var i =0 ; i < arrows.length; i++) {
    arrows[i].display();
  }
}
