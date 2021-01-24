const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const scoreboard = document.querySelector('.scoreboard')

let totalScore = 0;
let score = 0;
let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 12;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 12;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = window.innerWidth - 60;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let updateScore = setInterval(() => {
    score++;
    scoreboard.innerHTML = "SCORE: " + score;
  }, 100);

  let leftTimer = setInterval(() => {
    
    if (cactusPosition < -60) {      
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      clearInterval(updateScore);
      totalScore = score;
      isGameOver = true;
      document.body.innerHTML = `<h1 class="game-over">Fim de Jogo <br /><br /><br /> Score: ${totalScore}</h1><br />`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);