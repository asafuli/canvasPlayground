//import Gekko from './gekko';

//Globals
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let gekkoImg = document.getElementById("gekkoImg");
let catBoyImg = document.getElementById("catBoyImg");
let lastTime = 0;
let speed = 0;
let movingSpeed = 50;
let movingAxis = 'x';
let basePosition = {
  x : 200,
  y : 200,
  w : 180,
  h : 180
}
let baseCatPosition = {
  x : 400,
  y : 200,
  w : 180,
  h : 180
}
let position = {...basePosition};
let catPosition = {...baseCatPosition};
let gekkoThumb = document.getElementById('gekkoThumb');

//Functions
function drawGekko({x ,y ,w ,h}){
  return ctx.drawImage(gekkoImg, x, y, w, h)
}
function drawCatBoy({x ,y ,w ,h}){
  return ctx.drawImage(catBoyImg, x, y, w, h)
}

function move(axis,sign){
  speed = movingSpeed * sign;
  movingAxis = axis;
};

function jump(){
  for (let i = 0; i < 20 ; i++){
    setTimeout(() => {
      ctx.clearRect(0, 0, 800, 500);
      position.y = (i < 10) ? position.y - 10 : position.y + 10;
      catPosition.y = (i < 10) ? catPosition.y - 10 : catPosition.y + 10;
      drawGekko(position);
      drawCatBoy(catPosition);
    },i * 20,position, catPosition)
  }
}

function moveGekko(e){
  switch(e.key){
    case 'ArrowRight':
      move('x',1);
      break
    case 'ArrowLeft':
      move('x',-1);
      break
    case 'ArrowUp':
      move('y',-1);
      break
    case 'ArrowDown':
      move('y',1);
      break
    case 'b' :
      boost();
      break
    case ' ':
      jump();
      break
  }
}

function stopGekko(e){
  switch(e.key){
    case 'ArrowRight':
      if (speed > 0 && movingAxis === 'x') speed = 0;  
      break
    case 'ArrowLeft':
      if (speed < 0 && movingAxis === 'x') speed = 0;
      break
    case 'ArrowUp':
      if (speed < 0 && movingAxis === 'y') speed = 0;
      break
    case 'ArrowDown':
      if (speed > 0 && movingAxis === 'y') speed = 0;
      break
  }
}

window.addEventListener('keydown', e => moveGekko(e));
window.addEventListener('keyup', e => stopGekko(e));
//players thumbnails

/*gekkoThumb.addEventListener('click',() => {
  ctx.clearRect(0, 50, 800, 500);
  drawGekko(basePosition);
  drawCatBoy(baseCatPosition);
  drawCatBoy(catPosition);
  drawGekko(position)
},false);*/

function updateGekko(deltaTime){
  if (!deltaTime) return;
  position[movingAxis] += speed/deltaTime;
}

function GameLoop(timestamp){
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, 800, 500);
  updateGekko(dt);
  drawGekko(position);

  requestAnimationFrame(GameLoop);
}
//Initial call
GameLoop();




