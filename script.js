const gameBoard = document.getElementById('gameBoard');
// Updated card symbols to include more pairs
const cards = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉', '🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉'];
let flippedCards = [];
let matchedCards = 0;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create card elements
cards.forEach((symbol) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

// Add event listener to the Play Again button
const playAgainButton = document.getElementById('playAgainButton');
playAgainButton.addEventListener('click', resetGame);

function flipCard() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Show the Play Again button when the game is won
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;

        if (matchedCards === cards.length) {
            setTimeout(() => {
                alert('You win!');
                playAgainButton.style.display = 'block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

function resetGame() {
    // Reset game variables
    flippedCards = [];
    matchedCards = 0;

    // Clear the game board
    gameBoard.innerHTML = '';

    // Shuffle cards and recreate the game board
    cards.sort(() => 0.5 - Math.random());
    cards.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    // Hide the Play Again button
    playAgainButton.style.display = 'none';
}