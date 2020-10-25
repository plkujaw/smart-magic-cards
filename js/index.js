const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const shuffleBtn = document.createElement('button');
const flipBtn = document.createElement('button');
const magicBtn = document.createElement('button');
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
let cards = [];

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

function shuffleCardsArray() {
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function makeCardsDraggable() {
  cards = cardsWrapper.children;
  [...cards].forEach((card, i) => {
    card.setAttribute('id', `${i}`);
    card.setAttribute('draggable', true);
    card.setAttribute('ondragstart', 'onDragStart(event);');
  });
}

function toggleHideCards() {
  cardsWrapper.classList.toggle('hidden');
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  const startBtn = document.getElementById('start-game');
  startBtn.parentNode.removeChild(startBtn);
  displayShuffleButton();
  displayFlipButton();
}

function doMagic() {
  const selectedCard = [...selectedCardsWrapper.children][0];
  const selectedCardValue = selectedCard.getAttribute('data-value');
  const remainedCards = [...cardsWrapper.children];
  const relatedCards = remainedCards.filter((card) => card.getAttribute('data-value') === selectedCardValue);
  cards = remainedCards.filter((card) => !relatedCards.includes(card));
  relatedCards.forEach((card, i) => {
    const marginLeft = (i + 1) * 2;
    card.style.left = '0px';
    card.style.marginLeft = `${marginLeft}rem`;
    selectedCardsWrapper.style.width = '315px';
    selectedCardsWrapper.append(card);
    
  });
}

shuffleBtn.addEventListener('click', () => {
  // remove unshuffled cards from the DOM
  while (cardsWrapper.lastElementChild) {
    cardsWrapper.removeChild(cardsWrapper.lastElementChild);
  }
  shuffleCardsArray();
  displayCards();
  makeCardsDraggable();
}, { once: true });

flipBtn.addEventListener('click', toggleHideCards);

magicBtn.addEventListener('click', () => {
  doMagic();
}, { once: true });

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
  displayCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
