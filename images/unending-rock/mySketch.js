let detail = 40;
let radius = 120;
let container;

function setup() {
  container = document.getElementById('canvas-container');
  let w = container.clientWidth;
  let h = container.clientHeight;
  let canvas = createCanvas(w, h, WEBGL);
  canvas.parent('canvas-container');

//   createCanvas(600, 600, WEBGL);
  noiseDetail(3, 0.5);
  noStroke();
}

function draw() {
  background(0);
  
  let dx = cos(frameCount * 0.01);
  let dy = sin(frameCount * 0.005);
  let dz = sin(frameCount * 0.01);
  ambientLight(250);
  directionalLight(255, 255, 255, dx, dy, dz);

  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.007);
  rotateZ(frameCount * 0.007);

  // // yellow
  // let c1 = color('#ffffff');
  // let c2 = color('#123456');
  // let c3 = color('#987654');
  // // let c4 = color('#ffffff');
  // let c4 = color('#000000');

  // pink
  // let c1 = color(255, 170, 200); // pink
  // let c2 = color(180, 140, 255); // violet
  // let c3 = color(120, 180, 255); // sky
  // let c4 = color(255, 0, 0); // red

  // blue
  // let c1 = color(255,255,255); // white
  // let c2 = color(0,0,0); // black
  // let c3 = color(120, 180, 255); // sky
  // let c4 = color(0,0,255); // blue

  // black
//   let c1 = color(255,255,255); // white
//   let c2 = color(0,0,0); // black
//   let c3 = color(120, 180, 255); // sky
//   let c4 = color(0,0,0); // blue

        // let colA = lerpColor(c1, c2, n);
        // let colB = lerpColor(c3, c4, n);
        // let finalCol = lerpColor(colA, colB, n);
        // fill(finalCol);

// lerp
  let c1 = color(255, 170, 200); // pink
  let c2 = color(180, 140, 255); // violet
  let c3 = color(120, 180, 255); // sky
  let c4 = color(120, 180, 255); // sky
  let c5 = color(0, 128, 0); // green
        // let colA = lerpColor(c1, c2, n);
        // let colB = lerpColor(c3, c4, n);
        // let colC = lerpColor(c4, c5, n);
        // let middleCol = lerpColor(colA, colB, n);
        // let finalCol = lerpColor(middleCol, colC, n);
        // fill(finalCol);

  for (let i = 0; i < detail; i++) {
    beginShape(TRIANGLE_STRIP);
    let lat1 = map(i, 0, detail, -HALF_PI, HALF_PI);
    let lat2 = map(i+1, 0, detail, -HALF_PI, HALF_PI);

    for (let j = 0; j <= detail; j++) {
      let lon = map(j, 0, detail, -PI, PI);
      
      for (let k = 0; k < 2; k++) {
			let mX = map(mouseX, 0, width, -1.5, 1.5);
			let mY = map(mouseY, 0, height, -1.5, 1.5);

        let lat = k == 0 ? lat1 : lat2;

			let distortedLon = lon + mX * sin(lat * 2.0);
			let distortedLat = lat + mY * cos(lon * 2.0);
		  
        // let x = cos(lat) * cos(lon);
        // let y = sin(lat);
        // let z = cos(lat) * sin(lon);

		  let x = cos(distortedLat) * cos(distortedLon);
			let y = sin(distortedLat);
			let z = cos(distortedLat) * sin(distortedLon);

        // bump
        // let n = noise(x * 4.5 + frameCount * 0.01, y * 2.5, z * 1.5);
        let n = noise(x * 5.8, y * 3.5, z * 1.5);
        let r = radius * (0.9 + n * 0.3);
			r *= 1 + 0.3 * sin(lon * mX) * cos(lat * mX);

        // let colA = lerpColor(c1, c2, n);
        // let colB = lerpColor(c3, c4, n);
        // let finalCol = lerpColor(colA, colB, n);
        // fill(finalCol);
        let colA = lerpColor(c1, c2, n);
        let colB = lerpColor(c3, c4, n);
        let colC = lerpColor(c4, c5, n);
        let middleCol = lerpColor(colA, colB, n);
        let finalCol = lerpColor(middleCol, colC, n);
        fill(finalCol);

        vertex(x*r, y*r, z*r);
      }
    }
    endShape();
  }
}

function windowResized() {
  if (container) {
    let w = container.clientWidth;
    let h = container.clientHeight;
    
    resizeCanvas(w, h);
  }
}
