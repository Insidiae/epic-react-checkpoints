import { useQuery, useMutation, queryCache } from "react-query";
import { setQueryDataForBook } from "./books";
import { client } from "./api-client";

function useListItems(user) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client(`list-items`, { token: user.token }).then(
        (data) => data.listItems
      ),
    config: {
      onSuccess(listItems) {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book);
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

// 💯 Make our list items optimistically update
// when the user attempts to make changes
// 🦉 You'll know you have it working when you mark a book as read
// and the star rating shows up instantly. Or if you add a book
// to your reading list and the notes textarea shows up instantly.

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries("list-items"),
  onError(error, variables, recover) {
    if (typeof recover === "function") {
      recover();
    }
  },
};

function useUpdateListItem(user, options) {
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    {
      ...defaultMutationOptions,
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData("list-items");

        queryCache.setQueryData("list-items", (old) => {
          return old.map((item) => {
            return item.id === newItem.id ? { ...item, ...newItem } : item;
          });
        });

        return () => queryCache.setQueryData("list-items", previousItems);
      },
      ...options,
    }
  );
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    {
      ...defaultMutationOptions,
      onMutate(removedItem) {
        const previousItems = queryCache.getQueryData("list-items");

        queryCache.setQueryData("list-items", (old) => {
          return old.filter((item) => item.id !== removedItem.id);
        });

        return () => queryCache.setQueryData("list-items", previousItems);
      },
      ...options,
    }
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
