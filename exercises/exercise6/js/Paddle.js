// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
///////////////////fixed commented out comments
//Paddle constructor
//Sets the properties with the provided arguments or defaults
////////////////fixed pladdle to paddle
function Paddle(x,y,w,h,speed,downKey,upKey) {
  this.x = x;
  this.y = y;
  ///////////////////fixed yx and yv to vx and vy
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  /////////////////fixed speeed to speed
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
////////////fixed proto to prototype
Paddle.prototype.handleInput = function() {
  ///////////////////fixed keyDown to keyIsDown also added this. before upKey
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  ///////////////////fixed keyDown to keyIsDown also added this. before downKey
  else if (keyIsDown(this.downKey)) {
    //////////////fixed removed the negative to make it so that pressing the downkey makes a difference
    this.vy = this.speed;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  ///////////////fixed removed t from end of constrain hight to height
  this.y = constrain(this.y,0,height-this.h);
}

// display()
//
// Draw the paddle as a rectangle on the screen
////////////////fixed removed extra parenthesis fixed disploy to display
Paddle.prototype.display = function() {
  //////////////fixed rectangle to rect
  rect(this.x,this.y,this.w,this.h);
  console.log(this.y)
}
