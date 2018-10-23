// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
// as well as keep its score and change its appearance

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
  //////////////////NEW//////////////////
  //gave the paddles a score property
  this.score = 0;
  //////////////////END NEW//////////////////
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

/////////////////New////////////////
//allow edge wrap
Paddle.prototype.update = function() {
  this.y += this.vy;
  if (this.y>height){
    this.y-=height;
  }if (this.y<0){
    this.y+= height;
  }
}
//////////////////End New////////////////

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  //////////////new///////////////////
  //make the paddle get progressively redder based on the score
  var color = map(this.score,0,25,255,0);
  push();
  fill(255,color,color);
  rect(this.x,this.y,this.w,this.h);
  pop();
  // add blue static inside of the PADDLES if score is less than 25
  if(this.score<25){
  push();
  var t = random(0,800);
  for (var i = 0; i < t; i++ ) {
    fill(0,0,255);
    noStroke()
    // each rectangle is a spot of the static offset the x and y of the paddle
    // the loop draws a random number of them up to 800
    rect(this.x+map(random(),0,1,0,10),this.y+map(random(),0,1,0,60),1,1);
  }
  pop()
}
  //////////////////END NEW//////////////
}
