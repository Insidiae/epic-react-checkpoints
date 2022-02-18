// simple test with ReactDOM
// http://localhost:3000/counter

import ReactDOM from "react-dom";
import Counter from "../../components/counter";

// 🦉 Alternatively, you can clean up the page before each test runs:
beforeEach(() => {
  document.body.innerHTML = "";
});

test("counter increments and decrements when the buttons are clicked", () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement("div");

  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div);

  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div);
  // 🐨 get a reference to the increment and decrement buttons:
  //   💰 div.querySelectorAll('button')
  const [decrement, increment] = Array.from(div.querySelectorAll("button"));
  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  // 🦺 TypeScript doesn't trust the DOM very much, so you'll need to verify
  // things are what they should be to make TypeScript happy here.
  if (!(div.firstChild instanceof HTMLElement)) {
    throw new Error("first child is not a div");
  }
  const message = div.firstChild.querySelector("div");

  if (!decrement || !increment) {
    throw new Error("decrement and increment not found");
  }

  if (!message) {
    throw new Error(`couldn't find message div`);
  }

  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe("Current count: 0");

  // 🐨 click the increment button (💰 increment.click())
  increment.click();
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe("Current count: 1");

  // 🐨 click the decrement button (💰 decrement.click())
  decrement.click();
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe("Current count: 0");

  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  // div.remove()
});
