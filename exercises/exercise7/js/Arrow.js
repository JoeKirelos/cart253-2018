function Arrow(x,y,size,orientation,icon,colorR,colorG,colorB){
  this.x = x;
  this.y = y;
  this.size = size;
  this.orientation = orientation;
  this.icon = icon;
  this.colorR = colorR;
  this.colorG = colorG;
  this.colorB = colorB;
}

Arrow.prototype.display = function(){
  imageMode(CENTER);
  push();
  translate(this.x,this.y);
  rotate(this.orientation);
  tint(this.colorR,this.colorG,this.colorB);
  image(this.icon,0,0,this.size,this.size);
  pop();
}
