const grid = document.getElementById('game-grid');
const movesDisplay = document.getElementById('moves');
const startBtn = document.getElementById('start');
const startGameBtn = document.getElementById('startGame');
const timerDisplay = document.getElementById('timer');
const maseage = document.querySelector(".maseage");

let flippedCards = [];
let moves = 0;
let matchedPairs = 0;
let timeLeft = 120;
let timerInterval;

// Humein 32 unique symbols chahiye 8x8 (64 cards) ke liye
const symbols = [
    '🍎','🍌','🍇','🍓','🍒','🍍','🥝',
    '🍔','🍕','🌮','🍣','🍦','🍩','🍫',
    '🚗','🚀','🚁','🚂','⛵️','🛰️',
     // Total 32 symbols
];
// const symbols = [
//     '🍎','🍌','🍇','🍓','🍒','🍍','🥝','🍉','🍋','🍐',
//     '🍔','🍕','🌮','🍣','🍦','🍩','🍪','🍫','🍯','🧁',
//     '🚗','🚀','🚁','🚲','🚂','⛵️','🛰️','🛸','🚜','🚒',
//     '🎸','🎺' // Total 32 symbols
// ];

function initGame() {
    grid.innerHTML = '';
    moves = 0;
    matchedPairs = 0;
    movesDisplay.innerText = moves;

    // 1. 32 symbols ke pairs banana (32 * 2 = 64 cards)
    let gameSymbols = [];
    symbols.forEach(s => {
        gameSymbols.push(s, s);
    });

    // 2. Shuffle (Fisher-Yates Shuffle algorithm for better randomness)
    for (let i = gameSymbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameSymbols[i], gameSymbols[j]] = [gameSymbols[j], gameSymbols[i]];
    }

    // 3. Grid mein cards add karna
    gameSymbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.innerHTML = `
            <div class="card-face card-front">?</div>
            <div class="card-face card-back">${symbol}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });

    // CSS Grid ko 8x8 par set karna code se hi control karein
    grid.style.gridTemplateColumns = 'repeat(8, 1fr)';
    grid.style.gridTemplateRows = 'repeat(5, 1fr)';
}

function flipCard(card) {

    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        
        // 8x8 grid mein 32 pairs hote hain
        if (matchedPairs === 32) {
            setTimeout(() => {
                alert(`Shandaar! Aapne ${moves} moves mein game khatam kiya.`);
                initGame(); // Game reset
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

startGameBtn.addEventListener('click', ()=>{
    timerDisplay.color = "blake"
    maseage.innerText = ""
    maseage.style.backgroundColor =  "";
    startGameBtn.innerText = "Reset Game"
    timeLeft = 3;
    timerDisplay.innerText = timeLeft;
    startBtn.style.display = 'none';
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            maseage.innerText = `Time Up | moves ${moves}`
            maseage.style.backgroundColor =  "#d0a5cacc";
            console.log("a")
            clearInterval(timerInterval);
        }
    }, 1000);
});

initGame();