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

def tic_tac_toe():
    """
    Play Tic Tac Toe.
    """
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
    current_player = "X"
    while True:
        print_board(board)
        print(f"Player {current_player}, it's your turn.")
        row = int(input("Enter the row number (0-2): "))
        col = int(input("Enter the column number (0-2): "))
        if board[row][col] == " ":
            board[row][col] = current_player
            if check_win(board, current_player):
                print_board(board)
                print(f"Player {current_player} has won!")
                break
            elif all(board[i][j] != " " for i in range(3) for j in range(3)):
                print_board(board)
                print("It's a tie!")
                break
            current_player = "O" if current_player == "X" else "X"
        else:
            print("That position is already taken. Try again.")
            
tic_tac_toe()

