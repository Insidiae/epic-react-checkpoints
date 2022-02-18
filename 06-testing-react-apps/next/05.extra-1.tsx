// mocking HTTP requests
// http://localhost:3000/login-submission

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import { setupServer } from "msw/node";
// 💯 Import the array of server handlers from `test/server-handlers.js`
import { handlers } from "test/server-handlers";
import Login from "../../components/login-submission";
import { LoginFormValues } from "../../components/login";

const buildLoginForm = build<LoginFormValues>({
  fields: {
    username: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
  },
});

// 💯 Send the server handlers along into the setupServer call.
// type LoginResponse = {username: string} | {message: string}
// const server = setupServer(
//   rest.post<Record<string, string>, LoginResponse>(
//     'https://auth-provider.example.com/api/login',
//     async (req, res, ctx) => {
//       if (!req.body.password) {
//         return res(ctx.status(400), ctx.json({message: 'password required'}))
//       }
//       if (!req.body.username) {
//         return res(ctx.status(400), ctx.json({message: 'username required'}))
//       }
//       return res(ctx.json({username: req.body.username}))
//     },
//   ),
// )
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
