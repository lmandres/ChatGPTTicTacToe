humanPlayer = currentPlayer;

// Evaluate the score for the current board state
function evaluate(board) {
  // Check for a winner
  let winner = checkWinner(board);
  if (winner === humanPlayer) {
    return -10;
  } else if (winner === computerPlayer) {
    return 10;
  } else if (getEmptyCells(board).length === 0) {
    return 0;
  }

  // No winner yet and there are still empty cells
  return null;
}

// Get the computer's move using the Minimax algorithm
function getComputerMove() {
  let bestScore = -Infinity;
  let bestMove;

  // Loop through all possible moves
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = computerPlayer;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
  }

  // Make the best move
  board[bestMove.i][bestMove.j] = computerPlayer;
}

// Minimax algorithm with alpha-beta pruning
function minimax(board, depth, maximizingPlayer, alpha = -Infinity, beta = Infinity) {
  // Evaluate the score for the current board state
  let score = evaluate(board);
  if (score !== null) {
    return score;
  }

  if (maximizingPlayer) {
    let maxScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = computerPlayer;
          let score = minimax(board, depth + 1, false, alpha, beta);
          board[i][j] = '';
          maxScore = Math.max(maxScore, score);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = humanPlayer;
          let score = minimax(board, depth + 1, true, alpha, beta);
          board[i][j] = '';
          minScore = Math.min(minScore, score);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return minScore;
  }
}

// Get an array of empty cells on the board
function getEmptyCells(board) {
  let emptyCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        emptyCells.push({ i, j });
      }
    }
  }
  return emptyCells;
}

