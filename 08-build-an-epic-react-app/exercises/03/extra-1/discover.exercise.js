/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import Tooltip from "@reach/tooltip";
// 💯 Get FaTimes from react-icons
import { FaSearch, FaTimes } from "react-icons/fa";
import { Input, BookListUL, Spinner } from "./components/lib";
import { BookRow } from "./components/book-row";
import { client } from "./utils/api-client";

import * as colors from "styles/colors";

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState(null);
  // 💯 Add another state for the error data
  const [error, setError] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  // 💯 Add support for showing the user helpful information in the event of a failure
  React.useEffect(() => {
    if (!queried) {
      return;
    }
    setStatus("loading");
    client(`books?query=${encodeURIComponent(query)}`)
      .then((responseData) => {
        setData(responseData);
        setStatus("success");
      })
      .catch((errorData) => {
        setError(errorData);
        setStatus("error");
      });
  }, [query, queried]);

  // 💰 For some reason every time you send the backend the word "FAIL"
  // it results in a failure. Our backend devs are completely baffled,
  // but it sure makes it easier for you to test the error state out!
  function handleSearchSubmit(event) {
    event.preventDefault();
    setQueried(true);
    setQuery(event.target.elements.search.value);
  }

  return (
    <div
      css={{ maxWidth: 800, margin: "auto", width: "90vw", padding: "40px 0" }}
    >
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
              {/* 💯 Diplay an error indicator instead of the search icon
               when the request fails */}
              {/* {isLoading ? <Spinner /> : <FaSearch aria-label="search" />} */}
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

      {/* 💯 display this between the search input and the results */}
      {isError ? (
        <div css={{ color: colors.danger }}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{ marginTop: 20 }}>
            {data.books.map((book) => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
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
