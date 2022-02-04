// Managing UI State
// http://localhost:3000/isolated/exercise/01.tsx

import * as React from "react";

// 💯 Make the `UsernameForm` accept a prop called `initialUsername`
function UsernameForm({
  initialUsername = "",
  onSubmitUsername,
}: {
  initialUsername?: string;
  onSubmitUsername: (username: string) => void;
}) {
  // 💯 Initialize the `username` state to `initialUsername`
  const [username, setUsername] = React.useState(initialUsername);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitUsername(username);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  return (
    <form name="usernameForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        {/* 💯 Set the input's value prop to `username` */}
        <input
          id="usernameInput"
          type="text"
          onChange={handleChange}
          value={username}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const onSubmitUsername = (username: string) =>
    alert(`You entered: ${username}`);
  return (
    <div style={{ width: 400 }}>
      <UsernameForm onSubmitUsername={onSubmitUsername} />
    </div>
  );
}

export { App };
