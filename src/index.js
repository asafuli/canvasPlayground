import Gekko from './gekko';

//Globals
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let lastTime = 0;

//Instantiation
let gekko = new Gekko(ctx, "gekkoImg");

//Event listeners
window.addEventListener('keydown', e => gekko.checkAction(e));
window.addEventListener('keyup', e => gekko.stop(e));

function GameLoop(timestamp){
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, 800, 500);
  gekko.updatePlayerPosition(dt);
  gekko.draw()

  requestAnimationFrame(GameLoop);
}
//Initial call
GameLoop();




