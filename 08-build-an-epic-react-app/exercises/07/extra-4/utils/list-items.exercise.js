import { useQuery, useMutation, queryCache } from "react-query";
// import {useAuth} from 'context/auth-context'
import { useClient } from "context/auth-context";
import { setQueryDataForBook } from "./books";
// import {client} from './api-client'

function useListItems() {
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  const { data } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      // 💯 You no longer need to get the user token
      // client(`list-items`, {token: user.token}).then(data => data.listItems),
      client(`list-items`).then((data) => data.listItems),
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
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        // 💯 You no longer need to get the user token
        // token: user.token,
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
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  return useMutation(
    // 💯 You no longer need to get the user token
    // ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
    ({ id }) => client(`list-items/${id}`, { method: "DELETE" }),
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
  // 💯 use useClient instead of useAuth
  // const {user} = useAuth()
  const client = useClient();
  return useMutation(
    // 💯 You no longer need to get the user token
    // ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
    ({ bookId }) => client(`list-items`, { data: { bookId } }),
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
