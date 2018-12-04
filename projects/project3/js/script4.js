// ddr simulator
// joe kirelos
// a ddr like game which can be played with the arrow keys
// doesn't track score for now
//there us an entity communicates with the player through the game to simulate the different hurdles of getting into
//a specific or niche subculte, in this case rhythm games, in this level I want to highlight
//entery barrier
//this program contains a text generator, arrow object (subclass) and note object(subclass)

//coded in javascript OOP using p5 library


// variables to hold my arrays of objects, conditions, assets and variables

var generator;
var beep;
var tTyped4="I didn't expect you to stick around. I guess you got the point, didn't you ? No matter what others say or how they bring you down. If you enjoy something keep doing it.  ";
var textIntial = true;

// preload()
//
//preloads the images, sounds and fonts to be used later for the the objects
function preload(){
  font = loadFont("../assets/fonts/pin.otf");
  beep = loadSound('assets/sounds/beep.wav');
}


// setup ()
//
// create the canvas and sets the text generator up
function setup(){
  createCanvas(800,600);
  orientations = [0,PI/2,3*PI/2,PI];
  generator = new Generator("",tTyped4,200,100,0,37,77,131,170);
  generator.generate();
}



//draw()
//
// draws the background displays the text
function draw(){
  background(0);  if(textIntial === true){
      generator.display();
      if(generator.initial===false){
        textIntial =false;
      }
    //once the text ends display the following
    }else{
      textSize(24)
      text("hey, Joe here, hope you enjoyed this game. Sorry if it come off a little aggressive at times. The songs used for this are obviously not my own. They are in order Popstar by KDA, Brave Shine by Aimer and Hacking to the gate by Kanako Itou.",50, height/3,width-25)
}
}
