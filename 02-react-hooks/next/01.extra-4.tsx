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
  const [showError, setShowError] = React.useState(false);

  const usernameIsLowerCase = username === username.toLowerCase();
  const usernameIsLongEnough = username.length >= 3;
  const usernameIsShortEnough = username.length <= 10;
  const formIsValid =
    usernameIsLowerCase && usernameIsLongEnough && usernameIsShortEnough;
  let errorMessage = "";
  const displayErrorMessage = showError && !formIsValid;

  if (!usernameIsLowerCase) {
    errorMessage = "Username must be lower case";
  } else if (!usernameIsLongEnough) {
    errorMessage = "Username must be at least 3 characters long";
  } else if (!usernameIsShortEnough) {
    errorMessage = "Username must be no longer than 10 characters";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowError(true);
    if (!formIsValid) return;

    onSubmitUsername(username);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  function handleBlur() {
    setShowError(true);
  }

  return (
    // 💯 Add noValidate to the `<form>` to prevent the browser from displaying
    // error messages related to those new attributes because we’re already
    // showing a more custom error message.
    // 💯 Add `name` to the `<form>` to give the form
    // an implicit role of `“form”`
    // 📜 https://www.w3.org/TR/html-aria/#docconformance
    <form name="usernameForm" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        {/* 💯 Add required to the `<input />`
            💯 Add pattern to the `<input />` that enforces 3–10 
               lowercase characters
            📜 https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
        */}
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={displayErrorMessage ? "error-message" : undefined}
          pattern="[a-z]{3,10}"
          required
        />
      </div>
      {displayErrorMessage ? (
        <div role="alert" id="error-message">
          {errorMessage}
        </div>
      ) : null}
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
