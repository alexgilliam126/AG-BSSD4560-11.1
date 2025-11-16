let planeBounds = 2;
let maxIterSlider;

function setup() {
  createCanvas(400, 400);

  // Slider to control maxIter: min 10, max 200, initial 50
  maxIterSlider = createSlider(10, 200, 50);
  maxIterSlider.position(10, height + 10);
  maxIterSlider.style('width', '200px');

  pixelDensity(1);
  noStroke();
  colorMode(HSB, 360, 100, 100); // HSB mode for easy gradient
}

function draw() {
  let maxIter = maxIterSlider.value(); // get current slider value

  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let xfrac = map(x, 0, width, -planeBounds, planeBounds);
      let yfrac = map(y, 0, height, -planeBounds, planeBounds);

      let a = xfrac;
      let b = yfrac;

      let n = 0;
      let inf = 16;

      // Mandelbrot iteration
      for (n = 0; n < maxIter; n++) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + xfrac;
        b = bb + yfrac;

        if (a * a + b * b > inf) break;
      }

      let i = (x + y * width) * 4;
      let bright;

      if (n === maxIter) {
        // Inside Mandelbrot set → solid blue
        bright = color(210, 100, 100); // HSB: hue=210=blue, sat=100, bright=100
      } else {
        // Escaped → map n to pink shades
        let hue = map(n, 0, maxIter, 330, 350); // pink hue range in HSB
        let sat = map(n, 0, maxIter, 50, 100);
        let bri = map(n, 0, maxIter, 50, 100);
        bright = color(hue, sat, bri);
      }

      // Write to pixels
      pixels[i]   = red(bright);
      pixels[i+1] = green(bright);
      pixels[i+2] = blue(bright);
      pixels[i+3] = 255;
    }
  }

  updatePixels();
}
