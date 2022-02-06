// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from "react";

// 🐨 create your CountContext here with React.createContext
type CountContextType = [number, React.Dispatch<React.SetStateAction<number>>];
const CountContext = React.createContext<CountContextType | undefined>(
  undefined
);

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider
function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];
  return <CountContext.Provider value={value} {...props} />;
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  // 💥 const count = 0
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error("CountDisplay must be used within a CountProvider");
  }
  const [count] = context;
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  // 🐨 replace the fake implementation of setCount with what you get back from useContext with the CountContext
  // const setCount = () => {}
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error("Counter must be used within a CountProvider");
  }
  const [, setCount] = context;

  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
