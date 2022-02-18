// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "../../components/counter";

test("counter increments and decrements when the buttons are clicked", () => {
  const { container } = render(<Counter />);

  const [decrement, increment] = Array.from(
    container.querySelectorAll("button")
  );
  if (!decrement || !increment) {
    throw new Error("decrement and increment not found");
  }

  if (!(container.firstChild instanceof HTMLElement)) {
    throw new Error("first child is not a div");
  }
  const message = container.firstChild.querySelector("div");
  if (!message) {
    throw new Error(`couldn't find message div`);
  }

  // 💯 Swap the `expect(message.textContent).toBe(...)` assertions
  // with `toHaveTextContent` from `@testing-library/jest-dom`.
  // 📜 http://testing-library.com/jest-dom
  // expect(message.textContent).toBe('Current count: 0')
  expect(message).toHaveTextContent("Current count: 0");

  fireEvent.click(increment);
  // expect(message.textContent).toBe('Current count: 1')\
  expect(message).toHaveTextContent("Current count: 1");

  fireEvent.click(decrement);
  // expect(message.textContent).toBe('Current count: 0')
  expect(message).toHaveTextContent("Current count: 0");
});
