// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";

function UsernameForm({ onSubmitUsername }) {
  // 💯 Try to get the usernameInput’s value using a ref.
  const usernameInputRef = React.useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    const value = usernameInputRef.current.value;
    onSubmitUsername(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" ref={usernameInputRef} />
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
