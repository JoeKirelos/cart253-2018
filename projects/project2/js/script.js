// not so basic Pong
// by Joe K.
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
var enemy;
var gameOn = false;
var gameOver = false;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
  // create enemy
  enemy = new Enemy(random(width),random(height),2,2,10,5);
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

  ball.update();
  enemy.update();
  leftPaddle.update();
  rightPaddle.update();

  if (leftPaddle.score > 25 || rightPaddle.score >25 ){
    gameOver=true;
  }

  var offScreenVal= ball.isOffScreen();
  if (offScreenVal=== 1) {
    rightPaddle.score++;
    //console.log(leftPaddle.score,rightPaddle.score);
    ball.reset();
  }else if (offScreenVal=== 2) {
    leftPaddle.score++;
    //console.log(leftPaddle.score,rightPaddle.score);
    ball.reset();
  }
  if(enemy.isOffScreen()){
    enemy.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  enemy.display();
  leftPaddle.display();
  rightPaddle.display();
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
  ball.leftScore = 0;
  ball.rightScore = 0;
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
