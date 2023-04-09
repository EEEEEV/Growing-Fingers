let flowfield;
let cols;
let rows;
//let debug = true;
let tree;
let max_dist = 500;
let max_distSq = max_dist*max_dist;
let min_dist = 5;
let min_distSq = min_dist*min_dist;
//let rootAmt;
let isDone = true;
let img, hand;


// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
 
// HTML button object:
let portButton;
let inData;                   // for incoming serial data
let outByte = 0;              // for outgoing data

function preload() {
  hand = loadImage('Hand.png');
}
function setup() {
  frameRate(30);
   createCanvas(windowWidth, windowHeight);
  cols = floor(width/30);
  rows = floor(height/30);
  //createCanvas(windowWidth, windowHeight);
  background(255);
  
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  
  tree = new Tree();
  image(hand,width/2-100,height-200,200,200);
//frameRate(10);
}


function draw() {
  //image(hand,width/2-100,height-200,200,200);
  //image(hand,width/2-60,height-100,width/3.3,width/3.3);
  blendMode(LIGHTEST);
  // text(cols, 10,10);
  // text(rows, 10,50);
  //text(frameRate(), 10,60);
  
  if(!isDone){
      //background(255);
     // tree = new Tree();
    //tree.show();
    tree.grow();
  }

}

function mouseReleased(){
drawNew();
}

function drawNew(){
  clear();
  image(hand,width/2-100,height-200,200,200);
    //background(255);
  isDone = false;
     tree = new Tree();
    // tree.show();
    // tree.grow();
}

function distSquared(a,b){
    let dx = a.pos.x-b.pos.x;
    let dy = a.pos.y-b.pos.y;
    return dx*dx + dy*dy;
  }
// function keyPressed() {
// console.log(mouseX,mouseY);
// }

// if there's no port selected, 
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}
 
// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}
 
// open the selected port, and make the port 
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);
 
  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}
 
// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a string
// (assumes a newline at the end of it):
function serialEvent() {
  //inData = Number(serial.read());
  inData = serial.readLine();
  if (inData == 'Broken'){
    drawNew();
  }else{
    isDone = true;
    //tree.die();
    //console.log("paused");
  }
  //console.log(inData);
}
 
// try to connect if a new serial port 
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}
 
// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}
 
function closePort() {
  serial.close();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
