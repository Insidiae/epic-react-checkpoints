// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

// 💯 Create a custom hook called `useLocalStorageState`
// to reuse the logic of getting the state to and from localStorage.
function useLocalStorageState(key, defaultValue = "") {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

function Greeting({ initialName = "" }) {
  const [name, setName] = useLocalStorageState("name", initialName);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
