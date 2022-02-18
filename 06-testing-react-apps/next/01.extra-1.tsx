// simple test with ReactDOM
// http://localhost:3000/counter

import ReactDOM from "react-dom";
import Counter from "../../components/counter";

beforeEach(() => {
  document.body.innerHTML = "";
});

test("counter increments and decrements when the buttons are clicked", () => {
  const div = document.createElement("div");

  document.body.append(div);

  ReactDOM.render(<Counter />, div);
  const [decrement, increment] = Array.from(div.querySelectorAll("button"));
  if (!decrement || !increment) {
    throw new Error("decrement and increment not found");
  }

  if (!(div.firstChild instanceof HTMLElement)) {
    throw new Error("first child is not a div");
  }
  const message = div.firstChild.querySelector("div");

  if (!message) {
    throw new Error(`couldn't find message div`);
  }

  expect(message.textContent).toBe("Current count: 0");

  // 💯 Rather than use `button.click()`, try using` button.dispatchEvent`
  // NOTE: Make sure that your event config sets `bubbles: true`
  // 💰 Here's how you create a MouseEvent:
  //   new MouseEvent('click', {
  //     bubbles: true,
  //     cancelable: true,
  //     button: 0,
  //   })
  const incrementClickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  increment.dispatchEvent(incrementClickEvent);
  expect(message.textContent).toBe("Current count: 1");

  const decrementClickEvent = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    button: 0,
  });
  decrement.dispatchEvent(decrementClickEvent);
  expect(message.textContent).toBe("Current count: 0");
});
