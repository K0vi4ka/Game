function backgorundModel(){
  let btnmove = 0;
  let myView = null;
  let self = this
  let timer = null;

  self.initModel = function(view){
    myView = view;
  }

  self.starMove = function(star){
    star.style.top = Math.floor(Math.random() * (70 - 10 + 1) + 10) + 'vh'
    star.style.animationDelay = Math.random() * 5 + 's'
  }
}

function backgorundView(){
  let self = this;
  let myModel = null;
  const startBTN = document.getElementById('start-btn');
  let myField = null;
  const starArr = []


  self.initView = function(model,field){
    myField = field
    myModel = model
  }

  self.initStar = function(){
    for(let i = 1; i < 31; i++){
      const p = document.createElement('p');
      p.classList.add('star');
  
      if (i % 3 === 0){
        p.classList.add('fast')
        
      }
      else if (i % 2 === 0){
        p.classList.add('medium')
      }
      else{
        p.classList.add('slow')
      }

      myField.appendChild(p);
      starArr.push(p)
    }
    
    starArr.forEach(star => myModel.starMove(star))
  }

  self.initScore = function(){
    const p = document.createElement('p');
    p.innerHTML = `Score: 0`;
    p.classList.add('score');
    container.appendChild(p)
  }

  self.moveBtn = function(){
    startBTN.classList.add('animBtn')
  }
}

function backgorundController(){
  let self = this
  let myModel = null
  let myField = null;

  self.initController = function(model,field){
    myModel = model
    myField = field
  }

  self.start = function(){
    myField.initStar(); 
  }

  self.startGameMoveBtn = function(){
    myField.moveBtn()
  }
}

function startGame(){
  $.ajax('./game.js',{
    type: 'GET',
    dataType: 'script'
  })
}

const gameController = new backgorundController();
const gameModel = new backgorundModel();
const gameView = new backgorundView();
const container = document.getElementById('container')

gameModel.initModel(gameView);
gameView.initView(gameModel,container);
gameController.initController(gameModel,gameView);
gameController.start();

const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click',()=>{
  gameController.startGameMoveBtn();
  setTimeout(startGame,5000);
})