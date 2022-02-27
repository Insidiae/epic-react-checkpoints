import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { queryCache } from "react-query";
import * as auth from "auth-provider";
import { buildUser, buildBook } from "test/generate";
import { AppProviders } from "context";
import { App } from "app";
// 💯 You're going to want these:
import * as usersDB from "test/data/users";
import * as booksDB from "test/data/books";
import * as listItemsDB from "test/data/list-items";

// general cleanup
afterEach(async () => {
  queryCache.clear();
  // await auth.logout()
  // 💯 You'll also want to cleanup the databases
  await Promise.all([
    auth.logout(),
    usersDB.reset(),
    booksDB.reset(),
    listItemsDB.reset(),
  ]);
});

test("renders all the book information", async () => {
  // 💯 Create an authenticated user
  const user = buildUser();
  await usersDB.create(user);
  const authUser = await usersDB.authenticate(user);

  // window.localStorage.setItem(auth.localStorageKey, 'SOME_FAKE_TOKEN')
  window.localStorage.setItem(auth.localStorageKey, authUser.token);

  // 💯 Insert the fake book into the database as well
  //  Use booksDB.create to do that
  // const book = buildBook()
  const book = await booksDB.create(buildBook());
  const route = `/book/${book.id}`;
  window.history.pushState({}, "Test page", route);

  // 💯 Delete all the `window.fetch` stuff and use the mock server instead
  // 💥 const originalFetch = window.fetch
  // 💥 window.fetch = async (url, config) => {
  // 💥   if (url.endsWith('/bootstrap')) {
  // 💥     return {
  // 💥       ok: true,
  // 💥       json: async () => ({
  // 💥         user: {...user, token: 'SOME_FAKE_TOKEN'},
  // 💥         listItems: [],
  // 💥       }),
  // 💥     }
  // 💥   } else if (url.endsWith(`/books/${book.id}`)) {
  // 💥     return {ok: true, json: async () => ({book})}
  // 💥   }
  // 💥   return originalFetch(url, config)
  // 💥 }

  render(<App />, { wrapper: AppProviders });

  // await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

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
