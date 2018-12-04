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
var orientations = [];
var arrows = [];
var arrowIcon;
var noteIcon;
var notes = [];
var textIntial = true;
var generator;
var beep;
var font;
var song2;
var spawnRate = 800;
var noteSpeed = 5;
var tTyped2="You did really bad there, didn't you ?  I guess that song is a little difficult. You should play something your own level. Try this one!";


// preload()
//
//preloads the images, sounds and fonts to be used later for the the objects
function preload(){
  arrowIcon = loadImage('assets/images/arrow.png');
  noteIcon = loadImage('assets/images/note.png');
  font = loadFont("../assets/fonts/bungee.ttf");
  beep = loadSound('assets/sounds/beep.wav');
  song2 = loadSound('assets/sounds/song2.wav');
}


// setup ()
//
// create the canvas and set the arrows in place and
// sets the interval for spawning notes
// sets a delay for the game to start
function setup(){
  createCanvas(800,600);
  orientations = [0,PI/2,3*PI/2,PI];
  generator = new Generator("",tTyped2,200,100,0,40,81,123,136);
  generator.generate();
  for (var i = 0; i<4; i++){
  arrows.push(new Arrow(600-i*150,75,100,orientations[i],arrowIcon,'#aba7e2',orientations[i]));
  }
//18 seconds is roughly the amount of time it takes for the text to finish
  song2.play(18);
  setTimeout(noteSpawn,18000);
}



//draw()
//
// draws the background displays all the objects
function draw(){
  background(0);
  //display the text until it ends
  if(textIntial === true){
    generator.display();
    if(generator.initial===false){
      textIntial =false;
    }
  //once the text ends display the arrows and notes, also run the cue function and the animations of the arrows
  }else{
    arrowDisplay();
    noteUpdate();
    cues();
    arrowFlash();
  }
}


//noteupdate()
//
//update each of the notes in the array of notes
//display each of those notes
//delete each of the notes that go off screen which we get from the offScreen method
function noteUpdate(){
  for (var i = 0; i < notes.length; i++) {
    //make the notes move using the update method
    //show the notes using the display method
    notes[i].update();
    notes[i].display();
    //if a note goes off screen delete it
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
//display each of the arrows in the array
function arrowDisplay(){
  for (var i =0 ; i < arrows.length; i++) {
    arrows[i].display();
  }
}

//keyPressed()
//
// check if a key is pressed, if the key aligns with the lane in which the note is and the note overlaps with the arrow, set the note's opacity to 0 (make it invisible)
function keyPressed(){
  if (keyCode ===LEFT_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===3&&notes[i].handleScore()){
          notes[i].hexColor ='#00000000';
        }
      }
  }
  if (keyCode ===RIGHT_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===0&&notes[i].handleScore()){
          notes[i].hexColor ='#00000000';
        }
      }
    }
  if (keyCode ===UP_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===2&&notes[i].handleScore()){
          notes[i].hexColor = '#00000000';
        }
      }
  }
  if (keyCode ===DOWN_ARROW){
    for(var i = 0; i<=3; i++){
      if(notes[i].lane===1&&notes[i].handleScore()){
        notes[i].hexColor = '#00000000';
    }
  }
}
}

//arrowFlash()
//
//handles the animation of the arrow while the key of that respective arrow is being held down
//I chose keyIsDown instead of key pressed as it feels more natural to a rhythm game that the key can
// be activated at any point and can be held down (even if i don't have any hold notes)
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

//spawnAlter()
//
//change the spawnRate of the notes by "val"
function spawnAlter(val){
  spawnRate = val
}

//speedAlter()
//
//change the speed of the notes by "val"
function speedAlter(val){
  noteSpeed = val
}

//cues()
//
//adds cues to the song, based on the speed at which the song is going, it alters the spawnRate and noteSpeed
function cues(){

  song2.addCue(13.00, spawnAlter, 1000);
  song2.addCue(13.00, speedAlter, 4);
  song2.addCue(56.00, spawnAlter, 700);
  song2.addCue(56.00, speedAlter, 6);
  song2.addCue(89.00, spawnAlter, 20000);
  song2.addCue(89.00, speedAlter, 2);
  song2.addCue(89.00, nextLevel);
}
//nextLevel()
//
//make the button for next level appear
function nextLevel(){
 document.getElementById('nextLevel2').style.opacity = 1;
}
