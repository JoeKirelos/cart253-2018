var font;
var typed = " Hi there this is joe";
var typedTwo = " Welcome to my game!";
var typedThree = " The game can be a little frustrating :<";
var typedFour = " But I hope you will still enjoy it c:";
var i=0;
var j=0;
var k=0;
var l=0;
var toType;


function preload(){
  font = loadFont("../assets/fonts/press.ttf")
}

function setup(){
  createCanvas(windowWidth/2,windowHeight*2/3);
  background(0);
  typer()
}

function draw(){
  background(0);
  type();
}

function type(){
  fill(255);
  //textAlign(CENTER);
  textFont(font);
  textSize(36);
  text(toType,25, height/2,width-25);
}
function typer(){
  if(i <= typed.length){
    var type2 = typed.substring(0,i);
    console.log(type2)
    toType = type2;
    setTimeout('typer()',200);
    i++;
  }else {
    setTimeout('typerTwo()',800);
  }
}
function typerTwo(){
  if (j <= typedTwo.length){
   var type2 = typedTwo.substring(0,j);
   console.log(type2)
   toType = type2;
   setTimeout('typerTwo()',200);
   j++;
}else {
  setTimeout('typerThree()',800);
}
}
function typerThree(){
  if (k <= typedThree.length){
   var type3 = typedThree.substring(0,k);
   console.log(type3)
   toType = type3;
   setTimeout('typerThree()',200);
   k++;
} else { setTimeout('typerFour()',800);
}
}
function typerFour(){
  if (l <= typedFour.length){
    var type4 = typedFour.substring(0,l);
    console.log(type4)
    toType = type4;
    setTimeout('typerFour()',200);
    l++;
  }
}
