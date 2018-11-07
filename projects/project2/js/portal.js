function Portal(x,y,width,height,vy) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.vy= vy;
}

Portal.prototype.update = function(){
  this.y += this.vy;
  this.y = constrain(this.y,0,height,0,height);
  if (this.y === 0 || this.y === height) {
    this.vy = -this.vy;
}
}

Portal.prototype.display = function(){
  fill(0);
  stroke(255);
  strokeWeight(3);
  ellipse(this.x,this.y,this.width,this.height);
  //console.log(this.x,this.y);
}
Portal.prototype.teleportation = function(ball) {
  // Check if the ball overlaps the portal on x axis
  if (this.x + this.width > ball.x && this.x < ball.x + ball.size) {
    // Check if the ball overlaps the portal on y axis
    if (this.y + this.height > ball.y && this.y < ball.y + ball.size) {
      console.log("touched")
      ball.x = random(width);
      ball.y = random(height);
      var t=random();
      var t2=random();
      if(t>=0.5){
        ball.vx = -ball.vx;
      }
      if(t2>=0.5){
        ball.vy= -ball.vy
      }
    }
  }
}
