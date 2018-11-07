// not so basic Pong
// by Joe K.
//
// A noisy implementation of Pong
// you can play with the keyboard but the game has a lot going on you won't always feel in control
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP

// variables to hold our paddle objects
var leftPaddle;
var rightPaddle;
//variables for game states, on and over, since the game starts in title screen both start as false
var gameOn = false;
var gameOver = false;
//an array to hold enemies
var enemies = [];
// an array to hold balls (yes there are multiple balls in this pong)
var balls = [];
// an array to hold portals
var portals = [];
// variables to hold the sound effects
var beep;
var static;
var suction;
var beep2;
//preload()
//
//preloading the sound effects
function preload(){
  beep = new Audio('assets/sounds/beep.wav');
  static = new Audio('assets/sounds/static.wav');
  suction = new Audio('assets/sounds/suction.mp3');
  beep2 = new Audio('assets/sounds/beep2.mp3')
}
// setup()
//
// Creates the balls paddles enemies and portals
function setup() {
  createCanvas(640,480);
  // Create 3 balls which start at different heights in the center
    for (var i=0; i < 3; i++){
      balls.push(new Ball(width/2,height/i-15,5,5,10,5));
    }
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  //create 5 enemy objects which start at random points on screen
  for (var i=0; i < 5; i++){
    enemies.push(new Enemy(random(width),random(height),5,5,5,5));
  }
  //create 2 portals at around the center of the screen
    for (var i=0; i < 2; i++){
      portals.push(new Portal(random(width/2)+width/4,random(height),50,100,5));
}
}
// draw()
//
//manages the title and end screens
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  //if the game is over
  //show the end screen
  if (gameOver === true) {
  endScreen();
  }else if (gameOn === false){
  //if the game hasn't started yet show the title screen
    titleScreen();
  }else{
    //if the game has started and isn't over then start the game
    //start the background noise sound
    static.play();
    background(0);
    //add static to the background visually as well by drawing multiple white squares at random locations via a loop
    for(var i=0; i<1000; i++){
    fill(255);
    noStroke();
    rect(random(width),random(height),1,1);
    }
    //handle the input of both paddles
    //call the methods which handle input from the paddle class
    leftPaddle.handleInput();
    rightPaddle.handleInput();
    //for each of the balls in the array update its position
    for(var i=0; i < balls.length; i++){
    balls[i].update();
    }
    //for each of the portals in the array update its position
    for (var i=0; i < portals.length; i++){
    portals[i].update();
    }
    //for each of the enemies in the array update its position
    for(var i=0; i < enemies.length; i++){
    enemies[i].update();
    }
    //for each of the paddles update its position
    leftPaddle.update();
    rightPaddle.update();

    //the score requirement for the game to end is 25
    if (leftPaddle.score > 25 || rightPaddle.score >25 ){
      gameOver=true;
    }
    // for each ball check if it went of screen and which side it did, then award score to the other side accordingly
    for(var i=0; i < balls.length; i++){
      var offScreenVal= balls[i].isOffScreen();
      if (offScreenVal=== 1) {
        rightPaddle.score++;
        balls[i].reset();
      }else if (offScreenVal=== 2) {
        leftPaddle.score++;
        balls[i].reset();
      }
    }
  // for each of the enemies check if they went of screen then reset their position
  for(var i=0; i < enemies.length; i++){
    if(enemies[i].isOffScreen()){
      enemies[i].reset();
    }
  }
  // for each portal teleport each of the balls that comes into contact with it
  for (var i=0; i < portals.length; i++){
  portals[i].teleportation(balls[1],balls[2],balls[3]);
  }
  //for each ball handle its collision with either paddle
  for(var i=0; i < balls.length; i++){
  balls[i].handleCollision(leftPaddle);
  balls[i].handleCollision(rightPaddle);
  }
  // for each enemy handle its collision with either paddle
  for(var i=0; i < enemies.length; i++){
    enemies[i].handleCollision(leftPaddle);
    enemies[i].handleCollision(rightPaddle);
  }
  //display each of the balls
  for(var i=0; i < balls.length; i++){
    balls[i].display();
  }
  //display each of the enemies
  for(var i=0; i < enemies.length; i++){
    enemies[i].display();
  }
  //display each of the paddles
  leftPaddle.display();
  rightPaddle.display();
  //display each of the portals
  for (var i=0; i < portals.length; i++){
  portals[i].display();
  }
}
}
//if space is pressed start game
function keyPressed(){
  //if space is pressed start game
  if (keyCode === 32){
    gameOn = true;
  }
  //if x is pressed restart game
  if (keyCode === 88) {
    console.log("x pressed")
    gameOver = false;
    gameOn = false;
  }
}
//display title screen
function titleScreen (){
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(26);
  text("Welcome to Joe's SUPER DUPER EPIC PONG", width/2, height/2-30);
  textSize(18);
  text("Press Space", width/2, height/2);
  //reset the scores
  for(var i=0; i<balls.length; i++){
  balls[i].leftScore = 0;
  balls[i].rightScore = 0;
 }
  leftPaddle.score = 0;
  rightPaddle.score =0;
}
function endScreen(){
  //stop the background noise
  //display endScreen
      static.pause();
      background(0);
      fill(255);
      textAlign(CENTER);
      textSize(26);
      text("The Game Is Over!", width/2, height/2-30);
      textSize(18);
      text("Press X", width/2, height/2);
}
