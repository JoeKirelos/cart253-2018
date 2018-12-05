//Notes
//
//an object that handles the notes

//handles their x and y position, their size, speed and orientation
//sets a property to hold their images
//handles the color values of their tint
//knows which lane they are on
function Note(x,y,size,vy,orientation,icon,hexColor,lane){
  this.x = x;
  this.y = y;
  this.size = size;
  this.vy = vy;
  this.orientation = orientation;
  this.icon = icon;
  this.hexColor = hexColor;
  this.lane = lane;
}
//its update method
// update its position by its y velocity(or speed since the notes only move on the vertical or y axis)
Note.prototype.update = function(){
  this.y = this.y + this.vy;
}
//its display method
// sets the image mode to center so its x and y positions are those of the middle of the note
Note.prototype.display = function(){
  imageMode(CENTER);
  push();
  //translate the origin to the middle of the arrow so the roatation is around its own axis instead of around the origin
  translate(this.x,this.y);
  //rotate by the orientation in the argument
  rotate(this.orientation);
  //tint the arrow by the color values in the argument and since the original arrow is white it sets its color
  tint(this.hexColor);
  //draw the image at 0,0 which is set to this x and y since it was already translated there
  image(this.icon,0,0,this.size,this.size);
  pop();
}

//its score handling method, I call it score handling despite the game not keeping score because it handles the overlap between notes and arrows
 Note.prototype.handleScore = function(){
   // check the y position of this note and check if it overlaps with each of the arrows y positions within a 50 pixel margin
  for (var i=0; i<arrows.length; i++){
    if (this.y < arrows[i].y+15 && this.y > arrows[i].y-15){
    //return true if it works
      return true;
      }
    }
}
//its off screen value checks if this y position is off screen
Note.prototype.offScreen = function(){
  if (this.y<0){
    //return true if it did
    return true;
  }
}
