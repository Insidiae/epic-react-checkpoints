import * as React from "react";
import { useQuery, queryCache } from "react-query";
// 💯 You'll need the `useAuth` hook you just made
import { useAuth } from "context/auth-context";
import { client } from "./api-client";
import bookPlaceholderSvg from "assets/book-placeholder.svg";

const loadingBook = {
  title: "Loading...",
  author: "loading...",
  coverImageUrl: bookPlaceholderSvg,
  publisher: "Loading Publishing",
  synopsis: "Loading...",
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const getBookSearchConfig = (query, user) => ({
  queryKey: ["bookSearch", { query }],
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then((data) => data.books),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book);
      }
    },
  },
});

function useBookSearch(query) {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
  const result = useQuery(getBookSearchConfig(query, user));
  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId) {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () =>
      client(`books/${bookId}`, { token: user.token }).then(
        (data) => data.book
      ),
  });
  return data ?? loadingBook;
}

function useRefetchBookSearchQuery() {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries("bookSearch");
      await queryCache.prefetchQuery(getBookSearchConfig("", user));
    },
    [user]
  );
}

const bookQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
};

function setQueryDataForBook(book) {
  queryCache.setQueryData(["book", { bookId: book.id }], book, bookQueryConfig);
}

export {
  useBook,
  useBookSearch,
  useRefetchBookSearchQuery,
  setQueryDataForBook,
};
