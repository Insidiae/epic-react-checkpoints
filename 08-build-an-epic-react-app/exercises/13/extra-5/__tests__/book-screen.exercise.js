import * as React from "react";
import {
  render,
  screen,
  waitForLoadingToFinish,
  userEvent,
  // 💯 You'll want to import the `loginAsUser`
  loginAsUser,
} from "test/app-test-utils";
// You'll also want to import `faker`
import faker from "faker";
// 💯 You'll also need the `buildListItem`
import { buildBook, buildListItem } from "test/generate";
import * as booksDB from "test/data/books";
import * as listItemsDB from "test/data/list-items";
import { formatDate } from "utils/misc";
import { App } from "app";

test("renders all the book information", async () => {
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

// 💯 Test more use cases for our Book Screen.
// Here are a few test titles you might think about writing tests for:
//  - can remove a list item for the book
//  - can mark a list item as read
//  - can edit a note

test("can remove a list item for the book", async () => {
  // 💯 You could have them each create a list item as part of the test,
  // but that's what we call "over testing" because that user flow has already
  // been well covered by an existing integration test. So instead, you can
  // interact directly with the database as part of the setup for your test.
  // Here's how that might look:
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  await listItemsDB.create(buildListItem({ owner: user, book }));
  const route = `/book/${book.id}`;

  await render(<App />, { route, user });

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
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  const listItem = await listItemsDB.create(
    buildListItem({ owner: user, book, finishDate: null })
  );
  const route = `/book/${book.id}`;

  await render(<App />, { route, user });

  const markAsReadButton = screen.getByRole("button", {
    name: /mark as read/i,
  });
  userEvent.click(markAsReadButton);
  expect(markAsReadButton).toBeDisabled();

  await waitForLoadingToFinish();

  const startAndFinishDateNode = screen.getByLabelText(
    /start and finish date/i
  );
  expect(startAndFinishDateNode).toHaveTextContent(
    `${formatDate(listItem.startDate)} — ${formatDate(Date.now())}`
  );
  expect(
    screen.getByRole("button", { name: /mark as unread/i })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /mark as read/i })
  ).not.toBeInTheDocument();
});

test("can edit a note", async () => {
  // 💯 Editing the note works just fine, but you do have to wait 300ms
  // for the debounce feature. See if you can figure out how to use
  // `jest.useFakeTimers()` and `jest.useRealTimers()` to speed that up
  jest.useFakeTimers();
  const user = await loginAsUser();
  const book = await booksDB.create(buildBook());
  const listItem = await listItemsDB.create(
    buildListItem({ owner: user, book })
  );
  const route = `/book/${book.id}`;

  await render(<App />, { route, user });

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
