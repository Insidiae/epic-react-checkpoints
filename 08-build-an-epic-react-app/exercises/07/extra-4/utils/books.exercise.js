import * as React from "react";
import { useQuery, queryCache } from "react-query";
// import {useAuth} from 'context/auth-context'
import { useClient } from "context/auth-context";
// import {client} from './api-client'
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

// 💯 Accept a client from `useClient` instead of user
// const getBookSearchConfig = (query, user) => ({
const getBookSearchConfig = (query, client) => ({
  queryKey: ["bookSearch", { query }],
  // 💯 You no longer need to get the user token
  // queryFn: () =>
  //   client(`books?query=${encodeURIComponent(query)}`, {
  //     token: user.token,
  //   }).then(data => data.books),
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`).then(
      (data) => data.books
    ),
  config: {
    onSuccess(books) {
      for (const book of books) {
        setQueryDataForBook(book);
      }
    },
  },
});

function useBookSearch(query) {
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  // 💯 You no longer need to get the user token
  // const result = useQuery(getBookSearchConfig(query, user))
  const result = useQuery(getBookSearchConfig(query, client));
  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId) {
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  const { data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () =>
      // 💯 You no longer need to get the user token
      // client(`books/${bookId}`, {token: user.token}).then(data => data.book),
      client(`books/${bookId}`).then((data) => data.book),
  });
  return data ?? loadingBook;
}

function useRefetchBookSearchQuery() {
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries("bookSearch");
      // 💯 You no longer need to get the user token
      // await queryCache.prefetchQuery(getBookSearchConfig('', user))
      await queryCache.prefetchQuery(getBookSearchConfig("", client));
    },
    // [user],
    [client]
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
