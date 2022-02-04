// Real World Review: Tic Tac Toe
// http://localhost:3000/isolated/exercise/04.tsx

import * as React from "react";
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from "../tic-tac-toe-utils";
import type { Squares } from "../tic-tac-toe-utils";
// 💰 `useLocalStorageState` is already provided in `src/utils.js`
import { useLocalStorageState } from "../utils";

function Board() {
  // 💯 Use the `useLocalStorageState` custom hook
  const [squares, setSquares] = useLocalStorageState<Squares>(
    "squares",
    Array(9).fill(null)
  );

  React.useEffect(() => {
    window.localStorage.setItem("squares", JSON.stringify(squares));
  }, [squares]);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square: number) {
    if (winner || squares[square]) {
      return;
    }

    setSquares((previousSquares) => {
      const squaresCopy = [...previousSquares];
      squaresCopy[square] = nextValue;
      return squaresCopy;
    });
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i: number) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export { App };
