import { useState } from "react";
export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [togglePlayer, setTogglePlayer] = useState(true);
  function checkWinningState(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
  function handleClick(value) {
    console.log("Clicked", value);
    if (checkWinningState(board) || board[value]) {
      console.log("In if", board[value]);
      return;
    }
    const updatedBoard = board.slice();
    if (togglePlayer) {
      updatedBoard[value] = "X";
    } else {
      updatedBoard[value] = "O";
    }
    setBoard(updatedBoard);
    setTogglePlayer(!togglePlayer);
  }
  function Square({ value, handleClick }) {
    return (
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    );
  }
  const winner = checkWinningState(board);
  var msg = "";
  if (winner) {
    msg = winner + " " + "won";
  } else {
    msg = "Current Player: " + (togglePlayer ? "X" : "O");
  }
  return (
    <>
      <p>{msg}</p>
      <div className="board-row">
        <Square value={board[0]} handleClick={() => handleClick(0)} />
        <Square value={board[1]} handleClick={() => handleClick(1)} />
        <Square value={board[2]} handleClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={board[3]} handleClick={() => handleClick(3)} />
        <Square value={board[4]} handleClick={() => handleClick(4)} />
        <Square value={board[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={board[6]} handleClick={() => handleClick(6)} />
        <Square value={board[7]} handleClick={() => handleClick(7)} />
        <Square value={board[8]} handleClick={() => handleClick(8)} />
      </div>
    </>
  );
}
