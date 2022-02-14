// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";
import { Switch } from "../switch";

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, (child) => {
    // 💯 Prevent errors when a DOM component child gets passed
    if (typeof child.type === "string") {
      return child;
    }

    return React.cloneElement(child, {
      on,
      toggle,
    });
  });
}

const ToggleOn = ({ on, children }) => (on ? children : null);

const ToggleOff = ({ on, children }) => (on ? null : children);

const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
        {/* 💯 Add support for DOM component children */}
        <span>Hello there!</span>
      </Toggle>
    </div>
  );
}

export default App;
