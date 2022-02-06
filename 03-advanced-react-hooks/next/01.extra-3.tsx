// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.tsx

import * as React from "react";

// 💯 See if you can figure out how to make your reducer support both
// the object as in the last extra credit as well as a function callback:
type State = { count: number };
function countReducer(
  state: State,
  action: State | ((currentState: State) => State)
) {
  return {
    ...state,
    ...(typeof action === "function" ? action(state) : action),
  };
}

function Counter({ initialCount = 0, step = 1 }) {
  // 💯 Here’s how I want things to look now:
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () =>
    setState((currentState) => ({ count: currentState.count + step }));
  const decrement = () =>
    setState((currentState) => ({ count: currentState.count - step }));

  return (
    <div className="counter">
      <button onClick={decrement}>⬅️</button>
      {count}
      <button onClick={increment}>➡️</button>
    </div>
  );
}

function App() {
  return <Counter />;
}

export default App;
