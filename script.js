const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.getElementById('reset');
const resetWinsButton = document.getElementById('resetWins');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
resetWinsButton.addEventListener('click', resetWins);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.setAttribute('data-symbol', currentPlayer);

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins!`;
        updateScore(currentPlayer);
        highlightWin();
        gameActive = false;
        setTimeout(resetGame, 2000); // Автоматический перезапуск через 2 секунды
        return;
    }

    if (gameState.every(cell => cell !== '')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
        setTimeout(resetGame, 2000); // Автоматический перезапуск через 2 секунды
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function highlightWin() {
    winningConditions.forEach(condition => {
        if (condition.every(index => gameState[index] === currentPlayer)) {
            condition.forEach(index => {
                cells[index].classList.add('win');
            });
        }
    });
}

function updateScore(player) {
    scores[player]++;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.removeAttribute('data-symbol');
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
    gameActive = true;
}

function resetWins() {
    scores = { X: 0, O: 0 };
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Анимация появления картинки
window.addEventListener('load', () => {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.style.top = '0'; // Плавное появление сверху
});
