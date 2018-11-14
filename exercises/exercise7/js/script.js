var note;
var orientations = [];
var arrows = [];
var icon;
var notes = [[],[],[],[]];
var upKey = false;


function preload(){
  icon = loadImage('assets/images/arrow.png')
}
function setup(){
  createCanvas(800,600);
  orientations = [0,PI/2,3*PI/2,PI];
  for (var i = 0; i<4; i++){
  arrows.push(new Arrow(600-i*150,75,100,orientations[i],icon,255,0,0));
}
setInterval(noteSpawn,2000)
}
function draw(){
  background(0);
  arrowDisplay();
  noteUpdate();

}
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


function noteSpawn(){
  var orientation = floor(random(4));
  if (orientation === 0){
    notes[orientation].push(new Note(600,height+75,75,-5,orientations[orientation],icon,0,255,0,0));
  }
  if (orientation === 1){
    notes[orientation].push(new Note(450,height+75,75,-5,orientations[orientation],icon,0,255,0,1));
  }
  if (orientation === 2){
    notes[orientation].push(new Note(300,height+75,75,-5,orientations[orientation],icon,0,255,0,2));
  }
  if (orientation === 3){
    notes[orientation].push(new Note(150,height+75,75,-5,orientations[orientation],icon,0,255,0,3));
  }
}
function arrowDisplay(){
  for (var i =0 ; i < arrows.length; i++) {
    arrows[i].display();
  }
}
