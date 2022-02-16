// Production performance monitoring
// http://localhost:3000/isolated/exercise/07.js

import * as React from "react";
// 💯 Import the experimental trace API
//! WARNING! As of React 17, the experimental trace API is now removed.
import { unstable_trace as trace } from "scheduler/tracing";
import reportProfile from "../report-profile";

function Counter() {
  const [count, setCount] = React.useState(0);
  // 💯 Add tracing for the click of the counter
  // const increment = () => setCount((c) => c + 1)
  const increment = () =>
    trace("click", performance.now(), () => setCount((c) => c + 1));
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return (
    <div>
      <React.Profiler id="counter" onRender={reportProfile}>
        <div>
          Profiled counter
          <Counter />
        </div>
      </React.Profiler>
      <div>
        Unprofiled counter
        <Counter />
      </div>
    </div>
  );
}

export default App;
