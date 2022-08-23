function Star(){
  let self = this;
  
  self.initStar = function(){
    for(let i = 1; i < 31; i++){
      const p = document.createElement('p');
      p.classList.add('star');
      //p.style.transform = `translate(2000px,${Math.floor(Math.random() * 70)}vh)`;
      p.style.top = Math.floor(Math.random() * (70 - 10 + 1) + 10) + 'vh'
      p.style.animationDelay = Math.random() * 5 + 's'
      if (i % 3 === 0){
        p.classList.add('fast')
        
      }
      else if (i % 2 === 0){
        p.classList.add('medium')
      }
      else{
        p.classList.add('slow')
      }
      container.appendChild(p);
    }
  }
}



function Player(){
  const self = this;
  let img = document.getElementById('player');

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

  self.move = function(e){
    console.log(e.keyCode)
    switch(e.keyCode){
      case 39: timermove = requestAnimationFrame(self.moveRight);
        break;
      case 37: timermove = requestAnimationFrame(self.moveLeft);
        break;
      case 38:  if(jumpIdx ===1) timer = requestAnimationFrame(self.jump);
      break;
    }
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

  self.stopMove = function(){
    cancelAnimationFrame(timermove);
  }
}

const container = document.getElementById('container')
const stars = new Star();
stars.initStar();
const player = new Player();
player.startRun();

document.addEventListener('keydown',player.move)
document.addEventListener('keyup',player.stopMove)