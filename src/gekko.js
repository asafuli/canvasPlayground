export default class Gekko {
  
  constructor(ctx, htmlId, controls = {right: 'ArrowRight', left: 'ArrowLeft', up: 'ArrowUp', down: 'ArrowDown', jump: ' '}, position={x: 200, y: 200, w: 180, h: 180}, movingSpeed=50){
    
    this.ctx = ctx;
    this.image = document.getElementById(htmlId);
    this.speed = 0;
    this.movingSpeed = movingSpeed;
    this.movingAxis = 'x';
    this.position = {...position};
    this.controls = {...controls};
    //bindings
    this.move = this.move.bind(this);
    this.jump = this.jump.bind(this);
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
        this.ctx.clearRect(0, 0, 800, 500);
        this.position.y = (i < 10) ? this.position.y - 10 : this.position.y + 10;
        this.draw();
      },i * 20,this.position)
    }
  }
  
  checkAction(e){
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