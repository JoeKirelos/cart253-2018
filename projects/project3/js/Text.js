//text
//
//an object that handles text appearing on screen letter by letter

//it holds 2 string variables, the toType variable is the one that gets displayed on scrreen, it starts empty
//  the tTyped variable is the one that holds the string intended to be typed out.
//tOut are the values for the time out between letters, tOut1 is twice as long as is used for spaces.
//the index is variable used for the substring
// initial communicates whether or not the text is over yet.
// starts and end communicate the begining and ending of each message
function Generator(tToType,tTyped,tOut1,tOut2,firstStart,firstEnd,secondEnd,thirdEnd,fourthEnd){
  this.tToType = tToType;
  this.tTyped = tTyped;
  this.tOut1 = tOut1;
  this.tOut2 = tOut2;
  this.index = 0;
  this.initial = true;
  this.firstStart = firstStart;
  this.firstEnd = firstEnd;
  this.secondEnd = secondEnd;
  this.thirdEnd = thirdEnd;
  this.fourthEnd = fourthEnd;
}

// the generate method.
// uses the index to update tToType based on tTyped substrings.
// the numbers in each if statement are the number of substrings per message.
Generator.prototype.generate = function(){
  //if the index is less than 11, then display each of those 11 characters one by one
  // once it's over reset the tToType variable and repeat with the next message
if (this.index <= this.firstEnd){
  var type = this.tTyped.substring(this.firstStart,this.index);
 this.tToType = type;
 if (this.tTyped.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
//next message is from substring 11 to 32
}else if (this.index <=this.secondEnd){
  var type = this.tTyped.substring(this.firstEnd,this.index);
 this.tToType = type;
 if (this.tTyped.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
//substring 33 to 48 is the 3rd message
}else if (this.index <=this.thirdEnd){
  var type = this.tTyped.substring(this.secondEnd,this.index);
 this.tToType = type;
 if (this.tTyped.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
//last message is 48 to 65
}else if (this.index <=this.fourthEnd){
  var type = this.tTyped.substring(this.thirdEnd,this.index);
 this.tToType = type;
 if (this.tTyped.substring(this.index-1,this.index)===' '){
  setTimeout(this.generate.bind(this),this.tOut1);
}else {
  setTimeout(this.generate.bind(this),this.tOut2);
  beep.play();
}
this.index++;
}else if (this.index > this.fourthEnd){
  //if all the letters have been typed make initial false
  // which in the script moves on to the song part of the program
  this.initial = false;
}
}

//the display function handles the display of the tToType string on screen
Generator.prototype.display = function(){
  fill(255);
  textSize(42);
  textFont(font);
  text(this.tToType,50, height/3,width-25);
}
