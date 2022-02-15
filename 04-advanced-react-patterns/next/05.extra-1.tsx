// State Initializers
// http://localhost:3000/isolated/exercise/05.tsx

import * as React from "react";
import { Switch } from "../switch";

function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

type ToggleState = { on: boolean };
type ToggleAction = { type: "toggle" };
type ResetAction = { type: "reset"; initialState: ToggleState };

function toggleReducer(state: ToggleState, action: ToggleAction | ResetAction) {
  switch (action.type) {
    case "toggle": {
      return { on: !state.on };
    }
    case "reset": {
      return action.initialState;
    }
  }
}

function useToggle({ initialOn = false }: { initialOn?: boolean } = {}) {
  // 💯 Grab hold of the actual initial value and ignore any changes to that prop
  // const initialState = {on: initialOn}

  const initialStateRef = React.useRef<ToggleState>({ on: initialOn });
  const initialState = initialStateRef.current;

  const [state, dispatch] = React.useReducer(toggleReducer, initialState);
  const { on } = state;

  const toggle = () => dispatch({ type: "toggle" });
  const reset = () => dispatch({ type: "reset", initialState });

  function getTogglerProps<Props>({
    onClick,
    ...props
  }: { onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"] } & Props) {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps<Props>({
    onClick,
    ...props
  }: { onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"] } & Props) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

function App() {
  const { on, getTogglerProps, getResetterProps } = useToggle({
    initialOn: true,
  });

  return (
    <div>
      <Switch {...getTogglerProps({ on: on })} />
      <button {...getResetterProps({})}>Reset</button>
    </div>
  );
}

export default App;
// we're adding the useToggle export for tests
export { useToggle };
