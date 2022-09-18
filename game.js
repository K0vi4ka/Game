function playerModel(){
  let myView = null;
  let self = this;
  let idx = 1;
  let posX = 100;
  let posY = 69;
  let jumpMove = -1;

  self.initModel = function(view){
    myView = view
  }
  self.updateSoure = function(){
    idx >= 5? idx = 1:idx++;
    return idx
  }

  self.moveLeft = function(){
    console.log(posX)
    if(posX >=0){
      posX+=-1;
    }
    return posX
  }

  self.moveRight = function(){
    if(posX < container.offsetWidth - myView.getWidth()){
      posX+=1;
    }
    return posX
  }

  self.updateJumpPosY = function(posY){
    if(posY === 45){
      jumpMove = 1;
    }
    return posY + jumpMove
  }

  self.endJumpAnimation = function(){
    jumpMove = -1;
  }

  self.getPosX = function(){
    return posX;
  }
}

function playerView(){
  let self = this;
  let myModel = null;
  let myField = null;
  let timermove = null;
  let posY = 67;
  let aniTimer = null;
  let jumpAnimation = null;
  let moveObj = {
    39: false,
    38:false,
    37:false
  }

  self.initView = function(model,field){
    myModel = model;
    myField = field;
  }

  self.showHero = function(){
    myField.style.display = 'block'
    myField.classList.add('player-first-show');
    aniTimer = setTimeout(self.removeHeroStyle,3000);
  }

  self.removeHeroStyle = function(){
   myField.classList.remove('player-first-show')
   aniTimer = null;
   document.addEventListener('keydown',playerView1.move)
   document.addEventListener('keyup',playerView1.stopMove);
  }

  self.getWidth = function(){
    return myField.offsetWidth;
  }

  self.getLeft = function(){
    return myField.offsetLeft
  }

  self.updateImg = function(){
    let idx = myModel.updateSoure();
    myField.setAttribute('src',`./IMG/Player/run/${idx}.png`);
  }

  self.startRun = function(){
    run = setInterval(self.updateImg,75)
  }

  self.move = function(e){
    if(!aniTimer){
      if(e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
        moveObj[e.keyCode] = true;
        console.log(moveObj)
      }
      if(moveObj[39] === true){
        timermove = requestAnimationFrame(self.moveRight);
      }
      if(moveObj[37] === true) {timermove = requestAnimationFrame(self.moveLeft);}
      if(moveObj[38] === true) {jumpAnimation = requestAnimationFrame(self.jump)}
    } 
  }

  self.moveLeft = function(){
    cancelAnimationFrame(timermove);
    myField.style.transform = `translate(${myModel.moveLeft()}px,${posY}vh)`
    timermove = requestAnimationFrame(self.moveLeft)
  }

  self.moveRight = function(){
    cancelAnimationFrame(timermove);
    myField.style.transform = `translate(${myModel.moveRight()}px,${posY}vh)`
    timermove = requestAnimationFrame(self.moveRight)
  }

  self.jump = function(){
    cancelAnimationFrame(jumpAnimation);
    posY = myModel.updateJumpPosY(posY);
    myField.style.transform = `translate(${myModel.getPosX()}px,${posY}vh)`
    if(posY === 67){
      self.clearJump();
      myModel.endJumpAnimation();
    }
    else{
      requestAnimationFrame(self.jump);
    }  
  }

  self.clearJump = function(){
    jumpAnimation = null;
  }

  self.stopMove = function(e){
    if(e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
      moveObj[e.keyCode] = false;
    }
    if(e.keyCode === 37 || e.keyCode === 39){
      cancelAnimationFrame(timermove)
    }
  }
}

function playerController(){
  let self = this;
  let myModel = null;
  let myView = null;

  self.initController = function(model,view){
    myModel = model;
    myView = view;
  }

  self.startRun = function(){
    console.log('workC')
    myView.startRun();
    myView.showHero();
  }
}


const playerModel1 = new playerModel();
const playerController1 = new playerController();
const playerView1 = new playerView();
const img = document.getElementById('player')
console.log(playerModel1,playerView1,playerController1)

playerModel1.initModel(playerView1);
playerView1.initView(playerModel1,img);
playerController1.initController(playerModel1,playerView1);

playerController1.startRun();

