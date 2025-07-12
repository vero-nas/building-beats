// From: https://editor.p5js.org/Greenfishyy/sketches/KuQyJmcOE

const sound = new SimplePlayer("sounds/hello.wav");
sound.toDestination();
let analyzer = new Tone.FFT(512);
sound.connect(analyzer);

let loaded = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (loaded) {
    background(10);
    let frequencyData = analyzer.getValue();

    // Draw circles based on the frequency data
    fill(255, 0, 255);
    stroke(0,255,255,50);
    strokeWeight(5);
    for (let i = 0; i < frequencyData.length; i++) {
      let x = map(log(i), 0, log(frequencyData.length), 0, width);
      let y = map(frequencyData[i], -200, 0, height, 0);
      let circleSize = map(frequencyData[i], -100, 0, 5, 50);
      ellipse(x, y, circleSize, circleSize);
    }
  } else {
    background(220);
    text("loading...", 20, 20);
  }
}

function mouseClicked() {
  if (loaded) {
    sound.start();
  }
}

Tone.loaded().then(function () {
  loaded = true;
});
