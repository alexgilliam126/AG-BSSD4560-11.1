let planeBounds = 2
function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(120);
  let truePink = color(255, 102, 204);
  pixelDensity(1);
  loadPixels();
  
 
  for (let y = 0; y < height; y ++) {
    for (let x = 0; x < width; x++) {
      const planeBounds = 2;
      let xfrac = map(x, 0, width, -planeBounds, planeBounds);
      let yfrac = map(y, 0, height, -planeBounds,planeBounds);
      let i = (x + y * width) * 4;
      let inf = 16;
      let maxIter = 100;
      let n = 0;
      
      
      let a = xfrac;
      let b = yfrac;
      for (n = 0; n < maxIter; n++) {
        let aa = sq(a) - sq(b);
        let bb = 2 * a * b;
        a = aa + a;
        b = bb + b;
        if (abs(a + b) > inf) {
          pixels[i] = red(truePink);
          pixels[i + 1] = green(truePink);
          pixels[i + 2] = blue(truePink)
          pixels[i + 3] = alpha(truePink);
          break;
        }
      }
      
      if (n ==maxIter) {
        pixels[i] = red(truePink);
        pixels[i + 1] = green(truePink);
        pixels[i + 2] = blue(truePink)
        pixels[i + 3] = alpha(truePink);
      }
      updatePixels();
  }
    
function mouseClicked(){
  planeBounds-=0.5;
  draw();
}