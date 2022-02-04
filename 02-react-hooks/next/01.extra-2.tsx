// Managing UI State
// http://localhost:3000/isolated/exercise/01.tsx

import * as React from "react";

function UsernameForm({
  initialUsername = "",
  onSubmitUsername,
}: {
  initialUsername?: string;
  onSubmitUsername: (username: string) => void;
}) {
  const [username, setUsername] = React.useState(initialUsername);
  // 💯 Validate the user’s input and display an error message if they get something wrong.
  // 💰 Derive the ff. from the `username` state:
  //   `usernameIsLowerCase`: derived from the `username`
  //   `usernameIsLongEnough`: derived from the `username`
  //   `usernameIsShortEnough`: derived from the `username`
  //   `formIsValid`: derived from `usernameIsLowerCase`,
  //     `usernameIsLongEnough`, and `usernameIsShortEnough`
  //   `errorMessage`: derived from `usernameIsLowerCase`,
  //     `usernameIsLongEnough`, and `usernameIsShortEnough`
  const usernameIsLowerCase = username === username.toLowerCase();
  const usernameIsLongEnough = username.length >= 3;
  const usernameIsShortEnough = username.length <= 10;
  const formIsValid =
    usernameIsLowerCase && usernameIsLongEnough && usernameIsShortEnough;
  let errorMessage = "";

  if (!usernameIsLowerCase) {
    errorMessage = "Username must be lower case";
  } else if (!usernameIsLongEnough) {
    errorMessage = "Username must be at least 3 characters long";
  } else if (!usernameIsShortEnough) {
    errorMessage = "Username must be no longer than 10 characters";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 💯 Check the `formIsValid` value before calling `onSubmitUsername`
    if (formIsValid) {
      onSubmitUsername(username);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  return (
    <form name="usernameForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          onChange={handleChange}
          value={username}
        />
      </div>
      {/* 💯 Display the error message in a `div` with a `id="error-message"`
          right before the submit button. And make sure to not render the `div`
          if the form is valid.*/}
      {formIsValid ? null : <div id="error-message">{errorMessage}</div>}
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
