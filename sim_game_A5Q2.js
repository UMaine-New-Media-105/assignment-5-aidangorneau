let Bubbles = []//empty list for the bubbles
function setup() {
  createCanvas(600, 600);
  for(let i = 0; i < 50; i++){//calls in the 50 bubbles with a loop
    let x = random(height)//set the random x for each bubble
    let y = random(width)//set the random y for each bubble
    let r = random(20, 40)//set the random radius for each bubble
    colorList = ["green", "brown"]//list of colors to use
    let color = random(colorList)//makes the variable color call a random item from the list
    Bubbles[i] = new Bubble(x, y, r, color)//calls each bubble for every i value with each parameter 
  }
}

function draw() {
  background("lightgreen");
  for (let i = 0; i < Bubbles.length; i++){//calls the functions based on the length of the previous for loop
    Bubbles[i].move();//calls the function move in the bubble class
    Bubbles[i].show();//calls the function show in the bubble class
  }
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
