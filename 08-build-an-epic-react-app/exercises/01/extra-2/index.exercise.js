import "@reach/dialog/styles.css";
import * as React from "react";
import ReactDOM from "react-dom";
import { Dialog } from "@reach/dialog";
import { Logo } from "./components/logo";

// 💯 Create a `LoginForm` component which renders a form accepting
// a username and password.
function LoginForm({ onSubmit, buttonText }) {
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    onSubmit({
      username: username.value,
      password: password.value,
    });
  }

  return (
    // 💯 When the user submits the form, it should call an `onSubmit` prop
    // with the username and password.
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
}

function App() {
  const [openModal, setOpenModal] = React.useState("none");

  function login(formData) {
    console.log("login", formData);
  }

  function register(formData) {
    console.log("register", formData);
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal("login")}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal("register")}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === "login"}>
        <div>
          <button onClick={() => setOpenModal("none")}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === "register"}>
        <div>
          <button onClick={() => setOpenModal("none")}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
