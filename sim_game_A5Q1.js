function setup() {
  createCanvas(400, 400);
  //calling each new bubble class for the 5 bubbles
  Bubble1 = new Bubble(100, 200, 30, "green")
  Bubble2 = new Bubble(125, 200, 30, "green")
  Bubble3 = new Bubble(150, 200, 30, "green")
  Bubble4 = new Bubble(175, 200, 30, "green")
  Bubble5 = new Bubble(200, 200, 30, "green")
}

function draw() {
  background(220);
  //calling each classes move and show functions
  Bubble1.move();
  Bubble1.show();
  Bubble2.move();
  Bubble2.show();
  Bubble3.move();
  Bubble3.show();
  Bubble4.move();
  Bubble4.show();
  Bubble5.move();
  Bubble5.show();
}

class Bubble {
  constructor (x, y, rad, color){//setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color;
  }
  move(){//the move function which makes the bubbles move sparatically
    this.x = this.x + random(-5, 5)
    this.y = this.y + random(-5, 5)
  }
  show(){
    fill(this.color)//makes them green
    ellipse(this.x, this.y, this.rad)//makes the circle the size inputted when the class is called
    
  }
}
