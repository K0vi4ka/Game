const container = document.querySelector('.score-conteiner');
const scoreContainer = document.querySelector('.scores');

function addItems(){
  let scores = JSON.parse(localStorage.getItem('scores'));
  console.log(scores);
  scores.forEach((score,index) => {
    const p = document.createElement('p');
    const span2 = document.createElement('span');
    p.innerHTML = `#${Number(index) + 1}`;
    span2.innerHTML = score;
    const div = document.createElement('div');
    div.appendChild(p)
    div.appendChild(span2);
    div.classList.add('score')
    console.log(div);
    scoreContainer.appendChild(div)
  });
}

addItems()