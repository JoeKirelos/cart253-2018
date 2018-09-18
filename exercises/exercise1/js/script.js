// Exercise 1 - Moving pictures
// Pippin barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a butterfly
var butterflyImage;
// The current position of the butterfly face
var butterflyImageX;
var butterflyImageY;

// The image of a spider
var spiderImage;
// The current position of the butterfly face
var spiderImageX;
var spiderImageY;

//The image of the arrow
var arrowImage;
var arrowWidth;
var arrowHeight;

//the current position of the arrow
var arrowX;
var arrowY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;


// preload()
//
// Load the two images we're using before the program starts

function preload() {
  spiderImage = loadImage("assets/images/red_spider.png");
  butterflyImage = loadImage("assets/images/golden_butterfly.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  arrowImage = loadImage("assets/images/arrow.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the butterfly image at the centre of the canvas
  butterflyImageX = width/2;
  butterflyImageY = height/2;

  // Start the spider image at the centre of the canvas
  spiderImageX = width/2;
  spiderImageY = height/2;

  //setting arrow width and Height
  arrowWidth = 150;
  arrowHeight = 75;

  //start the arrow at the left of the screen in the center
    arrowX = 0-arrowWidth/2;
    arrowY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the butterfly face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  //display and move arrow
  image(arrowImage,arrowX+=2,arrowY,arrowWidth,arrowHeight);

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the butterfly by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - butterflyImageX;
  var yDistance = mouseY - butterflyImageY;
  // Add 1/10th of the x and y distance to the butterfly's current (x,y) location
  butterflyImageX = butterflyImageX + xDistance/10;
  butterflyImageY = butterflyImageY + yDistance/10;

  //spider stays on the mouse location
  spiderImageX = mouseX;
  spiderImageY = mouseY;


  // Display the butterfly image
  image(butterflyImage,butterflyImageX,butterflyImageY);

  //Display the spider image
  image(spiderImage,spiderImageX,spiderImageY);
}
