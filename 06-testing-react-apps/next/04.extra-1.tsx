// form testing
// http://localhost:3000/login

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../components/login";

test("submitting the form calls onSubmit with username and password", () => {
  // 💯 Rather than creating the `submittedData` variable,
  // try to use a mock function using `jest.fn()`
  // 📜 `jest.fn()`:  https://jestjs.io/docs/en/mock-function-api
  // let submittedData
  // const handleSubmit = (data) => (submittedData = data)
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  const username = "chucknorris";
  const password = "ineednopassword";
  userEvent.type(usernameInput, username);
  userEvent.type(passwordInput, password);

  const submitBtn = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitBtn);

  // 💯  Assert that `handleSubmit` was called correctly
  // 📜 `toHaveBeenCalledWith`: https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-
  // expect(submittedData).toEqual({
  //   username,
  //   password,
  // })
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
