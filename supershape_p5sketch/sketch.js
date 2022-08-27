// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point

let divA
let button;
let angX = 0;
let angY = 0;
let globe = [];
let rotation = true;
let total, m, a, b, r;
let mSlider, rSlider, tSlider;
let n1Slider, n2Slider, n3Slider;
let aSlider, bSlider;
let n1, n2, n3;
let rP, aP, bP, n1P, n2P, n3P, mP, totalP;
let num;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
 
  let divA = createDiv().position(30, 650).class("flex-container");
  let divA1 = createDiv().parent(divA).class('subdiv');
  let spanr = createSpan("r: ").parent(divA1);
  rSlider = createSlider(1, 250, 150).style('width', '180px').parent(divA1);
  
  let divA2 = createDiv().parent(divA).class('subdiv');
  let spana = createSpan("a: ").parent(divA2);
  aSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA2);
 
  let divA3 = createDiv().parent(divA).class('subdiv');
  let spanb = createSpan("b: ").parent(divA3);
  bSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA3);
  
  let divA4 = createDiv().parent(divA).class('subdiv');
  let spannm = createSpan("m: ").parent(divA4);
  mSlider = createSlider(0, 12, 6).style('width', '180px').parent(divA4);

  let divA5 = createDiv().parent(divA).class('subdiv');
  let spannc = createSpan("Choose Color").parent(divA5);
  sel = createSelect().parent(divA5);
  sel.option('Blue', 0);
  sel.option('Pink and blue', 1);
  sel.option('Eggplant and raspbery', 2);
  sel.option('Blue, black, and burgandy', 3);
  sel.option('Orange', 6);
  sel.option('Pinkish purple', 7);
  sel.option('Purple', 9);
  sel.selected(1);
  
  let divB = createDiv().position(330, 630).class("flex-container");
  let divB1 = createDiv().parent(divB).class('subdiv');
  let spann1 = createSpan("n1: ").parent(divB1);
  n1Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB1);
  
  let divB2= createDiv().parent(divB).class('subdiv');
  let spann2= createSpan("n2: ").parent(divB2);
  n2Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB2);
 
  let divB3= createDiv().parent(divB).class('subdiv');
  let spann3 = createSpan("n3: ").parent(divB3);
  n3Slider = createSlider(0, 12, 1.7, 0.1).style('width', '180px').parent(divB3);
  
  let divB4= createDiv().parent(divB).class('subdiv');
  let spannt = createSpan("total: ").parent(divB4);
  tSlider = createSlider(0, 100, 20).style('width', '180px').parent(divB4);
  
}

function draw() { 
  let choice = sel.value();
  chooseBackground(choice);
  //background('#70327E');
  rotateX(angX);
  rotateY(angY);

  ambientLight(255);
  noStroke();

  r = rSlider.value();
  // rP = createP('').parent(divA);
  // rP.html(`r: ${r}`);
  
  a = aSlider.value();
  // aP = createP('').parent(divA);
  // aP.html(`a: ${a}`);
  
  b = bSlider.value();
  // bP = createP('').parent(divA);
  // bP.html(`b: ${b}`);
  
  m = mSlider.value();
  // mP = createP('').parent(divA);
  // mP.html(`m: ${m}`);
  
  n1 = n1Slider.value();
//   n1P = createP('').parent(divB);
//   n1P.html(`n1: ${nf(n1, 1, 1)}`);
  
  n2 = n2Slider.value();
  // n2P = createP('').parent(divB);
  // n2P.html(`n2: ${nf(n2, 1, 1)}`);
  
  n3 = n3Slider.value();
  // n3P = createP('').parent(divB);
  // n3P.html(`n3: ${nf(n3, 1, 1)}`);
  
  total = tSlider.value();
  // totalP = createP('').parent(divB);
  // totalP.html(`total: ${nf(total)}`);
  
  for (let i = 0; i < total+1; i++) {
    globe[i] = [];
    let lat = map(i, 0, total, -HALF_PI, HALF_PI);
    let r2 = superShape(lat, m, n1, n2, n3);

    for (let j = 0; j < total+1; j++) {
      let lon = map(j, 0, total, -PI, PI);
      let r1 = superShape(lon, m, n1, n2, n3);
      let x = r * r1 * cos(lon) * r2 * cos(lat);
      let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = r * r2 * sin(lat);

      globe[i].push(createVector(x, y, z));
    }
  }
  
  for (let i = 0; i < total; i++) {
    
    chooseColor(choice, i);
    // num = map(i, 0, total, -3.14158, 3.14159);
    // fill( 100*sin(num), 255*sin(num+ PI), 255*sin(num+PI/2) );

    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total+1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
    }

    if(rotation) {
      angX += 0.03;
      angY += 0.04;
    }
}

