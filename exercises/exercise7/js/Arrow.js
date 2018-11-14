//Arrow
//
//an object that handles each of the arrows

//the object handles its x and y positions
//handles its size and orientation its icon and tint colors
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
// its display method
// sets the image mode to center so its x and y positions are those of the middle of the arrow
Arrow.prototype.display = function(){
  imageMode(CENTER);
  push();
  //translate the origin to the middle of the arrow so the roatation is around its own axis instead of around the origin
  translate(this.x,this.y);
  //rotate by the orientation in the argument
  rotate(this.orientation);
  //tint the arrow by the color values in the argument and since the original arrow is white it sets its color
  tint(this.colorR,this.colorG,this.colorB);
  //draw the image at 0,0 which is set to this x and y since it was already translated there
  image(this.icon,0,0,this.size,this.size);
  pop();
}
