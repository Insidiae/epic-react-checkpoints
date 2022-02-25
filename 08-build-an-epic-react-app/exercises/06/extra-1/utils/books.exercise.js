// 💯 Let's make a few custom hooks to minimize repetitions in our react-query code.
// 💰 Here are a few ideas:
//   - useBook(bookId, user)
//   - useBookSearch(query, user)
import { useQuery } from "react-query";
import { client } from "utils/api-client";
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

export function useBook(bookId, user) {
  const { data } = useQuery({
    queryKey: ["book", { bookId }],
    queryFn: () =>
      client(`books/${bookId}`, { token: user.token }).then(
        (data) => data.book
      ),
  });

  return data ?? loadingBook;
}

export function useBookSearch(query, user) {
  const results = useQuery({
    queryKey: ["bookSearch", { query }],
    queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
      }).then((data) => data.books),
  });

  return { ...results, books: results.data ?? loadingBooks };
}
