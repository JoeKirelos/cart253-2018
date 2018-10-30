// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
/////////////fixed bal to ball
var ball;
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  /////////////////////fixed crate >> create
  createCanvas(640,480);
  noStroke();
  // Create a ball
  //////////////fixed original arguments of the ball speed and vx and vy
  ball = new Ball(width/2,height/2,5,5,10,10);
  // Create the right paddle with UP and DOWN as controls
  ////////////////////fixed made right paddle's height 60 instead of 600
  ////////////////////fixed downkey and up key for right paddle
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  /////////////////////fixed added missing parenthesis
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87);
///////////////////fixed added missing curly bracket to setup function
}
// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  /////////////////fixed added parenthesis to the end of the function
  ball.update();
  leftPaddle.update();
  rightPaddle.update();

////////////////fixed added needed curly bracket removed "the"
  if (ball.isOffScreen()){
    ////////////////fixed added ball. before reset so the program knows where the function comes from
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  //////////////fixed added missing parenthesis
  rightPaddle.display();
}
