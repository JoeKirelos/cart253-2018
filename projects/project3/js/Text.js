function Generator(tToType,tTyped,tOut1,tOut2){
  this.tToType = tToType;
  this.tTyped = tTyped;
  this.tOut1 = tOut1;
  this.tOut2 = tOut2;
  this.index = 0;
}

Generator.prototype.generate = function(){
  if (this.index<=this.tTyped.length){
    var type = this.tTyped.substring(0,this.index);
  this.tToType = type;
  if (this.tToType.substring(this.index-1,this.index)===' '){
    setTimeout(this.generate.bind(this),this.tOut1);
    beep.play();
  }else {
    setTimeout(this.generate.bind(this),this.tOut2);
    beep.play();
  }
  this.index++
}
}


Generator.prototype.display = function(){
  fill(255);
  textSize(42);
  text(this.tToType,50, height/3,width-25);
}
