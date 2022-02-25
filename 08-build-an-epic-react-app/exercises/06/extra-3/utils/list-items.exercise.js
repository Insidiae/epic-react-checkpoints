import { useQuery, useMutation, queryCache } from "react-query";
import { client } from "./api-client";

function useListItems(user) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client(`list-items`, { token: user.token }).then(
        (data) => data.listItems
      ),
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

// 💯 Update the useMutation functions to accept options
// (so I should be able to call `useUpdateListItem(user, {throwOnError: true}))`
function useUpdateListItem(user, options) {
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    // defaultMutationOptions,
    { ...defaultMutationOptions, ...options }
  );
}

function useRemoveListItem(user, options) {
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    // defaultMutationOptions,
    { ...defaultMutationOptions, ...options }
  );
}

function useCreateListItem(user, options) {
  return useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId }, token: user.token }),
    // defaultMutationOptions,
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
