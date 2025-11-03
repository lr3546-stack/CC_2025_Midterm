let c1; 
let c2;
let numLines = 6;
let lineYs = [];
let offsets = [];
let waveHeight = 40;
let floats = []; // Floating circle particles
let numFloats = 500;      // how many floating circles

function setup(){
  createCanvas(windowWidth, windowHeight);
  noFill();
  for (let i = 0; i < numLines; i++){
    lineYs[i]   = map(i, 0, numLines-1, height*0.4, height*0.9);
    offsets[i]  = random(TWO_PI);
  }
  c1 = color(0, 59, 73);       // darkish blue
  c2 = color(235, 251, 255);   // 
  
   // initialize floating circles
  for (let i = 0; i < numFloats; i++){
    let r = random(5, 20);            // radius
    let x = random(width*0.6, width - r);
    let y = random(r, height*0.3);
    let dx = random(-0.5, 0.5);
    let dy = random(-0.2, 0.2);
    let col = color(255, 200, 50, 150);  // light yellowish with transparency
    floats.push({ x, y, r, dx, dy, col });
}
}


function draw(){
  // draw gradient background
  for (let y = 0; y < height; y++){
    let t = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, t);
    stroke(c);
    line(0, y, width, y);
  }
    // draw wave lines on top
  drawOceanLines();
    // draw floating circles on top
  noStroke();
  for (let f of floats){
    fill(f.col);
    circle(f.x, f.y, f.r * 2);

    // update position
    f.x += f.dx;
    f.y += f.dy;
}
}



function drawOceanLines(){
  strokeWeight(90);
  for (let i = 0; i < numLines; i++){
    let y0    = lineYs[i];
    let amp   = waveHeight * map(i, 0, numLines-1, 0.3, 1.0);
    let speed = 0.02 + i * 0.005;
    let col   = lerpColor(color(0,150,200), color(177,240,255), i/(numLines-1));
    stroke(col);

    beginShape();
      vertex(0, y0);
      let segments = 8;
      let segW     = width / segments;
      for (let j = 0; j < segments; j++){
        let x1 = j * segW;
        let x2 = (j+1) * segW;
        let cx1 = x1 + segW*0.3;
        let cy1 = y0 + amp * sin((j + offsets[i]) * PI/segments * 2);
        let cx2 = x2 - segW*0.3;
        let cy2 = y0 + amp * sin((j+1 + offsets[i]) * PI/segments * 2);
        let ax  = x2;
        let ay  = y0 + amp * sin((j+0.5 + offsets[i]) * PI/segments * 2);
        bezierVertex(cx1, cy1, cx2, cy2, ax, ay);
      }
      vertex(width, y0);
    endShape();

    offsets[i] += speed;
  }
}