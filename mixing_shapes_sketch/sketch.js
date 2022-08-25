// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file

let divA, divB;
let r, n, m, h;
let rSlider, nSlider, mSlider, hSlider;
let img;
let theShader;
let sel1, sel2, spanh, s, mx;

function preload() {
  // load the shader
  theShader = loadShader('super.vert', 'super.frag');
  img = loadImage('beads.png');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();

  // Controls for shader
  divA = createDiv().position(50, 630).class('flex-container');
  let para2 = createP('Combining Shapes').parent(divA);

  para = createP('Choose some shapes to mix:').parent(divA);
  sel2 = createSelect().parent(divA).class('dropdown');
  sel2.option('Circle', '0');
  sel2.option('Star', '1');
  sel2.option('triangle', '2');
  sel2.option('Koch', '3');
  sel2.selected('0');

  sel3 = createSelect().parent(divA).class('dropdown');
  sel3.option('Circle', '0');
  sel3.option('Box', '1');
  sel3.selected('1');


  s = createSpan("scale: ").parent(divA);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

  mx = createSpan("mix: ").parent(divA);
  mixSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

  h = createSpan("depth: ").parent(divA);
  hSlider = createSlider(0, 10, 5, 1).style('width', '180px').parent(divA);

  divB = createDiv().position(400, 630).class('flex-container'); // For star shape
  starP = createP('Star parameters:').parent(divB);
  let spanr = createSpan("r: ").parent(divB);
  rSlider = createSlider(1, 10, 5, 1).style('width', '180px').parent(divB);

  let spann = createSpan("n: ").parent(divB);
  nSlider = createSlider(1, 20, 8, 1).style('width', '180px').parent(divB);

  let spanm = createSpan("m: ").parent(divB);
  mSlider = createSlider(1, 20, 6, 1).style('width', '180px').parent(divB);

}

function draw() {
  background(0);
  //let choice = sel1.value();
  let shape1 = sel2.value();
  let shape2 = sel3.value();

  let sc = scaleSlider.value();
  let newSC = map(sc, 1, 20, 0.0, 1.0);
  let mixValue = mixSlider.value();
  let newMV = map(mixValue, 1, 20, 0.0, 1.0);
  let ht = hSlider.value();
  let newH = map(ht, 1, 10, 0.0, 1.0);
  r = rSlider.value();
  let newR = map(r, 0, 10, 0.0, 0.5);
  n = nSlider.value();
  let newN = int(map(n, 1, 20, 0.0, 1.0));
  m = mSlider.value();
  let newM = map(m, 1, 20, 0.0, 1.0);

  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis() / 1000.0);
  theShader.setUniform('tex0', img);
  //theShader.setUniform("choice", choice);
  theShader.setUniform("shape1", shape1);
  theShader.setUniform("shape2", shape2);
  theShader.setUniform("scale", newSC);
  theShader.setUniform("mv", newMV);
  theShader.setUniform("h", newH);
  theShader.setUniform("r", newR);
  theShader.setUniform("nn", newN);
  theShader.setUniform("m", newM);

  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);

}