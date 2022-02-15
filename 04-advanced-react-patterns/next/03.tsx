// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from "react";
import { Switch } from "../switch";

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
// 💰 the default value should be `undefined`
// 🦺 the typing for the context value should be `{on: boolean; toggle: () => void}`
// but because we must initialize it to `undefined`, you need to union that with `undefined`
const ToggleContext = React.createContext<
  { on: boolean; toggle: () => void } | undefined
>(undefined);

function Toggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 💣 remove this and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it. Render children
  // within the provider.
  // return <>TODO...</>
  const value = { on, toggle };
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

function ToggleOn({ children }: { children: React.ReactNode }) {
  // 🐨 instead of this constant value, we'll need to get that from
  // React.useContext(ToggleContext)
  // 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
  // const on = false
  const { on } = React.useContext(ToggleContext);
  return <>{on ? children : null}</>;
}

function ToggleOff({ children }: { children: React.ReactNode }) {
  // 🐨 do the same thing to this that you did to the ToggleOn component
  // const on = false
  const { on } = React.useContext(ToggleContext);
  return <>{on ? null : children}</>;
}

function ToggleButton(
  props: Omit<React.ComponentProps<typeof Switch>, "on" | "onClick">
) {
  // 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
  // const on = false
  // const toggle = () => {}
  const { on, toggle } = React.useContext(ToggleContext);
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  );
}

export default App;
