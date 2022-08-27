// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file

let divA, divB, divC;
let redSlider, greenSlider, blueSlider;

// a shader variable
let img;
let theShader;
let m, a, b, r, n1, n2, n3;
let mSlider, rSlider, aSlider, bSlider;
let n1Slider, n2Slider, n3Slider;
let rP, aP, bP, n1P, n2P, n3P, mP, totalP;

function preload() {
    // load the shader
    theShader = loadShader('super.vert', 'super.frag');
    img = loadImage('beads.png');
}

function setup() {
    createCanvas(600, 600, WEBGL);
    pixelDensity(1);
    noCursor();

    // Controls for supershape parameters
    divA = createDiv().position(50, 630).class('flex-container');

    let divA1 = createDiv().parent(divA).class('subdiv');
    let spanr = createSpan("r: ").parent(divA1);
    rSlider = createSlider(200, 600, 400).style('width', '180px').parent(divA1);

    let divA2 = createDiv().parent(divA).class('subdiv');
    let spana = createSpan("a: ").parent(divA2);
    aSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA2);

    let divA3 = createDiv().parent(divA).class('subdiv');
    let spanb = createSpan("b: ").parent(divA3);
    bSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA3);

    let divA4 = createDiv().parent(divA).class('subdiv');
    let spanm = createSpan("m: ").parent(divA4);
    mSlider = createSlider(0, 12, 6).style('width', '180px').parent(divA4);


    let divB = createDiv().position(330, 630).class("flex-container");
    let divB1 = createDiv().parent(divB).class('subdiv');
    let spann1 = createSpan("n1: ").parent(divB1);
    n1Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB1);

    let divB2 = createDiv().parent(divB).class('subdiv');
    let spann2 = createSpan("n2: ").parent(divB2);
    n2Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB2);

    let divB3 = createDiv().parent(divB).class('subdiv');
    let spann3 = createSpan("n3: ").parent(divB3);
    n3Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB3);


    divC = createDiv().position(550, 630).class('flex-container');
    colorP = createP('Choose colors:').parent(divC);
    let spanred = createSpan("red: ").parent(divC);
    redSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);
    let spangreen = createSpan("green: ").parent(divC);
    greenSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);
    let spanblue = createSpan("blue: ").parent(divC);
    blueSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);

}

function draw() {
    background(0);

    // Pass the values from the sliders back to the shader

    let a = aSlider.value();
    let newA = map(a, 0, 2, 0.0, 1.0);
    let b = bSlider.value();
    let newB = map(b, 0, 2, 0.0, 1.0);
    let m = mSlider.value();
    let newM = map(m, 0, 12, 0.0, 12.0);
    let r = rSlider.value();
    let newR = map(r, 0, 250, 0.0, 1.0);

    let n1 = n1Slider.value();
    let newN1 = map(n1, 0, 12, 0.0, 12.0);
    let n2 = n2Slider.value();
    let newN2 = map(n2, 0, 12, 0.0, 12.0);
    let n3 = n3Slider.value();
    let newN3 = map(n3, 0, 12, 0.0, 12.0);

    // Pass color choices
    rd = redSlider.value();
    let newRed = map(rd, 0, 255, 0.0, 1.0, 0.1);
    gr = greenSlider.value();
    let newGr = map(gr, 0, 255, 0.0, 1.0, 0.1);
    bl = blueSlider.value();
    let newBl = map(bl, 0, 255, 0.0, 1.0, 0.1);

    // send resolution of sketch into shader
    theShader.setUniform('u_resolution', [width, height]);
    theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
    theShader.setUniform("iFrame", frameCount);
    theShader.setUniform("iTime", millis() / 1000.0);
    theShader.setUniform('tex0', img);
    theShader.setUniform('aa', newA);
    theShader.setUniform('bb', newB);
    theShader.setUniform('rr', newR);
    theShader.setUniform('m', newM);
    theShader.setUniform('n1', newN1);
    theShader.setUniform('n2', newN2);
    theShader.setUniform('n3', newN3);
    theShader.setUniform("re", newRed);
    theShader.setUniform("gr", newGr);
    theShader.setUniform("bl", newBl);

    // shader() sets the active shader with our shader
    shader(theShader);

    // rect gives us some geometry on the screen
    rect(0, 0, width, height);
}