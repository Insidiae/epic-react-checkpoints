// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";

function UsernameForm({ onSubmitUsername }) {
  // 💯 Create a component state to store the dynamic values
  // (an error message in our case)
  const [error, setError] = React.useState(null);

  const usernameInputRef = React.useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    const value = usernameInputRef.current.value;
    onSubmitUsername(value);
  }

  // 💯 Create a `handleChange` function that accepts the change `event`
  // and uses `event.target.value` to get the value of the input.
  // Remember this event will be triggered on the input, not the form.
  function handleChange(event) {
    const value = event.target.value;

    // 💯 Use the value of the input to determine whether there’s an error.
    // There’s an error if the user typed any upper-case characters.
    // You can check this really easily via `const isValid = value === value.toLowerCase()`
    const isValid = value === value.toLowerCase();

    // 💯 If there’s an error, set the error state to 'Username must be lower case'.
    // 💰 here’s how you do that: setError(isValid ? null : 'Username must be lower case')
    setError(isValid ? null : "Username must be lower case");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        {/* 💯 Make sure you pass handleChange to the onChange handler of the input. */}
        <input
          id="usernameInput"
          type="text"
          ref={usernameInputRef}
          onChange={handleChange}
        />
        {/* 💯 Display the error in an element, adding a `role="alert"`
         to assist with screen reader users. */}
        <div role="alert" style={{ color: "red" }}>
          {error}
        </div>
      </div>
      {/* 💯 Disable the submit button if there’s an error. */}
      <button type="submit" disabled={Boolean(error)}>
        Submit
      </button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username) => alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
