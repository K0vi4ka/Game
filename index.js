function Star(){
  let self = this;
  const container = document.getElementById('container')
  
  self.initStar = function(){
    for(let i = 1; i < 31; i++){
      const p = document.createElement('p');
      p.classList.add('star');
      p.style.top = Math.floor(Math.random() * 70) + 'vh';
      p.style.animationDelay = Math.random() * 2 + 's'
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

const stars = new Star();
stars.initStar();
