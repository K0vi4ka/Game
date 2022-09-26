const container = document.querySelector('.score-conteiner');
const scoreContainer = document.querySelector('.scores');

function addItems(){
  let scores = JSON.parse(localStorage.getItem('scores'));
  if(scores){
    scores.forEach((score,index) => {
      const p = document.createElement('p');
      const span2 = document.createElement('span');
      p.innerHTML = `#${Number(index) + 1}`;
      span2.innerHTML = score;
      const div = document.createElement('div');
      div.appendChild(p)
      div.appendChild(span2);
      div.classList.add('score')
      scoreContainer.appendChild(div)
    });
  }
  else{
    const p = document.createElement('p');
    p.innerHTML = 'Сыграй, чтобы установить рекорд';
    scoreContainer.appendChild(p);
    console.log(scoreContainer)
  }
}

(function(){
  addItems();
})();