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
    if(posY === 35){
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

  self.getPosY = function(){
    return posY;
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
  }

  self.removeHeroStyle = function(){
   myField.classList.remove('player-first-show')
   document.addEventListener('keydown',playerView1.move)
   document.addEventListener('keyup',playerView1.stopMove);
  }

  self.getWidth = function(){
    return myField.offsetWidth;
  }

  self.getHeight = function(){
    return myField.offsetHeight
  }

  self.getLeft = function(){
    return myField.offsetLeft
  }

  self.updateImg = function(){
    let idx = myModel.updateSoure();
    myField.setAttribute('src',`../IMG/Player/run/${idx}.png`);
  }

  self.startRun = function(){
    run = setInterval(self.updateImg,75)
  }

  self.move = function(e){
    if(!aniTimer){
      if(e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
        moveObj[e.keyCode] = true;
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

  self.getPosY = function(){
    return posY
  }

  self.stopMove = function(e){
    if(e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37){
      moveObj[e.keyCode] = false;
    }
    if(e.keyCode === 37 || e.keyCode === 39){
      cancelAnimationFrame(timermove)
    }
  }

  self.gameOverPlayer = function(){
    timermove = null;
    myField.style.display = 'none'
  }

  
  self.hideBackButton = function(){
    const btn = document.querySelector('.score-btn');
    btn.classList.add('animBtn')
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
    myView.startRun();
    myView.showHero();
    setTimeout(myView.removeHeroStyle,3000)
  }
  
  self.stopRun = function(){
    myView.gameOverPlayer();
  }

  self.hideBackButton = function(){
     myView.hideBackButton();
  }
}

//10
let enemyDelay = 10;

function EnemyModel(){
  let self = this;
  let myModel = null;
  let myView = null;

  self.initModel = function(view){
    myView = view;
  }

  self.randomEnemyScr = function(len){
    return Math.floor(Math.random() * len);
  }

  self.getEnemyPos = function(arr){
    return arr.map(item => item.offsetLeft + item.offsetWidth)
  }

  self.comparePos = function(enemy){
    const playerHelp = 10;
    if(enemy){
      const compare1 = playerModel1.getPosX() + playerView1.getWidth() >= enemy.offsetLeft + playerHelp && playerModel1.getPosX() <= enemy.offsetLeft + enemy.offsetWidth - playerHelp;
      const compare2 = playerView1.getPosY() + playerView1.getHeight() > enemy.offsetTop;
      if((compare1 && compare2)){
        return false
      }
      else{
        return true
      }
    } 
  }
}

function EnemyView(){
  let self = this;
  let myField = null;
  let myModel = null;
  let src;
  const enemySrc = ["../IMG/Enemy/enemy1.png","../IMG/Enemy/enemy2.png"];
  let enemyContainer = [];

  self.initView = function(model,field){
    myModel = model;
    myField = field;
  }

  self.initEmeny = function(){
    const enemy = self.createEnemy();
    enemyContainer.push(enemy);
    self.updateImg(enemy);
    myField.appendChild(enemy);
  }

  self.createEnemy = function(){
    const enemy = document.createElement('img');
    enemy.setAttribute('alt','enemy');
    enemy.setAttribute('class','enemy');
    return enemy;
  }

  self.chooseEnemy = function(){
     src = enemySrc[myModel.randomEnemyScr(enemySrc.length)];
  }

  self.updateImg = function(enemy){
    self.chooseEnemy();
    enemy.setAttribute('src',src);
    self.startMoveAnimetion(enemy)
  }
  
  self.startMoveAnimetion = function(enemy){
    enemy.classList.add('enemy-move')
    self.removeEnemy(enemy);
  }

  self.removeEnemy = function(enemy){
    setTimeout(()=>{
      myField.removeChild(enemy);
    },5500)
  }

  self.updateEnemyArray = function(){
    if(enemyContainer.length !== 0){
      myModel.getEnemyPos(enemyContainer).forEach((item,index) =>{
        if(item< playerModel1.getPosX()){
            enemyContainer = enemyContainer.filter(enm => enm !== enemyContainer[index]);
        }
      })
    }
  }

  self.comparePos = function(){
    if(myModel.comparePos(enemyContainer[0]) === false){
      return false;
    }
    else{
      return true
    }
  }
}

function EnemyController(){
  let self = this;
  let myModel = null;
  let myView = null;
  let enemyTimer = null;

  self.initController = function(model,view){
    myModel = model;
    myView = view;
  }

  self.startSpawnEnemy = function(){
    enemyTimer = setInterval(() =>{
      myView.initEmeny();
      enemyDelay === 1? 2: enemyDelay-=0.5;
    },enemyDelay*1000);
  }

  self.upgradeViewArr = function(){
    myView.updateEnemyArray();
  }

  self.stopEnemySpawn = function(){
    clearInterval(enemyTimer)
  }

  self.gameOverEnemy = function(){
    if(myView.comparePos() === false){
      playerController1.stopRun();
      showEndBlock();
      self.stopEnemySpawn();
      gameView.endScore();
    }
  }
}

function showEndBlock(){
  const div = document.createElement('div');
  div.classList.add('end-game-block')
  const p = document.createElement('p');
  p.innerHTML = `???? ??????????????????, ???????????????? ${gameView.getScore()}`
  const buttonsContainer = document.createElement('div');

  const btn1 = document.createElement('button');
  btn1.classList.add('small-button');
  const linkMain = document.createElement('a');
  linkMain.setAttribute('href','./index.html');
  linkMain.classList.add('somelink')
  btn1.innerHTML = "?? ?????????????? ????????";  
  linkMain.appendChild(btn1);
  btn1.setAttribute('onclick','openMainPage()')


  const btn2 = document.createElement('button');
  btn2.classList.add('small-button');
  const linkGame = document.createElement('a');
  linkGame.setAttribute('href','./game.html');
  linkGame.classList.add('somelink')
  btn2.innerHTML = "???????????? ????????????";  
  linkGame.appendChild(btn2);
  btn2.setAttribute('onclick','openGamePage()') 

  buttonsContainer.appendChild(linkGame);
  buttonsContainer.appendChild(linkMain);
  div.appendChild(p);
  div.appendChild(buttonsContainer);
  container.appendChild(div);
}

  const playerModel1 = new playerModel();
  const playerController1 = new playerController();
  const playerView1 = new playerView();
  const img = document.getElementById('player')

  
  const enemyModel1 = new EnemyModel();
  const enemyView1 = new EnemyView();
  const enemyController1 = new EnemyController();
  let container = document.getElementById('container');
  

  (function(){
    playerModel1.initModel(playerView1);
    playerView1.initView(playerModel1,img);
    playerController1.initController(playerModel1,playerView1);

    enemyModel1.initModel(enemyView1);
    enemyView1.initView(enemyModel1,container);
    enemyController1.initController(enemyModel1,enemyView1);
    playerController1.startRun();  
    enemyController1.startSpawnEnemy();
    setInterval(enemyController1.upgradeViewArr,100);
    setInterval(enemyController1.gameOverEnemy,100);
  })();

