let Bubbles = []//empty list for the bubbles
let mice = []//empty list for the mice
let fox = []
function setup() {
  createCanvas(600, 600);
  for(let i = 0; i < 100; i++){//calls in the 50 bubbles with a loop
    let x = random(height)//set the random x for each bubble
    let y = random(width)//set the random y for each bubble
    let r = random(20, 40)//set the random radius for each bubble
    colorList = ["green", "lightgreen", "darkgreen"]//list of colors to use
    let color = random(colorList)//makes the variable color call a random item from the list
    Bubbles[i] = new Bubble(x, y, r, color)//calls each bubble for every i value with each parameter 
  }
  startingMice = 20//number of mice
  startingFox = 2//number of foxes
  angleMode(DEGREES)
  addX = -4;//speed of the animals
  collisionDistance = 50;//distance of detection for the collision between the foxes and mice
  
  for (let miceDefined = 0; miceDefined < startingMice; miceDefined++){//loop for drawing mice
    let miceX = random(width);//random starting x position along the canvas
    let miceY = random(height);//random starting y position along the canvas
    mice.push(new Mice(miceX, miceY))//add the new mice to the empty mice list
  }
  for (let foxDefined = 0; foxDefined < startingFox; foxDefined++){//loop for drawing foxes
    let foxX = random(width);
    let foxY = random(height);
    fox.push(new Fox(foxX, foxY))//add the new foxes to the empty fox list
  }
}

function draw() {
  background("saddlebrown");
  for (let i = 0; i < Bubbles.length; i++){//calls the functions based on the length of the previous for loop
    Bubbles[i].move();//calls the function move in the bubble class
    Bubbles[i].show();//calls the function show in the bubble class
  }
  for (let miceShown = 0; miceShown < mice.length; miceShown++){//draw the mice in the mice list
    let thisMice = mice[miceShown]
    thisMice.update();//calling the update function in the mice class
    thisMice.show();//calling the show function in the mice class
  }
  for (let foxShown = 0; foxShown < fox.length; foxShown++){//draw the foxes in the fox list
    let thisFox = fox[foxShown]
    thisFox.update();//calling the update function in the fox class
    thisFox.show();//calling the show function in the fox class
  }
  // for ( let kidShown = 0; kidShown < mice.length; kidShown++) {
  //   mice[kidShown].update();
  //   mice[kidShown].show();
  // }
  
  // Detect collisions and breed kid.
  // let distanceApart = dist(mice1.x, mice1.y, mice2.x, mice2.y);
  // if (distanceApart < collisionDistance) {
  //   let miceX = random(width);
  //   let miceY = random(height);
  //   mice.push(new Mice(miceX, miceY));
  //   console.log("collision detected")
  // }
}

class Bubble {
  constructor (x, y, rad, color){//setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color;
  }
  move(){//the move function which makes the bubbles move sparatically
    this.x = this.x + random(-1, 1)//change x by random 
    this.y = this.y + random(-1, 1)//change y by random
  }
  show(){
    fill(this.color)//makes them green
    ellipse(this.x, this.y, this.rad)//makes the circle the size inputted when the class is called
    
  }
}

class Mice {
  constructor(x, y) {//setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.addX = addX;
    this.movingRight = false;
  }
  update() {//update the movement of the mice 
    this.x = this.x + this.addX;
    this.y = this.y;
    // Reverse if it hits a wall.
    let isTooFarLeft = (this.x < 0);
    let isTooFarRight = (this.x > width);
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.movingRight = !this.movingRight;
      this.y = random(height);
    }
  }
  show() {
    push();
    //sprite changing direction check
    let d = 1;
    if (this.movingRight){
      d = -d;
    }
    translate(this.x, this.y);//drawing the mouse sprite
    fill("grey")
    rotate(90)
    scale(0.5)
    ellipse(0*d, 0, 75)//main body
    fill("pink")
    ellipse(15*d, 0, 30)
    ellipse(-15*d, 0, 30)
    fill("grey")
    ellipse(0*d, 20, 50)
    triangle(10, 40, -10, 40, 0, 55)
    fill("black")
    ellipse(10, 25, 18)
    ellipse(-10, 25, 18)
    fill("white")
    ellipse(7, 22, 7)
    ellipse(-13, 22, 7)
    pop();
  }
}

class Fox {
  constructor(x, y) {//setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.addX = addX;
  }
  update() {//update the movement of the foxes
    this.x = this.x + this.addX;
    this.y = this.y;
    // Reverse if it hits a wall.
    let isTooFarLeft = (this.x < 0);
    let isTooFarRight = (this.x > width);
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX;
      this.y = random(height);
    }
  }
  show() {
    push();
    translate(this.x, this.y);//drawing the fox sprite
    rotate(this.addX - 95)
    fill("orange")
    ellipse(0, 0, 75)//main body
    fill("white")
    triangle(25, 10, 10, 0, 25, -15)
    triangle(-25, 10, -10, 0, -25, -15)
    fill("orange")
    ellipse(0, 20, 50)
    fill("black")
    ellipse(10, 25, 18)
    ellipse(-10, 25, 18)
    rect(-5, 42, 10, 5)
    fill("white")
    ellipse(7, 22, 7)
    ellipse(-13, 22, 7)
    pop();
  }
}
