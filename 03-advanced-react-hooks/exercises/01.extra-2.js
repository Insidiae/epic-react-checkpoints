// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

// 💯 Change your reducer to make the new API work
function countReducer(state, action) {
  return { ...state, ...action };
}

function Counter({ initialCount = 0, step = 1 }) {
  // 💯 Here’s how I want things to look now:
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () => setState({ count: count + step });

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
