// testing custom hooks
// http://localhost:3000/counter-hook

// import * as React from 'react'
// 💯 Import the `renderHook` function from `@testing-library/react-hooks`
// you can also import `act` from here as well
// import {render, act} from '@testing-library/react'
import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "../../components/use-counter";

// 💯 Your `setup` function is very similar to the `renderHook` function
// from `@testing-library/react-hooks`! Swap your own setup function with that.
// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter(initialProps)
//     return null
//   }

//   render(<TestComponent />)
//   return result
// }

test("exposes the count and increment/decrement functions", () => {
  // const result = setup()
  const { result } = renderHook(useCounter);

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the initial count", () => {
  const initialCount = 3;
  // const result = setup({initialProps: {initialCount}})
  const { result } = renderHook(useCounter, { initialProps: { initialCount } });

  expect(result.current.count).toBe(initialCount);
});

test("allows customization of the step", () => {
  const step = 2;
  // const result = setup({initialProps: {step}})
  const { result } = renderHook(useCounter, { initialProps: { step } });

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(step);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("the step can be changed", () => {
  const initialStep = 3;
  const newStep = 2;
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: initialStep },
  });

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(initialStep);

  rerender({ step: newStep });
  console.log(result.current);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(initialStep - newStep);
});
