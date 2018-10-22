import Gekko from './gekko';

//Globals
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let lastTime = 0;
let players = [];
let gekkoExist = false;
let catBoyExist = false;
let yotamExist = false;
//thumbnails
let gekkoThumb = document.getElementById("gekkoThumb");
let catBoyThumb = document.getElementById("catBoyThumb");
let yotamThumb = document.getElementById("yotamThumb");
gekkoThumb.addEventListener('click', function(ev){addPlayer(ev)}, false);
catBoyThumb.addEventListener('click', function(ev){addPlayer(ev)}, false);
yotamThumb.addEventListener('click', function(ev){addPlayer(ev)}, false);

function addPlayer(ev){
  let newPlayer;
  if (ev.target.id === "gekkoThumb" && !gekkoExist){
    newPlayer = new Gekko(ctx, "gekkoImg");
    gekkoExist = true;
  } else if (ev.target.id === "catBoyThumb" && !catBoyExist){
    newPlayer = new Gekko(ctx, "catBoyImg", {right: 'd', left: 'a', up: 'w', down: 's', jump: '1'});
    catBoyExist = true;
  } else if (ev.target.id === "yotamThumb" && !yotamExist){
    newPlayer = new Gekko(ctx, "yotamThumb", {right: "'", left: 'l', up: 'p', down: ';', jump: '='});
    yotamExist = true;
  } else {
    alert('Player already exist...');
    return
  }
  window.addEventListener('keydown', e => newPlayer.checkAction(e));
  window.addEventListener('keyup', e => newPlayer.stop(e));
  players.push(newPlayer);
}

function GameLoop(timestamp){
  let dt = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0,0,1500, 770);
  players.map(player => {
    player.updatePlayerPosition(dt);
    player.draw();
    }
  )
  requestAnimationFrame(GameLoop);
}
//Initial call
GameLoop();




