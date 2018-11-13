var note;
var orientations = [];
var arrows = [];
var icon;

function preload(){
  icon = loadImage('assets/images/arrow.png')
}
function setup(){
  createCanvas(800,600);
  orientations = [0,PI/2,3*PI/2,PI];
  for (var i = 0; i<4; i++){
  arrows.push(new Arrow(600-i*150,75,100,orientations[i],icon,255,0,0));
}
}
function draw(){
  background(0);
  for (var i =0 ; i < arrows.length; i++) {
    arrows[i].display();
  }
}
