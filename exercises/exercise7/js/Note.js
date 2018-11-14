function Note(x,y,size,vy,orientation,icon,colorR,colorG,colorB,lane){
  this.x = x;
  this.y = y;
  this.size = size;
  this.vy = vy;
  this.orientation = orientation;
  this.icon = icon;
  this.colorR = colorR;
  this.colorG = colorG;
  this.colorB = colorB;
  this.lane = 0;
}

Note.prototype.update = function(){
  this.y = this.y + this.vy;
}
Note.prototype.display = function(){
  imageMode(CENTER);
  push();
  translate(this.x,this.y);
  rotate(this.orientation);
  tint(this.colorR,this.colorG,this.colorB);
  image(this.icon,0,0,this.size,this.size);
  pop();
}
 Note.prototype.handleScore = function(){
   for (var i=0; i<arrows.length; i++){
  if (this.y < arrows[i].y+25 && this.y > arrows[i].y-25){
  return true;
}
}
}
Note.prototype.offScreen = function(){
  if (this.y<0){
    return true;
  }
}
