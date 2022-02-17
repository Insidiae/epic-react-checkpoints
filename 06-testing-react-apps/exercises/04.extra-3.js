// form testing
// http://localhost:3000/login

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import Login from "../../components/login";

// 💯 Try to make your `buildLoginForm` function accept overrides as well:
function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
}

test("submitting the form calls onSubmit with username and password", () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  // const {username, password} = buildLoginForm()
  // 🦉 This communicates the reader of the test: "We just need a normal
  // login form, except the password needs to be something specific
  // for this test."
  const { username, password } = buildLoginForm({ password: "abc" });
  // password === 'abc'

  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);

  const submitBtn = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtn);

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toBeCalledTimes(1);
});
