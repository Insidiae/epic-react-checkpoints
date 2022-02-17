// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import { setupServer } from "msw/node";
import Login from "../../components/login-submission";
import { handlers } from "../../test/server-handlers";

const buildLoginForm = build({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

// 💯 Add a test for what happens if the response to our login request
// is a failure
test("omitting the password results in an error", async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent("password required");
});