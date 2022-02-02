// Basic Forms
// http://localhost:3000/isolated/exercise/07.tsx

import * as React from "react";

function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void;
}) {
  // 💯 Try to get the usernameInput’s value using a ref.
  const usernameInputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (usernameInputRef.current) {
      const value = usernameInputRef.current.value;
      onSubmitUsername(value);
    }
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
  const onSubmitUsername = (username: string) =>
    alert(`You entered: ${username}`);
  return <UsernameForm onSubmitUsername={onSubmitUsername} />;
}

export { App };
