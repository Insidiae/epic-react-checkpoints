// Real World Review: Tic Tac Toe
// http://localhost:3000/isolated/exercise/04.tsx

import * as React from "react";
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from "../tic-tac-toe-utils";
import type { Squares } from "../tic-tac-toe-utils";

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  const [squares, setSquares] = React.useState<Squares>(Array(9).fill(null));

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square: number) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner || squares[square]) {
      return;
    }

    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.

    // 🐨 call setSquares, accept the "previousSquares", and do this:
    //   🐨 make a copy of the squares array
    //   💰 `[...previousSquares]` will do it!
    setSquares((previousSquares) => {
      const squaresCopy = [...previousSquares];

      //   🐨 set the value of the square that was selected
      //   💰 `squaresCopy[index] = nextValue`
      squaresCopy[square] = nextValue;

      //   🐨 return your copy of the squares
      return squaresCopy;
    });
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
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
      {/* 🐨 put the status in the div below */}
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
