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

function Board({
  squares,
  onClick,
}: {
  squares: Squares;
  onClick: (index: number) => void;
}) {
  // 💯 Move the state management code to the App component

  function renderSquare(i: number) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
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
    </div>
  );
}

const initialState = {
  history: [Array(9).fill(null)],
  currentStep: 0,
};

function App() {
  // 💯 Keep track of the game history
  const [state, setState] = useLocalStorageState<{
    history: Array<Squares>;
    currentStep: number;
  }>("tic-tac-toe", initialState);
  const { history, currentStep } = state;

  // 💯 Move the old state management code here
  // 💯 Adjust the code to allow keeping track of the game history
  const currentSquares = history[currentStep] ?? Array(9).fill(null);

  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function selectSquare(square: number) {
    if (winner || currentSquares[square]) {
      return;
    }

    setState((previousState) => {
      const newHistory = previousState.history.slice(0, currentStep + 1);
      const squares = [...currentSquares];

      squares[square] = nextValue;
      return {
        history: [...newHistory, squares],
        currentStep: newHistory.length,
      };
    });
  }

  function restart() {
    setState(initialState);
  }

  // 💯 Implement the game history feature
  // and allow the user to go backward and forward in time
  const moves = history.map((stepSquares, step) => {
    const desc = step ? `Go to move #${step}` : "Go to game start";
    const isCurrentStep = step === currentStep;
    function moveHistory() {
      setState((previousState) => ({ ...previousState, currentStep: step }));
    }
    // NOTE: the "step" is actually the "index" which normally you don't want to
    // use as the "key" prop. However, in this case, the index is effectively
    // the "id" of the step in history, so it is correct.
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={moveHistory}>
          {desc} {isCurrentStep ? "(current)" : null}
        </button>
      </li>
    );
  });

  // 💣 Remove this JSX in favor of the new one
  // 💥 return (
  // 💥   <div className="game">
  // 💥     <div className="game-board">
  // 💥       <Board />
  // 💥     </div>
  // 💥   </div>
  // 💥 )

  // 💯 Here's the final version of the JSX:
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export { App };
