// Typewriter effect
// Joe K
//
// meant to be used as a method of delivering ideas to the player of the game
// the entity talking is going to guide the player's thought into hopefull experiencing what
// I want them to, which is an emulation of the different stages of getting into a subculture


// variables to hold my strings, to hold values to later be used in functions and to gold my font
var font;
var typed = "Hi there this is Joe";
var typedTwo = "Welcome to my game!";
var typedThree = "The game can be a little frustrating :<";
var typedFour = "But I hope you will still enjoy it c:";
var i=0;
var j=0;
var k=0;
var l=0;
var toType;

// preload()
//
// a function that loads needed items before the program runs in this case a font
// Press start 2P is the name of the font
function preload(){
  font = loadFont("../assets/fonts/press.ttf")
}

//setup()
//
// a function that runs once setting the program up
function setup(){
// creates the canvas at roughly the center of the window with roughly scaled down dimensions of the window
  createCanvas(windowWidth/2,windowHeight*2/3);
//call the first typer function on start
  typer()
}

//draw()
//
// a function that runs on every frame
function draw(){
// fills the background with black on every frame which makes animation real and doesn't stack
  background(0);
// load the type function once per frame
  type();
}
//type()
//
// a function that handles the displaying of the text on the screen
function type(){
  // make the text white
  fill(255);
  //let it be written with the font we preloaded
  textFont(font);
  // have a size of the answer to life
  textSize(42);
  //type whatever is in the toType variable at 50 on x a 3rd from the top on y
  //with a width 25 less than that of the window
  text(toType,50, height/3,width-25);
}

//typer()
//
//the first of the 4 typer functions which handle the generation of text
function typer(){
// if the global variable i is shorter than the length of the first typed variable
// then execute the code which generates 1 letter of typed at a time and feed it into the
//toType variable with a delay of 200 miliseconds
  if(i <= typed.length){
    var type2 = typed.substring(0,i);
    toType = type2;
    setTimeout('typer()',200);
    i++;
  }else {
    // once the message in the variable typed is over set an 800 miliseconds delay before
    // running the second typer function aka typerTwo
    setTimeout('typerTwo()',800);
  }
}
//typerTwo()
//
//TyperTwo through typerFour do the same thing as typer simply using different strings
// with different variable names
// I could have kept it in the same function with else if statements but i
//simply wanted a bigger delay between each message
function typerTwo(){
  if (j <= typedTwo.length){
   var type2 = typedTwo.substring(0,j);
   toType = type2;
   setTimeout('typerTwo()',200);
   j++;
}else {
  setTimeout('typerThree()',800);
}
}
function typerThree(){
  if (k <= typedThree.length){
   var type2 = typedThree.substring(0,k);
   toType = type2;
   setTimeout('typerThree()',200);
   k++;
} else { setTimeout('typerFour()',800);
}
}
function typerFour(){
  if (l <= typedFour.length){
    var type2 = typedFour.substring(0,l);
    toType = type2;
    setTimeout('typerFour()',200);
    l++;
  }
}
