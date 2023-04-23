let Bubbles = []; //empty list for the bubbles
let mice = []; //empty list for the mice
let fox = []; //empty list for the foxes
function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 100; i++) {
    //calls in the 50 bubbles with a loop
    let x = random(height); //set the random x for each bubble
    let y = random(width); //set the random y for each bubble
    let r = random(20, 40); //set the random radius for each bubble
    colorList = ["green", "lightgreen", "darkgreen"]; //list of colors to use
    let color = random(colorList); //makes the variable color call a random item from the list
    Bubbles[i] = new Bubble(x, y, r, color); //calls each bubble for every i value with each parameter
  }
  startingMice = 20; //number of mice
  startingFox = 2; //number of foxes
  angleMode(DEGREES);
  addX = -4; //speed of the animals
  spriteWidth = 50;
  spawnDelay = 30; //ensures touching breeders don't make dozens of mice at once
  framesDelayed = 0;
  collisionDistance = 50; //distance of detection for the collision between the animals
  startHealth = 500; //starting health of the foxes before they die

  for (let miceDefined = 0; miceDefined < startingMice; miceDefined++) {
    //loop for drawing mice
    let miceX = random(width); //random starting x position along the canvas
    let miceY = random(height); //random starting y position along the canvas
    mice.push(new Mice(miceX, miceY)); //add the new mice to the empty mice list
  }
  for (let foxDefined = 0; foxDefined < startingFox; foxDefined++) {
    //loop for drawing foxes
    let foxX = random(width);
    let foxY = random(height);
    fox.push(new Fox(foxX, foxY)); //add the new foxes to the empty fox list
  }
}

function draw() {
  background("saddlebrown");
  framesDelayed++;
  //UPDATE BUBBLES
  for (let i = 0; i < Bubbles.length; i++) {
    //calls the functions based on the length of the previous for loop
    Bubbles[i].move(); //calls the function move in the bubble class
    Bubbles[i].show(); //calls the function show in the bubble class
  }
  //UPDATE MICE
  for (let miceShown = 0; miceShown < mice.length; miceShown++) {
    let thisMice = mice[miceShown];
    thisMice.update(); //calling the update function in the mice class
    thisMice.show(); //calling the show function in the mice class
    if (framesDelayed > spawnDelay) {
      for (let matesChecked = 0; matesChecked < mice.length; matesChecked++) {
        let proposedMate = mice[matesChecked];
        let isDiffMice = miceShown !== matesChecked;
        let spriteDist = dist(
          thisMice.x,
          thisMice.y,
          proposedMate.x,
          proposedMate.y
        );
        if (isDiffMice && isTouching(thisMice, proposedMate)) {
          //checks if mice are touching, then makes a new mouse at a random position
          let miceX = random(width);
          let miceY = random(height);
          mice.push(new Mice(miceX, miceY)); //adds the new mouse to the mice array
          framesDelayed = 0; //resets the frames for mice breeding
          break; //ends the loop
        }
      }
    }
  }
  //UPDATE FOXES
  for (let foxShown = 0; foxShown < fox.length; foxShown++) {
    let thisFox = fox[foxShown];
    thisFox.update(); //calling the update function in the fox class
    thisFox.show(); //calling the show function in the fox class
    if (thisFox.health < 0) {
      //if the foxes health goes below 0
      fox.splice(foxShown, 1); //delete the fox from the fox array
    }
    for (let breedersLeft = 0; breedersLeft < mice.length; breedersLeft++) {
      let proposedCatch = mice[breedersLeft];
      if (isTouching(thisFox, proposedCatch)) {
        //checks if fox is touching a mouse
        mice.splice(breedersLeft, 1); //deletes the mouse from the mice array
        thisFox.health = startHealth; //resets fox health to the max
        break; //ends the loop
      }
    }
  }
}
function isTouching(sprite1, sprite2) {
  //detects collision between two sprites based on the distance between them
  let spriteDist = dist(sprite1.x, sprite1.y, sprite2.x, sprite2.y);
  if (spriteDist < spriteWidth) {
    return true;
  } else {
    return false;
  }
}
//CLASSES FOR BUBBLES, MICE, AND FOXES
class Bubble {
  constructor(x, y, rad, color) {
    //setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.color = color;
  }
  move() {
    //the move function which makes the bubbles move sparatically
    this.x = this.x + random(-1, 1); //change x by random
    this.y = this.y + random(-1, 1); //change y by random
  }
  show() {
    fill(this.color); //makes them green
    ellipse(this.x, this.y, this.rad); //makes the circle the size inputted when the class is called
  }
}

class Mice {
  constructor(x, y) {
    //setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.addX = addX;
  }
  update() {
    //update the movement of the mice
    this.x = this.x + this.addX;
    this.y = this.y;
    // Reverse if it hits a wall.
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX; //sprite changing direction
      this.y = random(height); //sets new random y position
    }
  }
  show() {
    push();
    translate(this.x, this.y); //drawing the mouse sprite
    fill("grey");
    rotate(this.addX * -22.5); //sprite changing direction
    scale(0.5);
    ellipse(0, 0, 75); //main body
    fill("pink"); //ears
    ellipse(15, 0, 30);
    ellipse(-15, 0, 30);
    fill("grey"); //face and nose
    ellipse(0, 20, 50);
    triangle(10, 40, -10, 40, 0, 55);
    fill("black"); //eyes
    ellipse(10, 25, 18);
    ellipse(-10, 25, 18);
    fill("white");
    ellipse(7, 22, 7);
    ellipse(-13, 22, 7);
    pop();
  }
}

class Fox {
  constructor(x, y) {
    //setting up the variables to make them for the class
    this.x = x;
    this.y = y;
    this.addX = addX;
    this.health = startHealth;
  }
  update() {
    //update the movement of the foxes
    this.x = this.x + this.addX;
    this.y = this.y;
    // Reverse if it hits a wall.
    let isTooFarLeft = this.x < 0;
    let isTooFarRight = this.x > width;
    if (isTooFarLeft || isTooFarRight) {
      this.addX = -this.addX; //spite changing direction
      this.y = random(height);
    }
    this.health--; //lowers the foxes health by one each time
  }
  show() {
    push();
    translate(this.x, this.y); //drawing the fox sprite
    rotate(this.addX * -22.5); //sprite changing direction
    fill("orange");
    ellipse(0, 0, 75); //main body
    fill("white"); //ears
    triangle(25, 10, 10, 0, 25, -15);
    triangle(-25, 10, -10, 0, -25, -15);
    fill("orange"); //head
    ellipse(0, 20, 50);
    fill("black"); //eyes and nose
    ellipse(10, 25, 18);
    ellipse(-10, 25, 18);
    rect(-5, 42, 10, 5);
    fill("white"); //eyes
    ellipse(7, 22, 7);
    ellipse(-13, 22, 7);
    pop();
  }
}
