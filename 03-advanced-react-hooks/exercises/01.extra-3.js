// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

// 💯 See if you can figure out how to make your reducer support both
// the object as in the last extra credit as well as a function callback:
function countReducer(state, action) {
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

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
