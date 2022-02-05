// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

// 💯 Change your reducer to make the new API work
function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.step };
    default:
      throw new Error(`Unsupported action type: ${action.type}.`);
  }
}

function Counter({ initialCount = 0, step = 1 }) {
  // 💯 Update your reducer so I can do this:
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () => dispatch({ type: "INCREMENT", step });

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
