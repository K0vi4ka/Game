function backgorundModel(){
  let myView = null;
  let self = this

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
  let score = null;
  let scoreTimer = 0;


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
    score = document.createElement('p');
    score.innerHTML = `Score: 0`;
    score.classList.add('score');
    container.appendChild(score)
    setInterval(self.upadteScore,100)
  }

  self.upadteScore = function(){
    scoreTimer++;
    self.upadteScoreText();
  }

  self.upadteScoreText = function(){
    score.innerHTML = `Score: ${scoreTimer}`
  }

  self.moveBtn = function(){
    const btn = document.querySelector('.score-btn');
    btn.classList.add('animBtn')
    startBTN.classList.add('animBtn')
  }

  self.endScore = function(){
    if(!localStorage.scores){
      localStorage.setItem('scores',JSON.stringify([scoreTimer]))
    }
    else{
      let scores = JSON.parse(localStorage.getItem('scores'));
      scores.push(scoreTimer);
      scores.sort(SortRecords);
      localStorage.setItem('scores',JSON.stringify(scores))
    }
  }

  self.getScore = function(){
    return scoreTimer;
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

  self.startGame = function(){
    myField.moveBtn();
    myField.initScore();
  }
}

function startGame(){
  $.ajax('../scripts/game.js',{
    type: 'GET',
    dataType: 'script'
  })
}

function SortRecords(a,b){
  if(a > b) return -1;
  if (a===b) return 0;
  if(a<b) return 1;
}

const gameController = new backgorundController();
  const gameModel = new backgorundModel();
  const gameView = new backgorundView();
  const container = document.getElementById('container')
  const startBtn = document.getElementById('start-btn');
  gameModel.initModel(gameView);
  gameView.initView(gameModel,container);
  gameController.initController(gameModel,gameView);

(function(){
  gameController.start();
  startBtn.addEventListener('click',()=>{
    gameController.startGame();
    setTimeout(startGame,1000);
  })
})();



