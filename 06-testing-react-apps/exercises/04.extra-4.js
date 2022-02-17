// form testing
// http://localhost:3000/login

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// 💯 There's a library I like to use for generating test data:
// 📜 https://www.npmjs.com/package/@jackfranklin/test-data-bot
// import faker from 'faker'
import { build, fake } from "@jackfranklin/test-data-bot";
import Login from "../../components/login";

// 💯 Swap your custom `buildLoginForm`
// with one you create using the Test Data Bot
// function buildLoginForm(overrides) {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...overrides,
//   }
// }
const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

test("submitting the form calls onSubmit with username and password", () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

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
