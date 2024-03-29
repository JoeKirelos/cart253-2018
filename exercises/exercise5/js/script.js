// not at all basic Pong
// Joe!!
// An abstract concept of noise shown in the form of pong, score matters but not in the traditional sense
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;

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
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
 ///////////////////new////////////////////
  ball.scoreHandler();
 //if the ball  goes off screen to the left award the right paddle a point and vice versa, also reset ball if it goes off screen
  if (ball.isOffScreen()=== 1) {
    rightPaddle.score++;
    ball.reset();
    //console.log(leftPaddle.score,rightPaddle.score);
  }
  if (ball.isOffScreen()=== 2) {
    leftPaddle.score++;
    ball.reset();
    //console.log(leftPaddle.score,rightPaddle.score);
  }
  ///////////////////end new////////////////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();
}
