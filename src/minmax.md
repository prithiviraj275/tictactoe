
  /**Play with computer code */

  /**Minimax algorithm */

  const minimax = (board, depth, is_maximizing, max_depth) => {
    if (checkWin(board, turn)) {
      return turn ? -1 : 1;
    } else if (!winner || depth == max_depth) {
      return 0;
    }

    if (is_maximizing) {
      let max_eval = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = "o";
            let evalue = minimax(board, depth + 1, false, max_depth);
            board[i][j] = "";
            max_eval = Math.max(max_eval, evalue);
          }
        }
      }
      return max_eval;
    } else {
      let min_eval = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = "o";
            let evalue = minimax(board, depth + 1, true, max_depth);
            board[i][j] = "";
            min_eval = Math.min(min_eval, evalue);
          }
        }
      }
      return min_eval
    }
  };

  const computerTurn = () => {
    let best_eval = -Infinity;
    let best_move = null;
    let max_depth = 3;
    if (lock) {
      return 0;
    }
    const newGameVal = gameVal;
    console.log(gameVal)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newGameVal[i][j] == "") {
          newGameVal[i][j] = "o";
          const evalue = minimax(newGameVal, 0, false, max_depth);
          newGameVal[i][j] = "";
          if (evalue > best_eval) {
            best_eval = evalue;
            best_move = [i, j];
          }
        }
      }
    }
    newGameVal[best_move[0]][best_move[1]] = "o";
    setGameVal(newGameVal);
    setTotalCount(totalCount + 1);
    checkWin(gameVal,turn);
    setTurn(true);
  };

  const toggleComputer = (e, rowIndex, cellIndex) => {
    if (lock) {
      return 0;
    }
    console.log(turn, "playerclicked");
    const newGameVal = [...gameVal];
    newGameVal[rowIndex][cellIndex] = "x";
    setGameVal(newGameVal);  
    setTotalCount(totalCount + 1);
    console.log(totalCount);
    checkWin(gameVal,turn);
    setTurn(false);
    computerTurn();
  };