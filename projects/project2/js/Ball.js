// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  //ball keep track of scores
  this.leftScore = 0;
  this.rightScore = 0;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  // Check which size the ball left screen from and award a point to the opposite side
    if (this.x + this.size < 0){
      this.rightScore++;
      //console.log(this.leftScore,this.rightScore);
      return 1;
    }else if (this.x > width) {
      this.leftScore++;
      //console.log(this.leftScore,this.rightScore);
      return 2;
    }
  else {
    return 0;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
  if(this.leftScore > 10 && this.rightScore > 10){
    for(var i=0; i<100; i++){
      fill(0);
      rect(this.x+random(10),this.y+random(10),1,1);
    }
  }
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
    }
  }
}
// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function () {
  this.x = width/2;
  this.y = height/2;
  this.vx = -this.vx; //ball goes towards the paddle that scored the last point
  // make the y velocity random
  this.vy = this.speed;
  this.vy = random(-1.5,1.5)*this.vy;
  //console.log(this.vy);
}
