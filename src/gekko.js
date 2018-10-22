export default class Gekko {
  
  constructor(ctx, htmlId, controls = {right: 'ArrowRight', left: 'ArrowLeft', up: 'ArrowUp', down: 'ArrowDown', jump: ' ', flip: 'Enter'}, position={x: 400, y: 300, w: 180, h: 180}, movingSpeed=50){
    
    this.ctx = ctx;
    this.image = document.getElementById(htmlId);
    this.speed = 0;
    this.movingSpeed = movingSpeed;
    this.movingAxis = 'x';
    this.position = {...position};
    this.rotatePosition = {...position};
    this.controls = {...controls};
    //bindings
    this.move = this.move.bind(this);
    this.jump = this.jump.bind(this);
    this.flip = this.flip.bind(this);
    this.draw = this.draw.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    this.stop = this.stop.bind(this);
  }

  //Functions

  move(axis,sign){
  this.speed = this.movingSpeed * sign;
  this.movingAxis  = axis;
  };

  updatePlayerPosition(deltaTime){
    if (!deltaTime) return;
    this.position[this.movingAxis] += this.speed/deltaTime;
  }

  draw(){
    const {x, y, w, h} = this.position;
    return this.ctx.drawImage(this.image, x, y, w, h);
  }

  jump(){
    for (let i = 0; i < 20 ; i++){
      setTimeout(() => {
        this.ctx.clearRect(0, 0, 1500, 770);
        this.position.y = (i < 10) ? this.position.y - 10 : this.position.y + 10;
        this.draw();
      },i * 20,this.position)
    }
  }

  flip(){
    for (let i = 0; i < 361 ; i++){
      
      setTimeout(() => {
        
        // save the unrotated ctx of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        this.ctx.clearRect(0,0,1500, 770);
        this.ctx.save();
        this.ctx.clearRect(0,0,this.position.x + this.position.w, this.position.y + this.position.h);
        // move to the center of the canvas
        this.ctx.translate(this.position.x + this.position.w/2, this.position.y + this.position.h/2);
        // rotate the canvas to the specified degrees
        this.ctx.rotate(1*Math.PI/180);
        this.position.x = -this.position.w/2;
        this.position.y = -this.position.h/2;
        // draw the image
        // since the ctx is rotated, the image will be rotated also
        this.ctx.drawImage(this.image,this.position.x, this.position.y, 180, 180);
        // we’re done with the rotating so restore the unrotated ctx
        if (i === 360){
          this.ctx.restore();
        }
      },i * 2)
    }
    
  }
 
  checkAction(e){
    console.log(e.key);
    switch(e.key){
      case this.controls.right:
        this.move('x',1);
        break
      case this.controls.left:
        this.move('x',-1);
        break
      case this.controls.up:
        this.move('y',-1);
        break
      case this.controls.down:
        this.move('y',1);
        break
      case this.controls.flip:
        this.flip();
        break
      case this.controls.jump:
        this.jump();
        break
    }
  }
  
  stop(e){
    switch(e.key){
      case this.controls.right:
        if (this.speed > 0 && this.movingAxis === 'x') this.speed = 0;  
        break
      case this.controls.left:
        if (this.speed < 0 && this.movingAxis === 'x') this.speed = 0;
        break
      case this.controls.up:
        if (this.speed < 0 && this.movingAxis === 'y') this.speed = 0;
        break
      case this.controls.down:
        if (this.speed > 0 && this.movingAxis === 'y') this.speed = 0;
        break
    }
  }

  /*getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  */
}