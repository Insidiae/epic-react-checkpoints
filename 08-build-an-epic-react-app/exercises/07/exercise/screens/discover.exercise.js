/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import Tooltip from "@reach/tooltip";
import { FaSearch, FaTimes } from "react-icons/fa";
// 🐨 swap refetchBookSearchQuery with the new useRefetchBookSearchQuery
// import {useBookSearch, refetchBookSearchQuery} from 'utils/books'
import { useBookSearch, useRefetchBookSearchQuery } from "utils/books";
import * as colors from "styles/colors";
import { BookRow } from "components/book-row";
import { BookListUL, Spinner, Input } from "components/lib";

// 💣 remove the user prop here
// 💥 function DiscoverBooksScreen({user}) {
function DiscoverBooksScreen() {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);
  // 💣 remove the user argument here
  // 💥 const {books, error, status} = useBookSearch(query, user)
  const { books, error, status } = useBookSearch(query);
  // 🐨 use the new useRefetchBookSearchQuery to get the
  // refetchBookSearchQuery function which handles accessing the user
  const refetchBookSearchQuery = useRefetchBookSearchQuery();

  React.useEffect(() => {
    // 💣 remove the user prop here
    // 💥 return () => refetchBookSearchQuery(user)
    return () => refetchBookSearchQuery();
    // 💣 remove the user dependency here and add refetchBookSearchQuery instead
    // 💥 }, [user])
  }, [refetchBookSearchQuery]);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{ width: "100%" }}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: "0",
                position: "relative",
                marginLeft: "-35px",
                background: "transparent",
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{ color: colors.danger }} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      <div>
        {queried ? null : (
          <div css={{ marginTop: 20, fontSize: "1.2em", textAlign: "center" }}>
            <p>Welcome to the discover page.</p>
            <p>Here, let me load a few books for you...</p>
            {isLoading ? (
              <div css={{ width: "100%", margin: "auto" }}>
                <Spinner />
              </div>
            ) : isSuccess && books.length ? (
              <p>Here you go! Find more books with the search bar above.</p>
            ) : isSuccess && !books.length ? (
              <p>
                Hmmm... I couldn't find any books to suggest for you. Sorry.
              </p>
            ) : null}
          </div>
        )}
      </div>
      {isSuccess ? (
        books.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {books.map((book) => (
              <li key={book.id} aria-label={book.title}>
                <BookRow
                  // 💣 remove the user prop here
                  // 💥 user={user}
                  key={book.id}
                  book={book}
                />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
}

export { DiscoverBooksScreen };
