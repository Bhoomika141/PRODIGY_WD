const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let isAgainstAI = true; 

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function handleCellClick(event) {
  const cellIndex = event.target.getAttribute('data-index');
  
  if (board[cellIndex] === '' && isGameActive && currentPlayer === 'X') {
    makeMove(cellIndex, currentPlayer);
    if (checkWinner()) {
      message.textContent = `${currentPlayer} Wins!`;
      isGameActive = false;
    } else if (board.includes('') === false) {
      message.textContent = 'It\'s a Tie!';
      isGameActive = false;
    } else if (isAgainstAI) {
      currentPlayer = 'O';
      message.textContent = 'AI\'s turn';
      setTimeout(aiMove, 500); 
    } else {
      currentPlayer = 'O';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}


function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}


function aiMove() {
  let availableCells = board
    .map((val, index) => (val === '' ? index : null))
    .filter(val => val !== null);

  let chosenIndex = getBestMove(); 

  makeMove(chosenIndex, 'O');

  if (checkWinner()) {
    message.textContent = 'AI Wins!';
    isGameActive = false;
  } else if (board.includes('') === false) {
    message.textContent = 'It\'s a Tie!';
    isGameActive = false;
  } else {
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}


function getBestMove() {
  
  for (let i = 0; i < winningConditions.length; i++) {
    let [a, b, c] = winningConditions[i];
    if (board[a] === 'O' && board[b] === 'O' && board[c] === '') return c;
    if (board[a] === 'O' && board[c] === 'O' && board[b] === '') return b;
    if (board[b] === 'O' && board[c] === 'O' && board[a] === '') return a;
  }

  
  for (let i = 0; i < winningConditions.length; i++) {
    let [a, b, c] = winningConditions[i];
    if (board[a] === 'X' && board[b] === 'X' && board[c] === '') return c;
    if (board[a] === 'X' && board[c] === 'X' && board[b] === '') return b;
    if (board[b] === 'X' && board[c] === 'X' && board[a] === '') return a;
  }

  
  let availableCells = board
    .map((val, index) => (val === '' ? index : null))
    .filter(val => val !== null);

  return availableCells[Math.floor(Math.random() * availableCells.length)];
}


function checkWinner() {
  return winningConditions.some(condition => {
    return condition.every(index => board[index] === currentPlayer);
  });
}


function resetGame() {
  board.fill('');
  isGameActive = true;
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

message.textContent = `Player ${currentPlayer}'s turn`;
