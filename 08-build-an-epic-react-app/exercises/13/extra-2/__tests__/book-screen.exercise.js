import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
// 💯 You'll want to get `userEvent`
import userEvent from "@testing-library/user-event";
import { queryCache } from "react-query";
import * as auth from "auth-provider";
import { buildUser, buildBook } from "test/generate";
import * as usersDB from "test/data/users";
import * as booksDB from "test/data/books";
import * as listItemsDB from "test/data/list-items";
import { AppProviders } from "context";
import { App } from "app";
// 💯 You'll also want the `formatDate` util
import { formatDate } from "utils/misc";

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

test("renders all the book information", async () => {
  const user = buildUser();
  await usersDB.create(user);
  const authUser = await usersDB.authenticate(user);
  window.localStorage.setItem(auth.localStorageKey, authUser.token);

  const book = await booksDB.create(buildBook());
  const route = `/book/${book.id}`;
  window.history.pushState({}, "Test page", route);

  render(<App />, { wrapper: AppProviders });

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

// 💯 Write a second integration test
test("can create a list item for the book", async () => {
  // 💯 You'll do mostly the same stuff in the first part of the test
  const user = buildUser();
  await usersDB.create(user);
  const authUser = await usersDB.authenticate(user);
  window.localStorage.setItem(auth.localStorageKey, authUser.token);

  const book = await booksDB.create(buildBook());
  const route = `/book/${book.id}`;
  window.history.pushState({}, "Test page", route);

  render(<App />, { wrapper: AppProviders });

  await waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

  // 💯 Once the app is ready to go, then click on the "Add to list" button,
  // wait for the app to settle again (loading indicators should be gone),
  // then verify the right elements appear on the screen now that this book
  // has a list item.

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
  expect(startDateNode).toHaveTextContent(formatDate(new Date()));

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
