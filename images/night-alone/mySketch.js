// WCCChallenge: Must be Moved

let ship;
let starX, starY;
let stars = [];
let container;

function setup() {
  container = document.getElementById('canvas-container');
  let w = container.clientWidth;
  let h = container.clientHeight;
  let canvas = createCanvas(w, h, WEBGL);
  canvas.parent('canvas-container');

  noStroke();
  ship = new Ship(300, 50, 0, 1, 0.2, 0, 0, 0, 0);
  setStars();
}

function draw() {
	background(0);
	
	randomSeed(123);
	
	wave();
	ship.update();
	ship.display();
	drawStars();
}

function wave() {
	colorMode(RGB);
	
	push();
	translate(-width/2, 0, 0);
	
	beginShape(QUADS);
	let quadWidth = 30;
	let quadDepth = 5; // 2.5, 5
	let rows = 160; // 320, 160
	let cols = width / quadWidth;
	let maxHeight = 200;
	let f = frameCount * 0.002;
	
	noStroke();
	
	for (let z=0; z<rows; z++) {
		
		// let redLevel = map(z, 0, rows, 200, 0);
		// let greenLevel = map(z, 0, rows, 230, 0);
		let blueLevel = map(z, 0, rows, 0, 230);
		let c = color(0,0,blueLevel,180);
		// let c = color(redLevel, greenLevel, 255);
		fill(c);
		
		for (let x=0; x<cols; x++) {
			let x1 = x * quadWidth;
			let z1 = z * quadDepth;
			let z2 = (z+1) * quadDepth;
			let x2 = (x+1) * quadWidth;

			let y1 = map(noise(x*0.05, f, z*0.05),0,1,0,maxHeight);
			let y2 = map(noise(x*0.05, f, (z+1)*0.05), 0,1,0,maxHeight);
			let y3 = map(noise((x+1)*0.05, f, (z+1)*0.05), 0,1,0,maxHeight);
			let y4 = map(noise((x+1)*0.05, f, z*0.05), 0,1,0,maxHeight);

			vertex(x1, y1, z1);
			vertex(x1, y2, z2);
			vertex(x2, y3, z2);
			vertex(x2, y4, z1);
		}
	}
	endShape();
	pop();
}

function drawStars() {
	push();
	translate(starX, starY, 0);
	noStroke();
	fill(255,30);
	for (let star of stars) {
		let x = star[0];
		let y = star[1];
		let size = star[2];
		circle(x,y,size);
	}
	pop();
}

function setStars() {
	starX = random(-width/2+30, width/2-30);
	starY = random(-height/2+30, -300);
	
	push();
	translate(starX, starY, 0);
	for (let i=0; i<9000; i++) {
		let r = random(30,1000) * random(1);
		let a = random(2*PI);
		let x = r * cos(a);
		let y = r * sin(a);
		
		let starSize = random(5);
		if (r < 15) {
			starSize = 15;
		}
		
		stars[i] = [x,y,starSize];
	}
	pop();
}

function keyPressed() {
	if (key == 's' || key == 'S') {
		noLoop();
	} else if (key == 'r' || key == 'R') {
		loop();
	}
}

function windowResized() {
  if (container) {
    let w = container.clientWidth;
    let h = container.clientHeight;
    
    resizeCanvas(w, h);
  }
}