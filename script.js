// Game board represented by a 2D array
let board = [  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Current player
let currentPlayer = 'X';
let computerPlayer = 'O';

// Check if the game has ended
let gameEnded = false;

// Check if there is a winner
function checkWinner() {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
      return board[i][0];
    }
  }
  
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== '') {
      return board[0][j];
    }
  }
  
  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
    return board[0][0];
  }
  
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
    return board[0][2];
  }
  
  // If no winner is found
  return null;
}

// Check if the game has ended in a draw
function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

// Render the board to the HTML page
function render() {
  let html = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      html += `<div id="cell-${i}-${j}" class="cell" onclick="cellClicked(${i}, ${j})">${board[i][j]}</div>`;
    }
    html += '<br>';
  }
  document.getElementById('board').innerHTML = html;
}

// Handle the player's move
function cellClicked(row, col) {
  if (gameEnded || board[row][col] !== '') {
    return;
  }
  
  board[row][col] = currentPlayer;
  render();
  
  const winner = checkWinner();
  if (winner !== null) {
    gameEnded = true;
    alert(`${winner} wins!`);
    return;
  }
  
  if (checkDraw()) {
    gameEnded = true;
    alert("It's a draw!");
    return;
  }
  
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  getComputerMove();
  render();
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}
