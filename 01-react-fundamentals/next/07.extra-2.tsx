// Basic Forms
// http://localhost:3000/isolated/exercise/07.tsx

import * as React from "react";

// 💯 Create an interface that extends the `HTMLFormControlsCollection`
// you’ll use this as the elements override for another interface
// that extends the `HTMLFormElement`.
interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}

// 💯 Extend the `HTMLFormElement` interface and override the elements
// to be a type that had our form elements
// 📜 https://epicreact.dev/how-to-type-a-react-form-on-submit-handler/
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function UsernameForm({
  onSubmitUsername,
}: {
  onSubmitUsername: (username: string) => void;
}) {
  // 💯 Use the extended interface instead of `HTMLFormElement`
  function handleSubmit(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const value = event.currentTarget.elements.usernameInput.value;
    onSubmitUsername(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
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
