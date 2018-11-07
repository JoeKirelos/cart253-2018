// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
// keeping track of its own score and changing its looks based on score values

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = 0;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
}


// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  //make the paddle get progressively redder for the first 10 points it scores
  //by inversly mapping the blue and green values of the color the paddle will get redder with more points being scored
  //and whiter with more points being deducted
  var color = map(this.score,0,10,255,0);
  fill(255,color,color);
  rect(this.x,this.y,this.w,this.h);
  //the score also affects the amount of static inside the paddle, up to 20 points of score the static decreases until it stops.
  //draw static inside the paddle by drawing multiple blue dots all over the paddle looping per frame
  for (var i = 10*this.score; i<200; i++){
    noStroke();
    fill(0,0,255);
    rect(this.x + random(10),this.y + random(60),1,1);
  }
}
