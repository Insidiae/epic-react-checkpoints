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
// 🦺 add support for the new action type:
// 💰 Again, this isn't a TypeScript workshop, so I'll just give this to you:
// | {type: 'reset'; initialState: ToggleState}
type ResetAction = { type: "reset"; initialState: ToggleState };

function toggleReducer(state: ToggleState, action: ToggleAction | ResetAction) {
  switch (action.type) {
    case "toggle": {
      return { on: !state.on };
    }
    // 🐨 add a "reset" case here that simply returns the action.initialState
    case "reset": {
      return action.initialState;
    }
  }
}

// 🐨 accept an object as the first argument here. The object should:
// - default to an empty object
// - have a property called "initialOn" that defaults to "false"
function useToggle({ initialOn = false }: { initialOn?: boolean } = {}) {
  // 🐨 store the initialState in a variable here
  // (it should be an object in an "on" property)
  const initialState = { on: initialOn };

  // 🐨 Instead of the inline object, pass the initialState as the second
  // argument to useReducer here:
  // const [state, dispatch] = React.useReducer(toggleReducer, {on: false})
  const [state, dispatch] = React.useReducer(toggleReducer, initialState);
  const { on } = state;

  const toggle = () => dispatch({ type: "toggle" });
  // 🐨 call dispatch with the reset ToggleAction
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

  // 💰 I'm going to give this to you. Otherwise it's just busywork because it's
  // almost exactly the same as the getTogglerProps function 🤷‍♂️
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
  // 🐨 pass an object with the initialOn property set to true
  // 💰 {initialOn: true}
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
