import * as React from "react";
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { queryCache } from "react-query";
import * as auth from "auth-provider";
import { buildUser, buildBook } from "test/generate";
import * as usersDB from "test/data/users";
import * as booksDB from "test/data/books";
import * as listItemsDB from "test/data/list-items";
import { formatDate } from "utils/misc";
import { AppProviders } from "context";
import { App } from "app";

// general cleanup
afterEach(async () => {
  queryCache.clear();
  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ]);
});

// 💯 Create a custom `render`, a `loginAsUser`, and a `waitForLoadingToFinish`
// functions to abstract functionality between multiple tests
async function render(ui, { route = "/list", user, ...renderOptions } = {}) {
  user = typeof user === "undefined" ? await loginAsUser() : user;

  window.history.pushState({}, "Test page", route);

  const returnValue = {
    ...rtlRender(ui, { wrapper: AppProviders, ...renderOptions }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
}

async function loginAsUser(userProperties) {
  const user = buildUser(userProperties);
  await usersDB.create(user);
  const authUser = await usersDB.authenticate(user);
  window.localStorage.setItem(auth.localStorageKey, authUser.token);
  return authUser;
}

function waitForLoadingToFinish() {
  return waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);
}

test("renders all the book information", async () => {
  // const user = buildUser()
  // await usersDB.create(user)
  // const authUser = await usersDB.authenticate(user)
  // window.localStorage.setItem(auth.localStorageKey, authUser.token)

  // const book = await booksDB.create(buildBook())
  // const route = `/book/${book.id}`
  // window.history.pushState({}, 'Test page', route)

  // render(<App />, {wrapper: AppProviders})

  // await waitForElementToBeRemoved(() => [
  //   ...screen.queryAllByLabelText(/loading/i),
  //   ...screen.queryAllByText(/loading/i),
  // ])

  // await loginAsUser()
  // await waitForLoadingToFinish()

  const book = await booksDB.create(buildBook());
  const route = `/book/${book.id}`;

  await render(<App />, { route });

  expect(screen.getByRole("heading", { name: book.title })).toBeInTheDocument();
  expect(screen.getByText(book.author)).toBeInTheDocument();
  expect(screen.getByText(book.publisher)).toBeInTheDocument();
  expect(screen.getByText(book.synopsis)).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /book cover/i })).toHaveAttribute(
    "src",
    book.coverImageUrl
  );
  expect(
    screen.getByRole("button", { name: /add to list/i })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /remove from list/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /mark as read/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /mark as unread/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("textbox", { name: /notes/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("radio", { name: /star/i })
  ).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument();
});

test("can create a list item for the book", async () => {
  const book = await booksDB.create(buildBook());
  const route = `/book/${book.id}`;

  await render(<App />, { route });

  const addToListButton = screen.getByRole("button", { name: /add to list/i });
  userEvent.click(addToListButton);
  expect(addToListButton).toBeDisabled();

  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

  expect(
    screen.getByRole("button", { name: /mark as read/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /remove from list/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /notes/i })).toBeInTheDocument();

  const startDateNode = screen.getByLabelText(/start date/i);
  expect(startDateNode).toHaveTextContent(formatDate(Date.now()));

  expect(
    screen.queryByRole("button", { name: /add to list/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: /mark as unread/i })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("radio", { name: /star/i })
  ).not.toBeInTheDocument();
});
