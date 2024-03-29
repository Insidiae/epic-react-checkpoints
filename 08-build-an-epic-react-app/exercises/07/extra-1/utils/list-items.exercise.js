// import * as React from 'react'
import { useQuery, useMutation, queryCache } from "react-query";
// 💯 You'll need the `useAuth` hook you just made
import { useAuth } from "context/auth-context";
import { setQueryDataForBook } from "./books";
import { client } from "./api-client";

function useListItems() {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client(`list-items`, { token: user.token }).then(
        (data) => data.listItems
      ),
    config: {
      onSuccess: async (listItems) => {
        for (const listItem of listItems) {
          setQueryDataForBook(listItem.book);
        }
      },
    },
  });
  return data ?? [];
}

function useListItem(bookId) {
  const listItems = useListItems();
  return listItems.find((li) => li.bookId === bookId) ?? null;
}

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === "function" ? recover() : null,
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

function useUpdateListItem(options) {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    {
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData("list-items");

        queryCache.setQueryData("list-items", (old) => {
          return old.map((item) => {
            return item.id === newItem.id ? { ...item, ...newItem } : item;
          });
        });

        return () => queryCache.setQueryData("list-items", previousItems);
      },
      ...defaultMutationOptions,
      ...options,
    }
  );
}

function useRemoveListItem(options) {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    {
      onMutate(removedItem) {
        const previousItems = queryCache.getQueryData("list-items");

        queryCache.setQueryData("list-items", (old) => {
          return old.filter((item) => item.id !== removedItem.id);
        });

        return () => queryCache.setQueryData("list-items", previousItems);
      },
      ...defaultMutationOptions,
      ...options,
    }
  );
}

function useCreateListItem(options) {
  // 💯 Replace `useContext` with `useAuth`
  // const {user} = React.useContext(AuthContext)
  const { user } = useAuth();
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
