const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetBtn = document.querySelector('.reset');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreTieEl = document.getElementById('scoreTie');

let board = Array(9).fill('');
let turn = 'X';
let scores = { X:0, O:0, Tie:0 };

const clickSound = new Audio('click.mp3');
const winSound = new Audio('win.mp3');
const tieSound = new Audio('tie.mp3');

function playSound(sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("User interaction needed for sound"));
}

function celebrateWin() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function checkWin() {
    const winConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let [a,b,c] of winConditions) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.textContent = `${board[a]} Wins! 🎉`;
            cells[a].style.background = cells[b].style.background = cells[c].style.background = '#f87171';
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            scores[board[a]]++;
            updateScores();
            playSound(winSound);
            celebrateWin();
            return true;
        }
    }

    if (!board.includes('')) {
        message.textContent = "It's a Tie! 😭";
        scores.Tie++;
        updateScores();
        playSound(tieSound);
        return true;
    }

    return false;
}

function handleClick(e) {
    const index = e.target.getAttribute('data-cell-index');
    if (board[index] !== '') return;

    board[index] = turn;
    e.target.textContent = turn;
    e.target.style.color = turn === 'X' ? '#ef4444' : '#3b82f6';
    e.target.classList.add('clicked');
    playSound(clickSound);

    if (!checkWin()) {
        turn = turn === 'X' ? 'O' : 'X';
        message.textContent = `Turn: ${turn}`;
    }
}

function resetGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = 'rgba(255,255,255,0.2)';
        cell.classList.remove('winner','clicked');
    });
    turn = 'X';
    message.textContent = `Turn: ${turn}`;
}

function updateScores() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreTieEl.textContent = scores.Tie;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