function superShape(theta, m, n1, n2, n3) {
  a = aSlider.value();
  b = bSlider.value();
  
  let t1 = abs((1/a) * cos(m * theta / 4));
  t1 = pow(t1, n2);
  
  let t2 = abs((1/b) * sin(m * theta / 4));
  t2 = pow(t2, n3);
  
  t3 = t1 + t2;
  let r = pow(t3, -1 / n1);
  return r;
}


function chooseBackground(colorChoice) {
  // shades of blue 
  if (colorChoice  == 0) {
    background('#F063A4');
  }
  // bright pink and blue
  else if (colorChoice == 1) {
   background('#2DC5F4');
  }
  // raspberry and eggplant
  else if (colorChoice == 2) {
     background('#66D334');
  } 
  else if (colorChoice == 3) {
    // blue, black, and burgandy
   background('#F063A4');
  }
  // purple on one side, black on the other
  else if (colorChoice == 4) {
    background('#F89E4F');
  }
  else if (colorChoice == 5) {
    // green, blue, red
    background('＃FCEE21');
  }
  else if (colorChoice == 6) {
    //orangish yellow
   background('#9253A1');; 
  }
  else if (colorChoice == 7) {
     //pinkish-purple
      background('#0B6A88');
  } else if (colorChoice == 8) {
     //blue
     background('#F16164'); 
  } else if (colorChoice == 9) {
     //purple
      background('#2DC5F4');
  }
}
function chooseColor(colorChoice, i) {
  // shades of blue 
  if (colorChoice  == 0) {
    num = map(i, 0, total, -3.14158, 3.14159);
    fill( 100*cos(num), 255*cos(num), 255*cos(num/2) );
  }
  // bright pink and blue
  else if (colorChoice == 1) {
   num = map(i, 0, total, -3.14158, 3.14159);
    fill( 255*cos(num), 0*cos(num), 255*cos(num/2) );
  }
  // raspberry and eggplant
  else if (colorChoice == 2) {
    num = map(i, 0, total, -3.14158, 3.14159);
    fill( 255*cos(num), 0*cos(num), 255*cos(num) );
  } 
  else if (colorChoice == 3) {
    // blue, black, and burgandy
   num = map(i, 0, total, -3.14158, 3.14159);
    fill( 100*sin(num + PI), 0*sin(num), 255*sin(num) );
  }
  // purple on one side, black on the other
  else if (colorChoice == 4) {
     num = map(i, 0, total, -3.14158, 3.14159);
    fill( 100*sin(num), 0*sin(num+ PI), 255*sin(num) );
  }
  else if (colorChoice == 5) {
    // green, blue, red
    num = map(i, 0, total, -3.14158, 3.14159);
    fill( 100*sin(num), 255*sin(num+ PI), 255*sin(num+PI/2) );
  }
  else if (colorChoice == 6) {
    //orangish yellow
    num = map(i, 0, total, 0, 255);
    fill(255, num, 0); 
  }
  else if (colorChoice == 7) {
     //pinkish-purple
      num = map(i, 0, total, 0, 255);
      fill(175, 0.5*num, 1.25*num); 
  } else if (colorChoice == 8) {
     //blue
      num = map(i, 0, total, 0, 255);
      fill(0, num, 255);  
  } else if (colorChoice == 9) {
     //purple
      num = map(i, 0, total, 0, 255);
     fill(num, 0, 255); 
  }
   
}