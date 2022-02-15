// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from "react";
import { Switch } from "../switch";

const ToggleContext = React.createContext<
  { on: boolean; toggle: () => void } | undefined
>(undefined);

function Toggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  const value = { on, toggle };
  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}

// 💯 Figure out a way to give the developer a better error message
function useToggle() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
}

function ToggleOn({ children }: { children: React.ReactNode }) {
  const { on } = useToggle();
  return <>{on ? children : null}</>;
}

function ToggleOff({ children }: { children: React.ReactNode }) {
  const { on } = useToggle();
  return <>{on ? null : children}</>;
}

function ToggleButton(
  props: Omit<React.ComponentProps<typeof Switch>, "on" | "onClick">
) {
  const { on, toggle } = useToggle();
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

// 💯 Change the `App` function to this:
// const App = () => <ToggleButton />

export default App;
