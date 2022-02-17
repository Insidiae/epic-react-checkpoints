// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from "react";
// 💯 We won't need the `screen` and `userEvent` imports,
// but we'll need to import `act`
import { render, act } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
import useCounter from "../../components/use-counter";

// function UseCounterHookExample() {
//   const {count, increment, decrement} = useCounter()

//   return (
//     <div>
//       <div>Current count: {count}</div>
//       <button onClick={decrement}>Decrement</button>
//       <button onClick={increment}>Increment</button>
//     </div>
//   )
// }

test("exposes the count and increment/decrement functions", () => {
  // 💯 write a test component without making a pretty complicated "TestComponent"
  // render(<UseCounterHookExample />)

  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // const increment = screen.getByRole('button', {name: /increment/i})
  // const message = screen.getByText(/current count/i)
  let result;
  function TestComponent(props) {
    result = useCounter(props);
    return null;
  }

  render(<TestComponent />);
  // 💯 assert on the initial state of the hook
  // expect(message).toHaveTextContent('Current count: 0')
  expect(result.count).toBe(0);

  // 💯 assert on the changes in the UI using the `increment`
  // and `decrement` functions
  // userEvent.click(increment)
  // expect(message).toHaveTextContent('Current count: 1')
  // userEvent.click(decrement)
  // expect(message).toHaveTextContent('Current count: 0')
  act(() => result.increment());
  expect(result.count).toBe(1);
  act(() => result.decrement());
  expect(result.count).toBe(0);
});
