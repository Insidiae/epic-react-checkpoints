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
// 💯 You'll need to import `rest` from `msw` again
import { rest } from "msw";
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
// 💯 Remove the added handlers between tests to preserve test isolation
// and restore the original handlers.
afterEach(() => server.resetHandlers());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test("omitting the password results in an error", async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
    `"password required"`
  );
});

// 💯 Add another test to check a situation for when the server misbehaves
// and sends a status code 500 error.
test("unknown server error displays the error message", async () => {
  // 💰 Here's something to get you started:
  // server.use(
  //   rest.post(
  //     // note that it's the same URL as our app-wide handler
  //     // so this will override the other.
  //     'https://auth-provider.example.com/api/login',
  //     async (req, res, ctx) => {
  //       // your one-off handler here
  //     },
  //   ),
  // )
  const testErrorMessage = "Oh no, something bad happened";
  server.use(
    rest.post(
      // note that it's the same URL as our app-wide handler
      // so this will override the other.
      "https://auth-provider.example.com/api/login",
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
      }
    )
  );

  render(<Login />);

  // Since the server handler we're using for this test always sends out
  // an error, we technically don't even need to fill in the form inputs!
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole("alert")).toHaveTextContent(testErrorMessage);
});
