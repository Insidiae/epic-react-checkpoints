// form testing
// http://localhost:3000/login

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import Login from "../../components/login";

// 💯 Create a `buildLoginForm` function which generates some fake user data:
function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}

test("submitting the form calls onSubmit with username and password", () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  // 💯 Get a random username and password
  // const username = 'chucknorris'
  // const password = 'ineednopassword'
  const { username, password } = buildLoginForm();
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
