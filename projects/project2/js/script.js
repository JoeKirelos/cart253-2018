// not so basic Pong
// by Joe K.
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP
var leftPaddle;
var rightPaddle;
var gameOn = false;
var gameOver = false;
var enemies = [];
var balls = [];
var portals = [];
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
    for (var i=0; i < 3; i++){
      balls.push(new Ball(width/2,height/2,5,5,10,5));
    }
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  for (var i=0; i < 5; i++){
    enemies.push(new Enemy(random(width),random(height),5,5,5,5));
  }
  //create portal at around the center of the screen
    for (var i=0; i < 2; i++){
      portals.push(new Portal(random(width/2)+width/4,random(height),50,100,5));
}
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  if (gameOver === true) {
  endScreen();
  }
    else if (gameOn === false){
      titleScreen();
    }else{
  background(0);
  for(var i=0; i<1000; i++){
      fill(255);
      noStroke();
      rect(random(width),random(height),1,1);
    }

  leftPaddle.handleInput();
  rightPaddle.handleInput();
  for(var i=0; i < balls.length; i++){
  balls[i].update();
  }
  for (var i=0; i < portals.length; i++){
  portals[i].update();
  }
  for(var i=0; i < enemies.length; i++){
  enemies[i].update();
  }
  leftPaddle.update();
  rightPaddle.update();


  if (leftPaddle.score > 25 || rightPaddle.score >25 ){
    gameOver=true;
  }
  for(var i=0; i < balls.length; i++){
    var offScreenVal= balls[i].isOffScreen();
    if (offScreenVal=== 1) {
      rightPaddle.score++;
      //console.log(leftPaddle.score,rightPaddle.score);
      balls[i].reset();
    }else if (offScreenVal=== 2) {
      leftPaddle.score++;
      //console.log(leftPaddle.score,rightPaddle.score);
      balls[i].reset();
    }
  }


  for(var i=0; i < enemies.length; i++){
    if(enemies[i].isOffScreen()){
      enemies[i].reset();
  }
  }

  for (var i=0; i < portals.length; i++){
  portals[i].teleportation(balls[i]);
  }
  for(var i=0; i < balls.length; i++){
  balls[i].handleCollision(leftPaddle);
  balls[i].handleCollision(rightPaddle);
  }

  for(var i=0; i < enemies.length; i++){
    enemies[i].handleCollision(leftPaddle);
    enemies[i].handleCollision(rightPaddle);
  }
  for(var i=0; i < balls.length; i++){
    balls[i].display();
  }

  for(var i=0; i < enemies.length; i++){
    enemies[i].display();
  }
  leftPaddle.display();
  rightPaddle.display();
  for (var i=0; i < portals.length; i++){
  portals[i].display();
  }
}
}
function keyPressed(){
  if (keyCode === 32){
    gameOn = true;
  }
  if (keyCode === 88) {
    console.log("x pressed")
    gameOver = false;
    gameOn = false;
  }
}

function titleScreen (){
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(26);
  text("Welcome to Joe's SUPER DUPER EPIC PONG", width/2, height/2-30);
  textSize(18);
  text("Press Space", width/2, height/2);
  for(var i=0; i<balls.length; i++){
  balls[i].leftScore = 0;
  balls[i].rightScore = 0;
 }
  leftPaddle.score = 0;
  rightPaddle.score =0;
}
function endScreen(){
      background(0);
      fill(255);
      textAlign(CENTER);
      textSize(26);
      text("The Game Is Over!", width/2, height/2-30);
      textSize(18);
      text("Press X", width/2, height/2);
}
