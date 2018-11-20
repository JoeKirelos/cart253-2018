var font;
var typed = "Hi";


function preload(){
  font = loadFont("../assets/fonts/press.ttf")
}

function setup(){
  createCanvas(windowWidth/2,windowHeight*2/3);
  background(0);
}

function draw(){
type();
}

function type(){
  fill(255);
  textAlign(CENTER);
  textFont(font);
  textSize(36);
  text(typed,width/2, height/2);
}
