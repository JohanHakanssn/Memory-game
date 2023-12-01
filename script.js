let userName1 = 0;
let userName2 = 0;
let flippedCards = [];
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
let player = 1;

//funktion för att spara spelarnamnen
function saveUserName() {
  userName1 = document.querySelector('.user__name1').value;
  document.querySelector('.p__player1').textContent = userName1;

  userName2 = document.querySelector('.user__name2').value;
  document.querySelector('.p__player2').textContent = userName2;
}

const memoryArray = [
  '🐦',
  '🦢',
  '🐔',
  '🐢',
  '🐯',
  '🐷',
  '🐋',
  '🦀',
  '🐌',
  '🪰',
  '🐮',
  '🦔',
];
const shuffledEmojis = [...memoryArray, ...memoryArray].sort(
  () => Math.random() - 0.5
);
//Funktion för att skapa tiles
function createCard(emoji) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<span>${emoji}</span>`;
  card.addEventListener('click', flipCard);
  return card;
}
//funktion för att vända kortet
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 400);
    }
  }
}
//Funktion för att se om korten matchar.
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.children[0].innerText === card2.children[0].innerText) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);

    // Uppdatera poäng för den nuvarande spelaren
    if (player === 1) {
      pointsPlayer1 += 5;
      document.querySelector('.spelare1__poäng').textContent = pointsPlayer1;

      // Lägg till en klass för att ändra bakgrundsfärgen på matchande kort för spelare 1
      card1.classList.add('matched');
      card2.classList.add('matched');
    } else {
      pointsPlayer2 += 5;
      document.querySelector('.spelare2__poäng').textContent = pointsPlayer2;

      // Lägg till en klass för att ändra bakgrundsfärgen på matchande kort för spelare 2
      card1.classList.add('matched-player2');
      card2.classList.add('matched-player2');
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');

    // Växla till den andra spelaren
    player = player === 1 ? 2 : 1;
  }

  flippedCards = [];

  // Checka om alla kort har vänts (matchats)
  if (
    document.querySelectorAll('.card.flipped').length === shuffledEmojis.length
  ) {
    // Visa vinnaren eller oavgjort här
    if (pointsPlayer1 > pointsPlayer2) {
      document.querySelector('.p__winner').textContent =
        'Vinnare: ' + userName1;
      document.querySelector('.p__winner').style.display = 'block';
    } else if (pointsPlayer1 < pointsPlayer2) {
      document.querySelector('.p__winner').textContent =
        'Vinnare: ' + userName2;
      document.querySelector('.p__winner').style.display = 'block';
    } else {
      document.querySelector('.p__oavgjort').style.display = 'block';
    }
  }
}

function restart__btn() {
  location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
  const gameContainer = document.querySelector('.memory-game');

  shuffledEmojis.forEach((emoji) => {
    const card = createCard(emoji);
    gameContainer.appendChild(card);
  });
});
