/*function Player(){
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


  //переписать на if
  self.move = function(e){
    if(e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 38){
      if(!moveArr.includes(e.keyCode)){moveArr.push(e.keyCode)}
    }
    moveArr.forEach(item =>{
      if(e.keyCode === 39){timermove = requestAnimationFrame(self.moveRight);}
      if(e.keyCode === 37) {timermove = requestAnimationFrame(self.moveLeft);}
      if(e.keyCode === 38){}
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
}*/

function playerModel(){
  let myView = null;
  let self = this;
  let idx = 1;
  let posX = null;
  let posY = 67;

  self.initModel = function(view){
    myView = view
  }
  self.updateSoure = function(){
    idx >= 5? idx = 1:idx++;
    return idx
  }

  self.setPosX = function(){
    posX = myView.getLeft()
  }

  self.moveLeft = function(){
    if(posX >=0){
      posX+=-1;
    }
    return posX
  }

  self.moveRight = function(){
    if(posX < container.offsetWidth - myView.getWidth()){
      posX+=1;
      console.log('work')
    }
    return posX
  }
}

function playerView(){
  let self = this;
  let myModel = null;
  let myField = null;
  let run = null;
  let timermove = null;

  self.initView = function(model,field){
    myModel = model;
    myField = field;
  }

  self.getWidth = function(){
    return myField.offsetWidth;
  }

  self.getLeft = function(){
    return myField.offsetLeft
  }

  self.getLeft = function(){
    return myField.offsetLeft;
  }

  self.updateImg = function(){
    let idx = myModel.updateSoure();
    myField.setAttribute('src',`./IMG/Player/run/${idx}.png`);
  }

  self.startRun = function(){
    myModel.setPosX()
    run = setInterval(self.updateImg,75)
  }

  self.move = function(e){
    console.log(e.keyCode)
      if(e.keyCode === 39){timermove = requestAnimationFrame(self.moveRight);}
      if(e.keyCode === 37) {timermove = requestAnimationFrame(self.moveLeft);}
      if(e.keyCode === 38){if(jumpIdx === 1) {timer = requestAnimationFrame(self.jump)};}
  }

  self.moveLeft = function(){
    cancelAnimationFrame(timermove);
    console.log(myModel.moveLeft())
    myField.style.transform = `translate(${myModel.moveLeft()}px,67vh)`
    timermove = requestAnimationFrame(self.moveLeft)
  }

  self.moveRight = function(){
    cancelAnimationFrame(timermove);
    myField.style.transform = `translate(${myModel.moveRight()}px,67vh)`
    timermove = requestAnimationFrame(self.moveRight)
  }

  self.stopMove = function(e){
    cancelAnimationFrame(timermove);
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

document.addEventListener('keydown',playerView1.move)
document.addEventListener('keyup',playerView1.stopMove);