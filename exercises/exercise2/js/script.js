/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;
// The position and size of the enemy circle
var enemyX2;
var enemyY2;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemyVY = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

//the font
var font;

//the player avatar
var avatar;

//the background
var bg;

//avatar size
var avatarSize;

//the enemy
var enemy;
var enemy2;

var resetting = false;
//preload
//
//preloading the font
function preload(){
    avatar = loadImage('assets/images/golden_butterfly.png');
    enemy = loadImage('assets/images/spiderweb.png');
    bg = loadImage('assets/images/spiderface.jpg');
    enemy2 = loadImage('assets/images/red_spider.png');
    //loading the superior font
    font = loadFont("assets/fonts/hel.ttf");
}
// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

if (resetting) {
  return;
}

  // A pink background
  background(bg,500,500);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  enemyVY = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;
  enemyY2 = enemyY2 + enemyVY;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    lose();
  }
  if (dist(enemyX2,enemyY2,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    lose();
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    lose();
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    enemyReset();
  }
  if (enemyY > height) {
    enemyReset();
  }
  if (dodges === 20){
    win()
  }

  // Display the current number of successful in the console
  console.log(dodges);

  // Draw the player as a butterfly
  image(avatar,avatarX,avatarY,avatarSize,avatarSize);


  // Draw the enemy as a spiderweb and a spider)
  image(enemy2,enemyX2,enemyY2,enemySize,enemySize);
  image(enemy,enemyX,enemyY,enemySize,enemySize);

  //on screen score
  textFont(font);
  textAlign(RIGHT);
  textSize(24);
  fill(255);
  stroke(0);
  text('Score: ' + dodges,490,20);
}
function win(){
  //YOU WIN!!
  textAlign(CENTER);
  textSize(36);
  textStyle(BOLD);
  text('YOU WIN!',250,250);
  setTimeout(reset,1000);
  resetting = true;
  //reset();
}
function lose(){
  //YOU LOSE!!
  textAlign(CENTER);
  textSize(36);
  textStyle(BOLD);
  text('YOU LOSE!',250,250);
  setTimeout(reset,1000);
  resetting = true;
  //reset();
}
function reset(){
  console.log("i am alive");
  enemyX = 0;
  enemyX2 = random(0,width);
  enemyY = random(0,height);
  enemyY2 = 0;
  // Reset the enemy's size and speed
  enemySize = 50;
  enemySpeed = 5;
  // Reset the avatar's position
  avatarX = width/2;
  avatarY = height/2;
  // Reset the dodge counter
  dodges = 0;
  avatarSize = random(10,100);
  avatarSpeed = random(5,50);
  resetting = false;
}
function enemyReset(){
  // This means the player dodged so update its dodge statistic
  dodges = dodges + 2; //since dodging 2 enemies now
  // Tell them how many dodges they have made
  console.log(dodges + " DODGES!");
  // Reset the enemy's position to the left at a random height
  enemyX = 0;
  enemyX2 = random(0,width);
  enemyY = random(0,height);
  enemyY2 = 0;
  // Increase the enemy's speed and size to make the game harder
  enemySpeed = enemySpeed + enemySpeedIncrease;
  enemySize = enemySize + enemySizeIncrease;
  avatarSize = constrain(avatarSize,10,100);
  avatarSize += random(-5,5);
  avatarSpeed = constrain(avatarSpeed,5,15);
  avatarSpeed += random(-5,5);
}
