class Tree {
  constructor() {
    this.leaves = [];
    this.branches = [];
    let w = width / cols;
    let h = height / rows;
    let mid = width / 2;
    this.rootPos = [
      mid - 78,
      mid - 36,
      mid + 8,
      mid + 48,
      mid + 83,
      height - 85,
      height - 166,
      height - 178,
      height - 161,
      height - 118,
    ];

    //Flowfield "leaves"
    flowfield = new Array(cols);
    for (let i = 0; i < flowfield.length; i++) {
      flowfield[i] = new Array(rows);
    }

    //Noise the position
    let xoff = random(30);
    let yoff = random(100, 200);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // let x = i * w + w * 0.5 + noise(xoff) * width * 0.06;
        // let y = j * h + h * 0.5 + noise(yoff) * height * 0.06;
                let x = i * w + w * 0.5 + noise(xoff) * 50;
        let y = j * h + h * 0.5 + noise(yoff) * 50;
        xoff += 1;
        yoff += 1;
        // let centerX = width / 2;
        // let centerY = height / 2;

        //leaf boundary
        if (
          (x >= width / 2 - 80 && y >= height - 180 && x <= width / 2 + 80) ==
          false
        ) {
          flowfield[i][j] = createVector(x, y);
          //add leaves
          this.leaves.push(new Leaf(flowfield[i][j]));
        }
      }
    }

    //Create Roots
    for (let i = 0; i < 5; i++) {
      //pos of 5 fingers
      let pos = createVector(this.rootPos[i], this.rootPos[i + 5]);
      //let dir = createVector(0, -1);
      let dir = p5.Vector.random2D();
      let root = new Branch(null, pos, dir);
      this.branches.push(root);

      let current = root;

      let found = false;
      while (!found) {
        //if already reached the leave, skip
        for (let i = 0; i < this.leaves.length; i++) {
          //let d = p5.Vector.dist(current.pos, this.leaves[i].pos);
          let d = distSquared(current, this.leaves[i]);
          if (d < max_distSq) {
            found = true;
            break;
          }
        }
        //
        if (!found) {
          let branch = current.next();
          current = branch;
          this.branches.push(current);
        }
      }
      //
      //       if (!found) {
      //   let branch = current.next();
      //   current = branch;
      //   this.branches.push(current);
      // }
    }
  }

  grow() {
    for (let i = this.leaves.length - 1; i > -1; i--) {
      //for (let i = 0; i<this.leaves.length; i++) {
      let leaf = this.leaves[i];
      let closestBranch = null;
      let record = max_distSq;
      for (let j = 0; j < this.branches.length; j++) {
        let branch = this.branches[j];
        let d = distSquared(leaf, branch);
        //let d = p5.Vector.dist(leaf.pos, branch.pos);
        if (d < min_distSq) {
          leaf.reached = true;
          // this.leaves.splice(this.leaves[i],1);
          closestBranch = null;
          break;
        } else if (d < record) {
          closestBranch = branch;
          record = d;
        }
      }
      
      //leaf found closest branch, ask it to branch
      if (closestBranch != null) {
        let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        //newDir.normalize();
        //newDir.add(p5.Vector.random2D())
        newDir.setMag(0.8);
        closestBranch.dir.add(p5.Vector.random2D().setMag(0.2));
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }

    for (let i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        //this.leaves[i].changeColor();
        this.leaves.splice(i, 1);
      }
    }

    for (let i = this.branches.length - 1; i >= 0; i--) {
      let branch = this.branches[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        this.branches.push(branch.next());
        this.branches[i].show();
        branch.reset();
      }
    }

    if (this.leaves.length == 0) {
      isDone = true;
    }
    

  }

  show() {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }

//     for (let i = 0; i < this.branches.length; i++) {
//       this.branches[i].show();
//     }
  }
  
  die(){
      for(let i = this.branches.length-1; i >= 1; i--){
        //this.branches.splice(i);
        if(frameCount%30==0){
          //console.log('dying');
           this.branches[i].show();
        }
        //setInterval(this.branches[i].show(),10000);
        //setTimeout(this.branches[i].show(),1000);
      }
    
  }
}
