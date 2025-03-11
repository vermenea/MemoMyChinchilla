const cards = document.querySelectorAll('.memo-card');

const startTime = new Date().getTime();
const gameLength = cards.length / 2;
let matchedPairs = 0;

// Show cards
cards.forEach((card) => {
  card.classList.add('flipped');
});

(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * cards.length);
    card.style.order = randomPosition;
  });
})();

// After a calculated time, cover cards
const coverTime = 2000 + cards.length * 100; // Adjust the cover time based on the number of cards
setTimeout(() => {
  cards.forEach((card) => {
    card.classList.remove('flipped');
  });
}, coverTime);

function updateGameResult() {
  matchedPairs++;
  setTimeout(() => {
    if (matchedPairs === gameLength) {
      const endTime = new Date().getTime();
      const gameTime = (endTime - startTime) / 1000;
      document.getElementById(
        'gameTime'
      ).textContent = `Your score is: ${gameTime.toFixed(2)} seconds`;
      const modal = document.getElementById('gameResultModal');
      modal.style.display = 'block';

      document.getElementById('restartButton').onclick = function () {
        location.reload();
      };

      document.querySelector('.close').onclick = function () {
        modal.style.display = 'none';
      };

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      };
    }
  }, 100);
}

let clickedCards = 0;
let firstCard, secondCard;
let isFlipping = false;

cards.forEach((card) => card.addEventListener('click', flipCard));

function flipCard() {
  if (isFlipping || this.classList.contains('flipped')) {
    return;
  }

  this.classList.add('flipped');
  clickedCards++;

  if (clickedCards === 1) {
    firstCard = this;
  } else if (clickedCards === 2) {
    secondCard = this;
    isFlipping = true;

    if (
      firstCard.querySelector('.back-face').dataset.cardtype !==
      secondCard.querySelector('.back-face').dataset.cardtype
    ) {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        isFlipping = false;
      }, 1000);
    } else {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      isFlipping = false;
      updateGameResult();
    }

    clickedCards = 0;
  }
}
