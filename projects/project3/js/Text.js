function Generator(tToType,tTyped,tOut1,tOut2){
  this.tToType = tToType;
  this.tTyped = tTyped;
  this.tOut1 = tOut1;
  this.tOut2 = tOut2;
  this.index = 0;
  this.initial = true;
}

Generator.prototype.generate = function(){
if (this.index <= 11){
  var type = this.tTyped.substring(0,this.index);
this.tToType = type;
 if (this.tToType.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
  beep.play();
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
}else if (this.index <=32){
  var type = this.tTyped.substring(11,this.index);
this.tToType = type;
 if (this.tToType.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
  beep.play();
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
}else if (this.index <=48){
  var type = this.tTyped.substring(33,this.index);
this.tToType = type;
 if (this.tToType.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
  beep.play();
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
}else if (this.index <=65){
  var type = this.tTyped.substring(50,this.index);
this.tToType = type;
 if (this.tToType.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
  beep.play();
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
}else if (this.index > 65){
  this.initial = false;
}
}

Generator.prototype.display = function(){
  fill(255);
  textSize(42);
  textFont(font);
  text(this.tToType,50, height/3,width-25);
}
