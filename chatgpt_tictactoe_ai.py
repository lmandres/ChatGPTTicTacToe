import random

def print_board(board):
    """
    Print the game board.
    """
    print("-------------")
    for i in range(3):
        print("|", end=" ")
        for j in range(3):
            print(board[i][j], "|", end=" ")
        print("\n-------------")

def check_win(board, player):
    """
    Check if the player has won.
    """
    for i in range(3):
        if board[i][0] == player and board[i][1] == player and board[i][2] == player:
            return True
        if board[0][i] == player and board[1][i] == player and board[2][i] == player:
            return True
    if board[0][0] == player and board[1][1] == player and board[2][2] == player:
        return True
    if board[2][0] == player and board[1][1] == player and board[0][2] == player:
        return True
    return False

def get_player_move(board, player):
    """
    Get the player's move.
    """
    while True:
        row = int(input(f"Player {player}, enter the row number (0-2): "))
        col = int(input(f"Player {player}, enter the column number (0-2): "))
        if board[row][col] == " ":
            return row, col
        else:
            print("That position is already taken. Try again.")

def get_available_moves(board):
    """
    Get the available moves on the board.
    """
    moves = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == " ":
                moves.append((i, j))
    return moves

def evaluate_board(board, player):
    """
    Evaluate the board and return a score.
    """
    if check_win(board, player):
        return 1
    elif check_win(board, get_opponent(player)):
        return -1
    else:
        return 0

def minimax(board, player, depth):
    """
    Find the best move using the minimax algorithm.
    """
    if depth == 0 or evaluate_board(board, player):
        return None, evaluate_board(board, player)
    if player == "O":
        best_score = -float("inf")
        best_move = None
        for move in get_available_moves(board):
            board[move[0]][move[1]] = player
            score = minimax(board, get_opponent(player), depth - 1)[1]
            board[move[0]][move[1]] = " "
            if score > best_score:
                best_score = score
                best_move = move
        return best_move, best_score
    else:
        best_score = float("inf")
        best_move = None
        for move in get_available_moves(board):
            board[move[0]][move[1]] = player
            score = minimax(board, get_opponent(player), depth - 1)[1]
            board[move[0]][move[1]] = " "
            if score < best_score:
                best_score = score
                best_move = move
        return best_move, best_score

def get_computer_move(board, player):
    """
    Get the computer's move.
    """
    depth = len(get_available_moves(board))
    if depth == 0:
        return None
    elif depth == 9:
        return random.choice(get_available_moves(board))
    else:
        return minimax(board, player, depth)[0]

def get_opponent(player):
    """
    Get the opponent's symbol.
    """
    if player == "X":
        return "O"
    else:
        return "X"


def tic_tac_toe():
    """
    Play Tic Tac Toe.
    """
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    players = ["X", "O"]
    current_player = players[0]
    while True:
        print_board(board)
        if current_player == "X":
            row, col = get_player_move(board, current_player)
        else:
            print(f"Player {current_player}, it's your turn.")
            row, col = get_computer_move(board, current_player)
        board[row][col] = current_player
        if check_win(board, current_player):
            print_board(board)
            print(f"Player {current_player} has won!")
            break
        elif all(board[i][j] != " " for i in range(3) for j in range(3)):
            print_board(board)
            print("It's a tie!")
            break
        current_player = players[(players.index(current_player) + 1) % 2]

tic_tac_toe()

