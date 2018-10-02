/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

var targetvX;
var targetvY;
var targetSpeed = 15;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;


//image for interface
var doggo;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  doggo = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  numDecoys=random(100,500);
  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    var scale = random(0.5,1.5);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,decoyImage1.width*scale,decoyImage1.height*scale);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,decoyImage2.width*scale,decoyImage2.height*scale);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,decoyImage3.width*scale,decoyImage3.height*scale);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,decoyImage4.width*scale,decoyImage4.height*scale);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,decoyImage5.width*scale,decoyImage5.height*scale);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,decoyImage6.width*scale,decoyImage6.height*scale);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,decoyImage7.width*scale,decoyImage7.height*scale);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,decoyImage8.width*scale,decoyImage8.height*scale);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,decoyImage9.width*scale,decoyImage9.height*scale);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,decoyImage10.width*scale,decoyImage10.height*scale);
    }
  }
  //draw rectangle in top right corner
  strokeWeight(4);
  stroke(218,112,214);
  fill(238,130,238);
  rect(width-240,2,220,150);
  //draw doggo inside rectangle
  image(doggo,width-100,50);
  //some flavor text
  noStroke();
  fill(255,0,0);
  textSize(32);
  text('Find Doggo !!',width-220,120);

  // Once we've displayed all decoys, we choose a location for the target
  targetX = random(0,width);
  targetY = random(0,height);
  while (targetX > width-200 && targetY < 120){
    targetX = random(0,width);
    targetY = random(0,height);
  }
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);
}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("HEY LET'S PLAY",width/2,height/2);

    targetvX = targetSpeed;
    targetvY = targetSpeed;
    targetX += random(-targetvX,targetvX);
    targetY += random(-targetvY,targetvY);
    if(targetX>width){
      targetX -= width;
    }
    else if (targetX<0){
      targetX += width;
    }
    if(targetY>height){
      targetY-=height;
    }
     else if(targetY<0){
      targetY+=height;
    }
    image(targetImage,targetX,targetY);
    }
  }

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
