// Enemey
//
// A class to define how an enemy behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles decreasing their scores

// enemey constructor
//
// Sets the properties with the provided arguments
function Enemy(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

Enemy.prototype.update = function () {
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

Enemy.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
    if (this.x + this.size < 0 || this.x > width){
      return true;
    }
  else {
    return false;
  }
}
//show the enemy as a rectangle on screen
// the rectangle is filled with red and blue flashing dots making it static-y and hard to see
Enemy.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
    for(var i=0; i<20; i++){
      fill(255,0,0);
      rect(this.x+random(5),this.y+random(5),1,1);
  }    for(var i=0; i<10; i++){
        fill(0,0,255);
        rect(this.x+random(5),this.y+random(5),1,1);
    }
}
Enemy.prototype.handleCollision = function(paddle) {
  // Check if the enemy overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the enemy overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      beep2.currentTime = 19.5;
      beep2.play();
      // If so, move enemy back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      //reduce the paddle's score by one
      paddle.score--;
      //constrain the paddle score to -20 since the enemy can potentially get stuck on the paddle and keep decreasing its score
      paddle.score = constrain(paddle.score,-20,25);
    }
  }
}
// Set position back to a random point on screen
Enemy.prototype.reset = function () {
  this.x = random(width);
  this.y = random(height);
  //enemy goes towards the paddle that dodged it last
  this.vx = -this.vx;
  // make the y velocity random
  this.vy = this.speed;
  this.vy = random(-2,2)*this.vy;
}
