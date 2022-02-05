// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

// 💯 Change your reducer to make the new API work
function countReducer(count, step) {
  return count + step;
}

function Counter({ initialCount = 0, step = 1 }) {
  // 💯 I want to change things a bit to have this API:
  const [count, changeCount] = React.useReducer(countReducer, initialCount);
  const increment = () => changeCount(step);

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
