// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.tsx

import * as React from "react";

// 💯 Change your reducer to make the new API work
type State = { count: number };
function countReducer(state: State, action: State) {
  return { ...state, ...action };
}

function Counter({ initialCount = 0, step = 1 }) {
  // 💯 Here’s how I want things to look now:
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () => setState({ count: count + step });
  const decrement = () => setState({ count: count - step });

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
