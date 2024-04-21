let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function cellClicked(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} wins!`);
    } else if (board.every(cell => cell !== '')) {
        endGame("It's a tie!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            // AI makes a move after a short delay (simulate thinking time)
            setTimeout(makeAiMove, 500);
        }
    }
}

function makeAiMove() {
    // Simple AI strategy: randomly pick an empty cell
    let emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiMove = emptyCells[randomIndex];
    
    board[aiMove] = currentPlayer;
    document.getElementsByClassName('cell')[aiMove].innerText = currentPlayer;

    if (checkWin(currentPlayer)) {
        endGame(`Computer wins!`);
    } else if (board.every(cell => cell !== '')) {
        endGame("It's a tie!");
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function endGame(message) {
    document.getElementById('result').innerText = message;
    gameActive = false;
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').innerText = '';
    Array.from(document.getElementsByClassName('cell')).forEach((cell, index) => {
        cell.innerText = '';
    });

    // Reset game after AI's turn if AI played last
    if (currentPlayer === 'O') {
        setTimeout(makeAiMove, 500);
    }
}
