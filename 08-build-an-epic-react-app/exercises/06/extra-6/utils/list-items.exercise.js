import { useQuery, useMutation, queryCache } from "react-query";
import { client } from "./api-client";
// 💯 You'll need the `setQueryDataForBook` function from 'utils/books'
import { setQueryDataForBook } from "./books";

// 💯 Add an `onSuccess` handler to our list items query config
function useListItems(user) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client(`list-items`, { token: user.token }).then(
        (data) => data.listItems
      ),
    config: {
      onSuccess(listItems) {
        for (const li of listItems) {
          setQueryDataForBook(li.book);
        }
      },
    },
  });
  return listItems ?? [];
}

function useListItem(user, bookId) {
  const listItems = useListItems(user);
  return listItems.find((li) => li.bookId === bookId) ?? null;
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

function useUpdateListItem(user, options) {
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    { ...defaultMutationOptions, ...options }
  );
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    { ...defaultMutationOptions, ...options }
  );
}

function useCreateListItem(user, options) {
  return useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId }, token: user.token }),
    { ...defaultMutationOptions, ...options }
  );
}

export {
  useListItem,
  useListItems,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
};
