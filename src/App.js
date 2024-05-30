import React, { useRef, useState, useEffect, useCallback } from "react";
import TicTacToe from "./Components/TicTacToe";

function App() {
  const initialGameData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [gameVal, setGameVal] = useState(initialGameData);
  const [turn, setTurn] = useState(true); // true = x, false = o
  const [lock, setLock] = useState(false);
  const titleref = useRef(null);
  const [totalCount, setTotalCount] = useState(0);
  const [dashdata, setDashData] = useState(true);
  const [player, setPlayer] = useState("");
  const [gameplay, setGameplay] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [showpopup, setShowpopup] = useState(false);

  const handleDifficulty = useCallback(
    (e) => {
      let difficultyLevel = e.target.innerText;
      setDifficulty(difficultyLevel);
      setShowpopup(false);
    },
    [setDifficulty, setShowpopup]
  );

  const handleshowpopup = () => {
    setShowpopup(!showpopup);
  };

  const viewDashboard = () => {
    setDashData(!dashdata);
    setPlayer("");
    setGameVal([...initialGameData]);
    setLock(false);
    setTotalCount(0);
    setTurn(true);
    setShowpopup(false);
    setDifficulty(null);
  };

  const computervsplayer = (e, rowi, coli) => {
    if (turn) {
      playerTurn(e, rowi, coli);
    }
  };

  const minimax = useCallback((board, depth, isMax) => {
    const score = evaluate(board);
    if (score === 10 || score === -10) return score;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = "o";
            best = Math.max(best, minimax(board, depth + 1, !isMax));
            board[i][j] = "";
          }
        }
      }
      return best;
    } else {
      let best = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = "x";
            best = Math.min(best, minimax(board, depth + 1, !isMax));
            board[i][j] = "";
          }
        }
      }
      return best;
    }
  }, []);

  const isMovesLeft = (board) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") return true;
      }
    }
    return false;
  };

  const evaluate = (b) => {
    for (let row = 0; row < 3; row++) {
      if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
        if (b[row][0] === "x") return -10;
        else if (b[row][0] === "o") return 10;
      }
    }
    for (let col = 0; col < 3; col++) {
      if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
        if (b[0][col] === "x") return -10;
        else if (b[0][col] === "o") return 10;
      }
    }
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
      if (b[0][0] === "x") return -10;
      else if (b[0][0] === "o") return 10;
    }
    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
      if (b[0][2] === "x") return -10;
      else if (b[0][2] === "o") return 10;
    }
    return 0;
  };

  const checkWin = useCallback((currentGameVal) => {
    const winConditions = [
      [currentGameVal[0][0], currentGameVal[0][1], currentGameVal[0][2]],
      [currentGameVal[1][0], currentGameVal[1][1], currentGameVal[1][2]],
      [currentGameVal[2][0], currentGameVal[2][1], currentGameVal[2][2]],
      [currentGameVal[0][0], currentGameVal[1][0], currentGameVal[2][0]],
      [currentGameVal[0][1], currentGameVal[1][1], currentGameVal[2][1]],
      [currentGameVal[0][2], currentGameVal[1][2], currentGameVal[2][2]],
      [currentGameVal[0][0], currentGameVal[1][1], currentGameVal[2][2]],
      [currentGameVal[0][2], currentGameVal[1][1], currentGameVal[2][0]],
    ];

    for (const condition of winConditions) {
      if (
        condition[0] === condition[1] &&
        condition[1] === condition[2] &&
        condition[0] !== ""
      ) {
        return won(condition[0] === "x" ? "x" : "o");
      }
    }

    if (currentGameVal.flat().every((cell) => cell !== "")) {
      return won("draw");
    }
  }, []);

  const computerTurn = useCallback(() => {
    const board = [...gameVal];
    let bestVal = -Infinity;
    let bestMove = [-1, -1];
    let depth = 0;

    // Adjust depth based on the selected difficulty
    if (difficulty === "Easy") {
      depth = 2; // Low depth for easy difficulty
    } else if (difficulty === "Medium") {
      depth = 4; // Medium depth for medium difficulty
    } else if (difficulty === "Hard") {
      depth = 6; // High depth for hard difficulty
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = "o";
          const moveVal = minimax(board, depth, false);
          board[i][j] = "";

          if (moveVal > bestVal) {
            bestMove = [i, j];
            bestVal = moveVal;
          }
        }
      }
    }

    if (bestMove[0] !== -1) {
      board[bestMove[0]][bestMove[1]] = "o";
      setGameVal(board);
      checkWin(board);
      setTurn(!turn);
      setTotalCount(totalCount + 1);
    }
  }, [gameVal, turn, totalCount, minimax, checkWin, difficulty]);

  useEffect(() => {
    if (!turn && player === "computer" && !lock) {
      setTimeout(computerTurn, 500);
    }
  }, [turn, player, lock, computerTurn]); // Add computerTurn to the dependency array

  const playerTurn = (e, rowIndex, cellIndex) => {
    if (lock || gameVal[rowIndex][cellIndex] !== "") return;

    const newGameVal = gameVal.map((row, i) =>
      row.map((cell, j) =>
        i === rowIndex && j === cellIndex ? (turn ? "x" : "o") : cell
      )
    );

    setGameVal(newGameVal);
    checkWin(newGameVal);
    setTurn(!turn);
    setTotalCount(totalCount + 1);
    if (gameplay === "player vs computer" && turn) {
      setPlayer("computer");
    }
  };

  const won = (result) => {
    setLock(true);
    if (result === "draw") {
      titleref.current.innerText = "Game is Draw";
    } else if (result === "x") {
      titleref.current.innerText = "X is the Winner";
    } else if (result === "o") {
      titleref.current.innerText = "O is the Winner";
    }
  };

  const resetData = () => {
    setGameVal([...initialGameData]);
    setLock(false);
    setTotalCount(0);
    setTurn(true);
  };

  return (
    <div className="App">
      <TicTacToe
        gameVal={gameVal}
        toggle={playerTurn}
        resetData={resetData}
        titleref={titleref}
        lock={lock}
        dashdata={dashdata}
        setDashData={setDashData}
        player={player}
        setPlayer={setPlayer}
        viewDashboard={viewDashboard}
        setGameplay={setGameplay}
        gameplay={gameplay}
        toggleComputer={computervsplayer}
        showpopup={showpopup}
        handleshowpopup={handleshowpopup}
        handleDifficulty={handleDifficulty}
      />
    </div>
  );
}

export default App;
