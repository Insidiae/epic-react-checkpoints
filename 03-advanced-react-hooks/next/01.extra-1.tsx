// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.tsx

import * as React from "react";

// 💯 Change your reducer to make the new API work
function countReducer(count: number, change: number) {
  return count + change;
}

function Counter({ initialCount = 0, step = 1 }) {
  // 💯 I want to change things a bit to have this API:
  const [count, changeCount] = React.useReducer(countReducer, initialCount);
  const increment = () => changeCount(step);
  const decrement = () => changeCount(-step);

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
