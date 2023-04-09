// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

class Branch {
  constructor(parent, pos, dir) {
    this.pos = pos;
    this.parent = parent;
    this.dir = dir;
    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 5;
  }
  reset() {
    this.dir = this.origDir.copy();
    this.count = 0;
  }

  next() {
    let nextDir = p5.Vector.mult(this.dir, this.len);
    let nextPos = p5.Vector.add(this.pos, nextDir);
    let nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }

  show() {
    // if (isDone==true){
    //   if (this.parent != null) {
    //   push();
    //   fill(255);
    //   ellipse(this.pos.x, this.pos.y,20);
    //   //line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    //   pop();
    //       }
    // }else{
    if (this.parent != null) {
      push();
      stroke(0);
      strokeWeight(15);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      //stroke(255,226,13);
      stroke(255);
      strokeWeight(12.5);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      pop();
    }
   // }
  }
  

}
