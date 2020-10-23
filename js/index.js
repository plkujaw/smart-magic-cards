const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const cards = [];
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

function addShuffleButton() {
  const shuffleBtn = document.createElement('button');
  shuffleBtn.innerHTML = 'Shuffle';
  shuffleBtn.setAttribute('type', 'button');
  shuffleBtn.setAttribute('id', 'shuffle-btn');
  shuffleBtn.classList.add('btn', 'btn-lg', 'btn-secondary');
  btnWrapper.append(shuffleBtn);
}

function addFlipButton() {
  const flipBtn = document.createElement('button');
  flipBtn.innerHTML = 'Flip cards';
  flipBtn.setAttribute('type', 'button');
  flipBtn.setAttribute('id', 'flip-btn');
  flipBtn.classList.add('btn', 'btn-lg', 'btn-secondary');
  flipBtn.style.margin = '0 1rem 0 1rem';
  btnWrapper.append(flipBtn);
}

function addMagicButton() {
  const magicBtn = document.createElement('button');
  magicBtn.innerHTML = 'Magic';
  magicBtn.setAttribute('type', 'button');
  magicBtn.setAttribute('id', 'magic-btn');
  magicBtn.classList.add('btn', 'btn-lg', 'btn-secondary');
  btnWrapper.append(magicBtn);
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  // Your Code
  const startBtn = document.getElementById('start-game');
  startBtn.parentNode.removeChild(startBtn);
  addShuffleButton();
  addFlipButton();
  addMagicButton();
}

btnWrapper.addEventListener('click', (event) => {
  if (event.target.id === 'shuffle-btn') {
    shuffleCards();
    displayCards();
  } else if (event.target.id === 'flip-btn') {
    cardsWrapper.classList.toggle('hidden');
    // [...cardsWrapper.children].forEach(card => {
    //   card.classList.toggle('hidden');
    //   console.log(card.classList);
    // });
    // console.log('cards flipped');
  }
});

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
  displayCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
