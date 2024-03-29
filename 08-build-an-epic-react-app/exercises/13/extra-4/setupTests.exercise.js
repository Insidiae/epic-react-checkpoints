import "@testing-library/jest-dom";
import { server } from "test/server";
import { queryCache } from "react-query";
import * as auth from "auth-provider";
import * as usersDB from "test/data/users";
import * as booksDB from "test/data/books";
import * as listItemsDB from "test/data/list-items";

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// 💯 Move the cleanup code from our integration tests here
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
