class Leaf{
  
  constructor(pos){
  this.pos = pos;
  this.reached = false;

    
  }

   show() {
    
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
             // stroke(0, 100);
        // strokeWeight(4);
        // point(x, y);
  

}

}