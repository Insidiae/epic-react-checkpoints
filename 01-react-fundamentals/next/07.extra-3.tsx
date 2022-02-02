// Basic Forms
// http://localhost:3000/isolated/exercise/07.tsx

import * as React from "react";
// 💯 Your co-worker already created a utility function
// that can give you a random username which you can import into your file with:
import { getRandomUsername } from "../utils";

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void;
}) {
  // 💯 Create a component state to store the dynamic values
  // (the username in our case)
  // 💰 const [username, setUsername] = React.useState('')
  const [username, setUsername] = React.useState("");

  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const value = event.currentTarget.elements.usernameInput.value;
    onSubmitUsername(value);
  }

  // 💯 Create a `handleChange` function that accepts the change `event`
  // and uses `event.currentTarget.value` to get the value of the input
  // and sets that to the username via `setUsername`.
  // 🦺 Remember this event is a `ChangeEvent` and will be triggered
  // on an `HTMLInputElement`, not the form
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  // 💯 Create a `handleRandomClick` function
  // that calls `setUsername` with `getRandomUsername()`
  function handleRandomClick() {
    setUsername(getRandomUsername());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* 💯 Create a button that says “Random” and set its `onClick`
         to your `handleRandomClick` function */}
        <div>
          <button type="button" onClick={handleRandomClick}>
            Random
          </button>
        </div>
        <label htmlFor="usernameInput">Username:</label>
        {/* 💯 Pass the state variable to the input's value prop */}
        {/* 💯 Set the `onChange` prop of the input to your `handleChange` function. */}
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username: string) =>
    alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export { App };
