// Portal
//
// A class that defines how a portale behaves, including bouncing off the top and bottom of the screen
// and warping balls to random locations

// Portal constructor
//
// Sets the properties with the provided arguments or defaults
function Portal(x,y,width,height,vy) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.vy= vy;
}
//update the paddle's position based on its velocity
//constrain its position to remain on screen
//make it bounce upon hitting the top or bottom edge
Portal.prototype.update = function(){
  this.y += this.vy;
  this.y = constrain(this.y,0,height,0,height);
  if (this.y === 0 || this.y === height) {
    this.vy = -this.vy;
}
}
//draw the portal as an ellipse on screen
Portal.prototype.display = function(){
  fill(0);
  stroke(255);
  strokeWeight(3);
  ellipse(this.x,this.y,this.width,this.height);
}
Portal.prototype.teleportation = function(ball) {
  // Check if the ball overlaps the portal on x axis
  if (this.x + this.width > ball.x && this.x < ball.x + ball.size) {
    // Check if the ball overlaps the portal on y axis
    if (this.y + this.height > ball.y && this.y < ball.y + ball.size) {
      //play the soundeffect of getting sucked into the portal
      suction.currentTime = 3.2;
      suction.play();
      //send the ball to a random location on screen
      ball.x = random(width);
      ball.y = random(height);
      var t=random();
      var t2=random();
      //potentially reverse the ball's velocity on the x axis
      if(t>=0.5){
        ball.vx = -ball.vx;
      }
      //potentially reverse the ball's velocity on the y axis
      if(t2>=0.5){
        ball.vy= -ball.vy
      }
    }
  }
}
