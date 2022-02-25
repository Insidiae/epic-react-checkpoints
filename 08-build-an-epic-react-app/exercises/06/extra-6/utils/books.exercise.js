import { useQuery, queryCache } from "react-query";
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

// 💯 Add an `onSuccess` handler to our book search query config
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

function useBookSearch(query, user) {
  const result = useQuery(getBookSearchConfig(query, user));
  return { ...result, books: result.data ?? loadingBooks };
}

function useBook(bookId, user) {
  const { data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () =>
      client(`books/${bookId}`, { token: user.token }).then(
        (data) => data.book
      ),
  });
  return data ?? loadingBook;
}

async function refetchBookSearchQuery(user) {
  queryCache.removeQueries("bookSearch");
  await queryCache.prefetchQuery(getBookSearchConfig("", user));
}

// 💯 Create a `setQueryDataForBook` function that sets the book data
// in the query cache for that book by its ID
function setQueryDataForBook(book) {
  queryCache.setQueryData(["book", { bookId: book.id }], book);
}

export { useBook, useBookSearch, refetchBookSearchQuery, setQueryDataForBook };
