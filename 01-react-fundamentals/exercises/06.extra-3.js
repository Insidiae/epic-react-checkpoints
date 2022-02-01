// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";

function UsernameForm({ onSubmitUsername }) {
  // 💯 Store the input’s value in a state variable (via React.useState)
  const [username, setUsername] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // 💯 Use the state variable to get the value from the input
    onSubmitUsername(username);
  }

  function handleChange(event) {
    const value = event.target.value;

    // 💯 Anytime there’s a change we’ll call `.toLowerCase()` on the value
    // to ensure that it’s always the lower case version of what the user types
    // 💯 Call the state updater to keep the input's value up-to-date
    setUsername(value.toLowerCase());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        {/* 💯 Pass the state variable to the input's value prop */}
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
  const onSubmitUsername = (username) => alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export default App;
