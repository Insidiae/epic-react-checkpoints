// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from "react";

type CountContextType = [number, React.Dispatch<React.SetStateAction<number>>];
const CountContext = React.createContext<CountContextType | undefined>(
  undefined
);

function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
}

// 💯 Create a custom hook that I can use like this:
// 💰 const [count, setCount] = useCount()
function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

function CountDisplay() {
  const [count] = useCount();

  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useCount();

  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;