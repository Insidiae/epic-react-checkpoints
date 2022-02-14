// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";
import { Switch } from "../switch";

function callAll(...fns) {
  return function (...args) {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
}

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 💯 Implement the `getTogglerProps` function which takes
  // the props we want applied and composes the props together
  // with our own props.
  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  return { on, toggle, getTogglerProps };
}

// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// 💯 Update the `App` component to this:
function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}

export default App;
