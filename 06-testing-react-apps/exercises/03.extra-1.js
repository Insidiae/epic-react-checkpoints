// Avoid implementation details
// http://localhost:3000/counter

import * as React from "react";
// 💰 You can import `userEvent` like so:
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Counter from "../../components/counter";

test("counter increments and decrements when the buttons are clicked", () => {
  render(<Counter />);

  const decrement = screen.getByRole("button", { name: /decrement/i });
  const increment = screen.getByRole("button", { name: /increment/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent("Current count: 0");
  // 💯 Swap out `fireEvent` for `userEvent`
  userEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  userEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});
