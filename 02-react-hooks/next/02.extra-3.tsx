// Synchronizing Side-Effects
// http://localhost:3000/isolated/exercise/02.tsx

import * as React from "react";

// 💯 Create a custom hook called `useLocalStorageState`
// to reuse the logic of getting the state to and from localStorage.
function useLocalStorageState(key: string, defaultValue: string = "") {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) ?? defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  // 🦺 https://kentcdodds.com/blog/wrapping-react-use-state-with-type-script
  return [state, setState] as const;
}

function UsernameForm({
  initialUsername = "",
  onSubmitUsername,
}: {
  initialUsername?: string;
  onSubmitUsername: (username: string) => void;
}) {
  const [username, setUsername] = useLocalStorageState(
    "username",
    initialUsername
  );
  const [touched, setTouched] = React.useState(false);

  const usernameIsLowerCase = username === username.toLowerCase();
  const usernameIsLongEnough = username.length >= 3;
  const usernameIsShortEnough = username.length <= 10;
  const formIsValid =
    usernameIsShortEnough && usernameIsLongEnough && usernameIsLowerCase;

  const displayErrorMessage = touched && !formIsValid;

  let errorMessage = null;
  if (!usernameIsLowerCase) {
    errorMessage = "Username must be lower case";
  } else if (!usernameIsLongEnough) {
    errorMessage = "Username must be at least 3 characters long";
  } else if (!usernameIsShortEnough) {
    errorMessage = "Username must be no longer than 10 characters";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!formIsValid) return;

    onSubmitUsername(username);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value);
  }

  function handleBlur() {
    setTouched(true);
  }

  return (
    <form name="usernameForm" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          pattern="[a-z]{3,10}"
          required
          aria-describedby={displayErrorMessage ? "error-message" : undefined}
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
