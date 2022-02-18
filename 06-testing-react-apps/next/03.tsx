// Avoid implementation details
// http://localhost:3000/counter

// 🐨 add `screen` to the import here:
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "../../components/counter";

test("counter increments and decrements when the buttons are clicked", () => {
  // const {container} = render(<Counter />)
  render(<Counter />);
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  // const [decrement, increment] = Array.from(
  //   container.querySelectorAll('button'),
  // )
  const decrement = screen.getByRole("button", { name: /decrement/i });
  const increment = screen.getByRole("button", { name: /increment/i });

  // 🦺 you'll notice that React Testing Library queries do null-checks for you
  // automatically, so you can ditch all this null-checking stuff.
  // 💥 if (!decrement || !increment) {
  // 💥   throw new Error('decrement and increment not found')
  // 💥 }
  // 💥 if (!(container.firstChild instanceof HTMLElement)) {
  // 💥   throw new Error('first child is not a div')
  // 💥 }

  // const message = container.firstChild.querySelector('div')
  const message = screen.getByText(/current count/i);
  // 💥 if (!message) {
  // 💥   throw new Error(`couldn't find message div`)
  // 💥 }

  expect(message).toHaveTextContent("Current count: 0");
  fireEvent.click(increment);
  expect(message).toHaveTextContent("Current count: 1");
  fireEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});
