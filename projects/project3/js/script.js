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
var arrowIcon;
var noteIcon;
var notes = [];
var textIntial = true;
var generator;
var beep;
var spawnRate = 666;
var noteSpeed = 5;
var tTyped1="Hi there!  Welcome to the game!  Hope you enjoy!  If you can xD  ";
// preload()
//
//preloads the images to be used later for the the objects
function preload(){
  arrowIcon = loadImage('assets/images/arrow.png');
  noteIcon = loadImage('assets/images/note.png');
  font = loadFont("../assets/fonts/press.ttf");
  beep = loadSound('assets/sounds/beep.wav');
  song1 = loadSound('assets/sounds/song1.wav');
}


// setup ()
//
// create the canvas and set the arrows in place and
// sets the interval for spawning notes
function setup(){
  createCanvas(800,600);
  orientations = [0,PI/2,3*PI/2,PI];
  generator = new Generator("",tTyped1,200,100);
  generator.generate();
  for (var i = 0; i<4; i++){
  arrows.push(new Arrow(600-i*150,75,100,orientations[i],arrowIcon,'#aba7e2',orientations[i]));
}
  song1.play(10);
  setTimeout(noteSpawn,10000);
}



//draw()
//
// draws the background displays all the objects
function draw(){
  background(0);
  if(textIntial === true){
  generator.display();
  if(generator.initial===false){
    textIntial =false;
  }
  }else{
  arrowDisplay();
  noteUpdate();
  cues();
  arrowFlash();
}
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
    notes[i].update();
    notes[i].display();
  if  (notes[i].offScreen()){
      notes.shift();
  }
 }
}

//noteSpawn()
//
//chooses a random value and depending on the result choose one of the lanes to spawn the note on
function noteSpawn(){

  //var to choose a random orientation
  if(textIntial===false){
  var orientation = floor(random(4));
  if (orientation === 0){
    //push a new note into their respective array in this case the right one
    notes.push(new Note(600,height+75,75,-noteSpeed,orientations[orientation],noteIcon,'#c02ead',0));
  }
  // the down one here
  if (orientation === 1){
    notes.push(new Note(450,height+75,75,-noteSpeed,orientations[orientation],noteIcon,'#c02ead',1));
  }
  // the up one
  if (orientation === 2){
    notes.push(new Note(300,height+75,75,-noteSpeed,orientations[orientation],noteIcon,'#c02ead',2));
  }
  //and the left one
  if (orientation === 3){
    notes.push(new Note(150,height+75,75,-noteSpeed,orientations[orientation],noteIcon,'#c02ead',3));
  }
    setTimeout(noteSpawn,spawnRate);
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

function keyPressed(){
  if (keyCode ===LEFT_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===3&&notes[i].handleScore()){
          notes[i].hexColor ='#aba7e200';
        }
      }
  }
  if (keyCode ===RIGHT_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===0&&notes[i].handleScore()){
          notes[i].hexColor ='#aba7e200';
        }
      }
    }
  if (keyCode ===UP_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===2&&notes[i].handleScore()){
          notes[i].hexColor = '#aba7e200';
        }
      }
  }
  if (keyCode ===DOWN_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===1&&notes[i].handleScore()){
        notes[i].hexColor = '#aba7e200';
    }
  }
}
}
function arrowFlash() {
  if (keyIsDown(DOWN_ARROW)){
        arrows[1].hexColor = '#ffffff';
        arrows[1].size = 125;
      } else if (keyIsDown(UP_ARROW)){
        arrows[2].hexColor = '#ffffff';
        arrows[2].size = 125;
      } else if (keyIsDown(LEFT_ARROW)){
        arrows[3].hexColor = '#ffffff';
        arrows[3].size = 125;
      }else  if (keyIsDown(RIGHT_ARROW)){
        arrows[0].hexColor = '#ffffff';
        arrows[0].size = 125;
      }else {
  for(var j=0; j<=3; j++){
    arrows[j].hexColor = '#aba7e2';
    arrows[j].size = 100;
  }
}
}
function spawnAlter(val){
  spawnRate = val
}
function speedAlter(val){
  noteSpeed = val
}
function cues(){
  song1.addCue(11.00, spawnAlter, 555);
  song1.addCue(11.00, speedAlter, 8);
  song1.addCue(24.00, spawnAlter, 600);
  song1.addCue(24.00, speedAlter, 6);
  song1.addCue(35.00, spawnAlter, 750);
  song1.addCue(35.00, speedAlter, 4);
  song1.addCue(46.00, spawnAlter, 600);
  song1.addCue(46.00, speedAlter, 6);
  song1.addCue(56.00, spawnAlter, 555);
  song1.addCue(56.00, speedAlter, 8);
  song1.addCue(140.00, spawnAlter, 800);
  song1.addCue(140.00, speedAlter, 4);
  song1.addCue(161.00, spawnAlter, 600);
  song1.addCue(161.00, speedAlter, 6);
  song1.addCue(188.00, spawnAlter, 2000);
  song1.addCue(188.00, speedAlter, 4);
}
