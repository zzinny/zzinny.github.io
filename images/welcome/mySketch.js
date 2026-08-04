let car;

function setup() {
  let container = document.getElementById('canvas-container');
  let w = container ? container.clientWidth : 800;
  let h = container ? container.clientHeight : 700;
  
  let canvas = createCanvas(w, h);
  if (container) canvas.parent('canvas-container');
  
  background(255);
  car = new Mover();
}

function draw() {
//   background(255); 
  
  car.update();
  car.checkEdges();
  car.display();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    car.speedUp();
  } else if (keyCode === DOWN_ARROW) {
    car.speedDown();
  }
}

class Mover {
  constructor() {
    this.minSpeed = 0.01;
    this.maxSpeed = 2;
    
    this.location = createVector(10, height / 2);
    this.velocity = createVector(this.minSpeed, this.minSpeed);
    this.acceleration = createVector(0, 0);
  }
  
  update() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.05);
    this.acceleration = dir;
    
    this.velocity.add(this.acceleration);
    
    this.velocity.limit(this.maxSpeed);
    if (this.velocity.mag() < this.minSpeed) {
      this.velocity.normalize().mult(this.minSpeed);
    }
    
    this.location.add(this.velocity);
  }
  
  speedUp() {
    this.velocity.add(this.acceleration);
  }
  
  speedDown() {
    this.velocity.sub(this.acceleration);
  }
  
  display() {
    let r = min(width, height) * 0.2;
    fill(97, 255, 163);
    stroke(175);
    ellipse(this.location.x, this.location.y, r, r);
  }
  
  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }
    
    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}

function windowResized() {
  let container = document.getElementById('canvas-container');
  if (container) {
    resizeCanvas(container.clientWidth, container.clientHeight);
  }
}