// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from "react";
import { render, act } from "@testing-library/react";
import useCounter from "../../components/use-counter";

// 💯 Abstract away the common logic into a `setup` function
// 💰 Here's a little tip. Due to variable references, you'll need to change
// your test component a bit:
// const results = {}
// function TestComponent(props) {
//   Object.assign(results, useCustomHook())
//   return null
// }
function setup({ initialProps } = {}) {
  const result = {};
  function TestComponent() {
    result.current = useCounter(initialProps);
    return null;
  }

  render(<TestComponent />);
  return result;
}

test("exposes the count and increment/decrement functions", () => {
  // 💯 Use the `setup` function to get the result
  // let result
  // function TestComponent(props) {
  //   result = useCounter(props)
  //   return null
  // }

  // render(<TestComponent />)
  const result = setup();

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

// 💯 Add tests titled:
// 💯 1. allows customization of the initial count
test("allows customization of the initial count", () => {
  const initialCount = 3;
  const result = setup({ initialProps: { initialCount } });

  expect(result.current.count).toBe(initialCount);
});

// 💯 2. allows customization of the step
test("allows customization of the step", () => {
  const step = 2;
  const result = setup({ initialProps: { step } });

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(step);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
