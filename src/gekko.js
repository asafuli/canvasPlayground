export default class Gekko {
  
  constructor(){
    this.image = document.getElementById("gekkoImg");
  }

  draw(ctx){
    ctx.drawImage(this.image, 0 , 0 ,180, 180 );
  }

  getRandomColor() {
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
}