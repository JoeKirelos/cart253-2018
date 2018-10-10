/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 3;
// Player health
var playerHealth;
var playerMaxHealth = 300;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 5;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

/////////new//////////
//time for perlin noise
var tx=10;
var ty=30;

//sprint modifier
var sprint= 1;

//health loss modifier
var loss= 0.5;

//web location
var wX;
var wY;

//web timer
var webTimer= 0;

//image vairables

var webImage;
var spiderImage;
var bfImage;

//sounds
var webSound;
var cackle;
var spiderSound;

//gameover
var gameO = false;

//preloading images

function preload() {

  webImage = loadImage('assets/images/spiderweb.png');
  spiderImage = loadImage('assets/images/red_spider.png');
  bfImage = loadImage('assets/images/golden_butterfly.png');
  webSound = new Audio('assets/sounds/web.wav');
  cackle = new Audio('assets/sounds/cackle.wav');
  spiderSound = new Audio ('assets/sounds/spider.wav');
}

////////new///////////

// setup()
//
// Sets up the basic elements of the game
function setup() {
  /////////////new//////////////
  //wanted the canvas to be the size of the windowHeight but also wanted it to stay square so I set both width and height to window height
  createCanvas(windowHeight,windowHeight);
//////////////new//////////////
  noStroke();

  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
//intialises spider sound at 4 seconds.
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
  spiderSound.currentTime = 4;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  // I chose to keep the background the same color because I like the color scheme it has with the red spider and yellow butterfly
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    userInterface();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawWeb();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks WASD keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(65)) {
    playerVX = -playerMaxSpeed*sprint;
    spiderSound.play();
  }
  else if (keyIsDown(68)) {
    playerVX = playerMaxSpeed*sprint;
    spiderSound.play();
  }
  else {
    playerVX = 0;
    spiderSound.pause();
  }

  // Check for vertical movement
  if (keyIsDown(87)) {
    playerVY = -playerMaxSpeed*sprint;
    spiderSound.play();
  }
  else if (keyIsDown(83)) {
    playerVY = playerMaxSpeed*sprint;
    spiderSound.play();
  }
  else {
    playerVY = 0;
    spiderSound.pause();
  }

  ////////////new/////////////
  //check if player is sprinting
  if (keyIsDown(16)) {
    //console.log("I am alive");
    sprint = 2;
    loss = 0.75;
  }else {
    sprint= 1;
    loss= 0.5;
  }

}
  ///////////new//////////

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}
//////////new////////////
//health bar
function userInterface(){
  var health = map(playerHealth,0,300,0,width);
  push();
  stroke(0);
  fill(255,0,0);
  rect(0,5,health,15);
  pop()
  push()
  fill(0,0,0,100);
  rectMode(CENTER);
  rect(width-75,height-12,250,100);
  textAlign(RIGHT);
  textSize(26);
  fill(255,0,0);
  text("click to lay web", width-10,height-30);

}
// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range

  // Check if the player is dead
  ///////new///////
  playerHealth = constrain(playerHealth - loss,0,playerMaxHealth);

  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at set interval
    // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
    ////////new///////////
    preyVX = map(noise(tx),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(ty),0,1,-preyMaxSpeed,preyMaxSpeed);

    tx+= 0.02;
    ty+= 0.02;

  //if prey is webbed stop it from moving
  var d = dist(wX,wY,preyX,preyY);
  if (webTimer > 0 && d < 25 + preyRadius){
    preyVX=0;
    preyVY=0;
  }
      ////////new///////////
// Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}
/////////new//////////
//draw the web where the player click and leave it there for 1 second
function drawWeb() {
  if (webTimer>0){
    push();
    fill(255,0,0);
    image(webImage,wX,wY,50,50);
    pop();
    webTimer--;
  }
}
/////////new//////////


// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyHealth);
  image(bfImage,preyX,preyY,50,50);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill,playerHealth);
  image(spiderImage,playerX,playerY,50,50);
}

/////////new///////////
//draw web on mouse position
// make sure player can't draw more than one web
function mousePressed() {
  if (webTimer>0){
    return;
  }
  webSound.currentTime = 0.3;
  webSound.play();
  wX = mouseX;
  wY = mouseY;
  webTimer=60;
  }

/////////new//////////
// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  cackle.play();
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
