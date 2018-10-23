// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.
// tracking score and becoming static 

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
  //////////////////new/////////////////
  //allow the ball to track score
  this.leftScore = 0;
  this.rightScore = 0;
  ////////////////////end new//////////////
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
///////////////NEW////////////////////
//making a clear distinction between going off screen to the left and going off screen to right
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 ) {
    return 1;
  }
  if (this.x > width){
    return 2;
  }
  else {
    return 0;
  }
}

// display()
//
// Draw the ball as a circle on the screen
Ball.prototype.display = function () {
  fill(255);
  ellipse(this.x,this.y,this.size,this.size);
  //if either of the players manages to get a score of 25 the ball becomes static
  if(this.leftScore >= 25 || this.rightScore >= 25){
    push();
    var t = random(0,300);
    for (var i = 0; i < t; i++ ) {
      fill(0);
      noStroke()
      //fills the ball with small rectanlges at a random offset from its center creating static
      rect(this.x+map(random(),0,1,-5,5),this.y+map(random(),0,1,-5,5),1,1);
    }
    pop()
  }
}
///////////////END NEW////////////////////

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
  ///////////////NEW////////////
  //invert the x velocity making the ball launch towards the paddle that scored the last point.
  this.vx = -this.vx;
  //reset y velocity each time to make sure it doesn't get too out of control by being exponentially faster or slower
  this.vy = this.speed;
  // add a random multiplier to the y velocity between half and one and a half time its original velocity
  // in both the positive and negative so it can go up or down
  // also made sure it can't have a multiplier of less than 0.5 either positive or negative as that would be too slow
  var multiplier = random(-1.5,1.5);
  while(multiplier>-0.5 && multiplier< 0.5){
    multiplier = random(-1.5,1.5);
  }
  //console.log(multiplier);
  this.vy = multiplier*this.vy;
}
//allows the ball to track score in order to be able to change to static later
Ball.prototype.scoreHandler = function () {
 if(this.isOffScreen()===1){
   this.rightScore++;
   console.log(this.leftScore,this.rightScore)
 }
 if(this.isOffScreen()===2){
   this.leftScore++;
   console.log(this.leftScore,this.rightScore)
  }
}
/////////////////////END NEW/////////////////
