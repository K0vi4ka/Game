function Star(){
  let self = this;
  const container = document.getElementById('container')
  
  self.initStar = function(){
    for(let i = 1; i < 31; i++){
      const p = document.createElement('p');
      p.classList.add('star');
      p.style.transform = `translateY(${Math.floor(Math.random() * 80)}vh)`;
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

const clock = new Star();
//Какой нахуй клок?
clock.initStar();
console.log('work')