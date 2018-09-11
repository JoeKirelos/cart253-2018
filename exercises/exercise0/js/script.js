// Exercise 0 - Spiritual Self-Portrait
// Pippin Barr
// 20 August 2018
//
// Uses p5's set of shape and colour functions to draw a head
// wearing a hat that Pippin claims is spiritually just like him.


// setup()
//
// Draws a beautiful face on the canvas and puts a hat on it!

function setup() {

  // Set up the canvas and give it a blueish color

  createCanvas(500,500);
  background("#4e89e8");


  //hair
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(250,200,140,100);

  fill("#d6a566");
  ellipse(250,250,172);
  //remainder of the hair
  fill(0);
  rect(250,165,140,20);
  rectMode(CORNER);
  fill(0,200);
  rect(180,165,25,30);
  strokeWeight(1/2);
  noStroke();
  triangle(180,195,180,235,205,195);
  //fade on the sides
  fill(0,150);
  quad(180,165,295,165,295,205,180,240);
  fill("#d6a566");
  arc(295,240,230,85,PI,TWO_PI-PI/2);
  rectMode(CORNER);
  rect(295,175,25,25);

//facial features
  fill("#d6a566");
    //chin
  triangle(180,300,320,300,280,345);
  strokeWeight(1/2);
  stroke(0);
  line(280,345,180,300);
    //glasses
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(292,235,30,35);
  arc(314,235,10,10,PI,TWO_PI);
  line(279,227,210,227);
  arc(210,239.5,25,25,PI/2,TWO_PI-PI/2);




  //trimming the circle base of the head for the sake of not looking like an alien
  fill("#4e89e8");
  rectMode(CORNER);
  noStroke(0);
  rect(320,200,30,100);
  rect(150,200,30,100);

  
}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
