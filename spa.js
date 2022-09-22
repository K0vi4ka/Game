  const gameBtn = document.querySelector('game_link')
  const scoreBtn = document.querySelector('score_link');

  gameBtn.addEventListener('click',openGamePage);
  scoreBtn.addEventListener('click',openScoreLink);

  function openGamePage(e){
    e.preventDefault();
    window.location.hash = 'game'
  }

  function openScoreLink(e){
    e.preventDefault();
    window.location.hash = 'score'
  }

  function openMainPage(){
    e.preventDefault();
    window.location.hash = 'index'
  }

function renderPage(data){
  const body = document.querySelector('body');
  body.innerHTML = data
}

window.onhashchange = function(e){
  const hash = location.hash.substr(1);
  $.ajax(`${hash}+html`,{
    type: 'GET',
    dataType: 'html',
    success: renderPage,
  })
}

