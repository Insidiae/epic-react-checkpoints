import * as React from "react";
import {
  render,
  screen,
  waitForLoadingToFinish,
  userEvent,
  loginAsUser,
} from "test/app-test-utils";
import faker from "faker";
import { buildBook, buildListItem } from "test/generate";
import * as booksDB from "test/data/books";
import * as listItemsDB from "test/data/list-items";
import { formatDate } from "utils/misc";
import { App } from "app";

// 💯 Create a function that should handle automatically creating a user,
// book, and listItem if they're not provided
// 💰 if I don't want a listItem for a book, then I set it to null explicitly.
// Handle that in your implementation.
async function renderBookScreen({ user, book, listItem } = {}) {
  if (user === undefined) {
    user = await loginAsUser();
  }
  if (book === undefined) {
    book = await booksDB.create(buildBook());
  }
  if (listItem === undefined) {
    listItem = await listItemsDB.create(buildListItem({ owner: user, book }));
  }
  const route = `/book/${book.id}`;

  const utils = await render(<App />, { route, user });

  return {
    ...utils,
    user,
    book,
    listItem,
  };
}

test("renders all the book information", async () => {
  // const book = await booksDB.create(buildBook())
  // const route = `/book/${book.id}`

  // await render(<App />, {route})
  const { book } = await renderBookScreen({ listItem: null });

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
  // const book = await booksDB.create(buildBook())
  // const route = `/book/${book.id}`

  // await render(<App />, {route})
  await renderBookScreen({ listItem: null });

  const addToListButton = screen.getByRole("button", { name: /add to list/i });
  userEvent.click(addToListButton);
  expect(addToListButton).toBeDisabled();

  await waitForLoadingToFinish();

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

test("can remove a list item for the book", async () => {
  // const user = await loginAsUser()

  // const book = await booksDB.create(buildBook())
  // await listItemsDB.create(buildListItem({owner: user, book}))
  // const route = `/book/${book.id}`

  // await render(<App />, {route, user})
  await renderBookScreen();

  const removeFromListButton = screen.getByRole("button", {
    name: /remove from list/i,
  });
  userEvent.click(removeFromListButton);
  expect(removeFromListButton).toBeDisabled();

  await waitForLoadingToFinish();

  expect(
    screen.getByRole("button", { name: /add to list/i })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /remove from list/i })
  ).not.toBeInTheDocument();
});

test("can mark a list item as read", async () => {
  // 💰 We still need to create our own list item for this test.
  // 📜 Here's why: https://github.com/kentcdodds/bookshelf/issues/102
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  const listItem = await listItemsDB.create(
    buildListItem({
      owner: user,
      book,
      finishDate: null,
    })
  );
  // const route = `/book/${book.id}`

  // await render(<App />, {route, user})
  await renderBookScreen({ user, book, listItem });

  const markAsReadButton = screen.getByRole("button", {
    name: /mark as read/i,
  });
  userEvent.click(markAsReadButton);
  expect(markAsReadButton).toBeDisabled();

  await waitForLoadingToFinish();

  expect(
    screen.getByRole("button", { name: /mark as unread/i })
  ).toBeInTheDocument();
  expect(screen.getAllByRole("radio", { name: /star/i })).toHaveLength(5);

  const startAndFinishDateNode = screen.getByLabelText(
    /start and finish date/i
  );
  expect(startAndFinishDateNode).toHaveTextContent(
    `${formatDate(listItem.startDate)} — ${formatDate(Date.now())}`
  );

  expect(
    screen.queryByRole("button", { name: /mark as read/i })
  ).not.toBeInTheDocument();
});

test("can edit a note", async () => {
  // using fake timers to skip debounce time
  jest.useFakeTimers();
  // const user = await loginAsUser()
  // const book = await booksDB.create(buildBook())
  // const listItem = await listItemsDB.create(buildListItem({owner: user, book}))
  // const route = `/book/${book.id}`

  // await render(<App />, {route, user})
  const { listItem } = await renderBookScreen();

  const newNotes = faker.lorem.words();
  const notesTextarea = screen.getByRole("textbox", { name: /notes/i });

  userEvent.clear(notesTextarea);
  userEvent.type(notesTextarea, newNotes);

  // wait for the loading spinner to show up
  await screen.findByLabelText(/loading/i);
  // wait for the loading spinner to go away
  await waitForLoadingToFinish();

  expect(notesTextarea).toHaveValue(newNotes);

  expect(await listItemsDB.read(listItem.id)).toMatchObject({
    notes: newNotes,
  });
});
