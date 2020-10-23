const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const shuffleBtn = document.createElement('button');
const flipBtn = document.createElement('button');
// const magicBtn = document.createElement('button');
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
let cards = [];
// const selectedCard = [];

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  suits.forEach((suit) => [...Array(13)].forEach((_, i) => {
    const cardObject = {
      value: i + 1,
      suit,
    };
    cards.push(cardObject);
  }));
}

function displayCards() {
  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 24;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

function displayShuffleButton() {
  shuffleBtn.innerHTML = 'Shuffle';
  shuffleBtn.setAttribute('type', 'button');
  shuffleBtn.setAttribute('id', 'shuffle-btn');
  shuffleBtn.classList.add('btn', 'btn-lg', 'btn-secondary');
  btnWrapper.append(shuffleBtn);
}

function displayFlipButton() {
  flipBtn.innerHTML = 'Flip cards';
  flipBtn.setAttribute('type', 'button');
  flipBtn.setAttribute('id', 'flip-btn');
  flipBtn.classList.add('btn', 'btn-lg', 'btn-secondary');
  flipBtn.style.margin = '0 1rem 0 1rem';
  btnWrapper.append(flipBtn);
}

// function displayMagicButton() {
//   magicBtn.innerHTML = 'Magic';
//   magicBtn.setAttribute('type', 'button');
//   magicBtn.setAttribute('id', 'magic-btn');
//   magicBtn.classList.add('btn', 'btn-lg', 'btn-secondary');
//   btnWrapper.append(magicBtn);
// }

function shuffleCardsArray() {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function toggleHideCards() {
  cardsWrapper.classList.toggle('hidden');
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  // Your Code
  const startBtn = document.getElementById('start-game');
  startBtn.parentNode.removeChild(startBtn);
  displayShuffleButton();
  displayFlipButton();
}

shuffleBtn.addEventListener('click', () => {
  shuffleCardsArray();
  displayCards();
});

flipBtn.addEventListener('click', () => {
  toggleHideCards();
});

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
  displayCards();

  [...cardsWrapper.children].forEach((selectedCard) => {
    selectedCard.addEventListener('click', function() {
      cards = [selectedCard];
    // console.log(cards);
    });
  });
}

document.getElementById('start-game').addEventListener('click', startGame);
