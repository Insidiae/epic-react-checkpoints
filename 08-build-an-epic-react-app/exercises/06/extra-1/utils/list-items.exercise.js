// 💯 Let's make a few custom hooks to minimize repetitions in our react-query code.
// 💰 Here are a few ideas:
//   - useListItem(user, bookId)
//   - useListItems(user)
//   - useUpdateListItem(user)
//   - useRemoveListItem(user)
//   - useCreateListItem(user)
import { useQuery, useMutation, queryCache } from "react-query";
import { client } from "utils/api-client";

export function useListItems(user) {
  const { data: listItems } = useQuery({
    queryKey: "list-items",
    queryFn: () =>
      client(`list-items`, { token: user.token }).then(
        (data) => data.listItems
      ),
  });

  return listItems ?? [];
}

export function useListItem(user, bookId) {
  const listItems = useListItems(user);
  return listItems.find((li) => li.bookId === bookId) ?? null;
}

const defaultMutationOptions = {
  onSettled: () => queryCache.invalidateQueries("list-items"),
};

export function useUpdateListItem(user) {
  return useMutation(
    (updates) =>
      client(`list-items/${updates.id}`, {
        method: "PUT",
        data: updates,
        token: user.token,
      }),
    defaultMutationOptions
  );
}

export function useRemoveListItem(user) {
  return useMutation(
    ({ id }) =>
      client(`list-items/${id}`, { method: "DELETE", token: user.token }),
    defaultMutationOptions
  );
}

export function useCreateListItem(user) {
  return useMutation(
    ({ bookId }) =>
      client(`list-items`, { data: { bookId }, token: user.token }),
    defaultMutationOptions
  );
}
