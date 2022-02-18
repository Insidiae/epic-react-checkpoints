// testing custom hooks
// http://localhost:3000/counter-hook

// 💯 Import the `renderHook` function from `@testing-library/react-hooks`
// you can also import `act` from here as well
import { renderHook, act } from "@testing-library/react-hooks";
// import {render, act} from '@testing-library/react'
import useCounter from "../../components/use-counter";

// 💯 Your `setup` function is very similar to the `renderHook` function
// type UseCounterArgs = Parameters<typeof useCounter>[0]
// function setup({initialProps}: {initialProps?: UseCounterArgs} = {}) {
//   type ReturnVal = ReturnType<typeof useCounter>
//   type Ref = {current: ReturnVal}
//   let result: {current: ReturnVal | null} = {current: null}
//   function TestComponent(props: UseCounterArgs) {
//     result.current = useCounter(props)
//     return null
//   }
//   render(<TestComponent {...initialProps} />)

//   return result as Ref
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

// 💯 Also, try adding another test:
// 💯 3. the step can be changed
test("the step can be changed", () => {
  const initialStep = 3;
  const newStep = 2;
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: initialStep },
  });

  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(initialStep);

  // 💯 And use the rerender function you get from renderHook to test an update to the step prop.
  rerender({ step: newStep });
  console.log(result.current);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(initialStep - newStep);
});
