import * as React from "react";
import ReactDOM from "react-dom";
// 💯 Get the `Dialog` component from `@reach/dialog`
// 📜 https://reacttraining.com/reach-ui/dialog
import { Dialog } from "@reach/dialog";
import { VisuallyHidden } from "@reach/visually-hidden";

// 💰 Don't forget to include the styles:
import "@reach/dialog/styles.css";

import { Logo } from "./components/logo";

function App() {
  // 💯 Open the `Dialog` when the user clicks the Login or Register button
  const [openModal, setOpenModal] = React.useState("none");

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

      <Dialog
        aria-label="Login form"
        isOpen={openModal === "login"}
        onDismiss={() => setOpenModal("none")}
      >
        <button className="close-button" onClick={() => setOpenModal("none")}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <h3>Login</h3>
      </Dialog>

      <Dialog
        aria-label="Registration form"
        isOpen={openModal === "register"}
        onDismiss={() => setOpenModal("none")}
      >
        <button className="close-button" onClick={() => setOpenModal("none")}>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
        <h3>Register</h3>
      </Dialog>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
