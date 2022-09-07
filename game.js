function Player(){
  const self = this;
  let img = document.getElementById('player');

  let moveArr = [];
  //бег
  let src = null;
  let idx = 1;
  //движение право лево
  let timermove = null
  let posX = img.offsetLeft;
  let posY = 67;
  //бег
  let run = null;
  let jumpIdx = 1;

  self.updateSoure = function(){
    idx >= 5? idx = 1:idx++;
    src = `./IMG/Player/run/${idx}.png`;
    self.updateImg();
  }

  self.updateImg = function(){
    img.setAttribute('src',src);
  }

  self.startRun = function(){
    run = setInterval(self.updateSoure,75)
  }


  //переписать на if
  self.move = function(e){
    if(e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 38){
      if(!moveArr.includes(e.keyCode)){moveArr.push(e.keyCode)}
    }
    moveArr.forEach(item =>{
      if(e.keyCode === 39){timermove = requestAnimationFrame(self.moveRight);}
      if(e.keyCode === 37) {timermove = requestAnimationFrame(self.moveLeft);}
      if(e.keyCode === 38){if(jumpIdx === 1) {timer = requestAnimationFrame(self.jump)};}
    }) 
  }
  self.moveRight = function(){
    if(posX< container.offsetWidth - img.offsetWidth){
      cancelAnimationFrame(timermove);
      posX+=1;
      img.style.transform = `translate(${posX}px,${posY}vh)`
      timermove = requestAnimationFrame(self.moveRight)
    } 
  }

  self.moveLeft = function(){
    if(posX >=0){
      cancelAnimationFrame(timermove);
      posX+=-1;
      img.style.transform = `translate(${posX}px,${posY}vh)`
      timermove = requestAnimationFrame(self.moveLeft)
    }
    
  }

  self.jumpAnimation = function(){
    self.jumpUpdateSrc();
    self.jumpUpdateCoords();
    jumpIdx++;
  }

  self.jumpUpdateSrc = function(){
    const jumpSrc = `./IMG/Player/jump/${jumpIdx}.png`;
    self.jumpUpdateImg(jumpSrc);
  }

  self.jumpUpdateImg = function(jumpSrc){
    img.setAttribute('src',jumpSrc);
  }
  
  self.jumpUpdateCoords = function(){
    if(jumpIdx >=3 && jumpIdx <=10){
      posY+=-5;
    }
    else if (jumpIdx >=11 && jumpIdx <19){
      posY+=5;
    }
    img.style.transform = `translate(${posX}px,${posY}vh)`;
  }


  self.jump = function(){
    clearInterval(run);
    cancelAnimationFrame(self.jump)
      if(jumpIdx <= 20){
        self.jumpAnimation();
        setTimeout(()=>timer = requestAnimationFrame(self.jump),20);
      }
      else{
        run = setInterval(self.updateSoure,75)
        jumpIdx =1;
        posY = 67;
      }         
  }

  self.stopMove = function(e){
    console.log(e.keyCode)
    moveArr = moveArr.filter(item => item !== e.keyCode);
    cancelAnimationFrame(timermove);
  }
}

const player = new Player();
player.startRun();
document.addEventListener('keydown',player.move)
document.addEventListener('keyup',player.stopMove);