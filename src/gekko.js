export default class Gekko {
  
  constructor(ctx, htmlId, movingSpeed=50, position={x : 200, y : 200, w : 180, h : 180}){
    
    this.ctx = ctx;
    this.image = document.getElementById(htmlId);
    this.speed = movingSpeed;
    this.movingSpeed = movingSpeed;
    this.movingAxis = 'x';
    this.position = {...position};
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
    console.log(this.move);
    switch(e.key){
      case 'ArrowRight':
        this.move('x',1);
        break
      case 'ArrowLeft':
        this.move('x',-1);
        break
      case 'ArrowUp':
        this.move('y',-1);
        break
      case 'ArrowDown':
        this.move('y',1);
        break
      case ' ':
        this.jump();
        break
    }
  }
  
  stop(e){
    switch(e.key){
      case 'ArrowRight':
        if (this.speed > 0 && this.movingAxis === 'x') this.speed = 0;  
        break
      case 'ArrowLeft':
        if (this.speed < 0 && this.movingAxis === 'x') this.speed = 0;
        break
      case 'ArrowUp':
        if (this.speed < 0 && this.movingAxis === 'y') this.speed = 0;
        break
      case 'ArrowDown':
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
  
  createRandMeasurements(){
    return {x: Math.random() * 300, 
            y: Math.random() * 300,
            w: Math.random() * 1000,
            h: Math.random() * 1000}
  }
  */

}