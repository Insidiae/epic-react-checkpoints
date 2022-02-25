/** @jsx jsx */
import { jsx } from "@emotion/core";

// import {useQuery} from 'react-query'
// import {client} from 'utils/api-client'
// 💯 You'll need some custom hooks from 'utils/list-items'
import { useListItems } from "utils/list-items";
import { BookListUL } from "./lib";
import { BookRow } from "./book-row";

function ListItemList({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  // 💯 Replace this useQuery call with our new custom hooks
  // const {data: listItems} = useQuery({
  //   queryKey: 'list-items',
  //   queryFn: () =>
  //     client(`list-items`, {token: user.token}).then(data => data.listItems),
  // })
  const listItems = useListItems(user);
  const filteredListItems = listItems?.filter(filterListItems);

  if (!listItems?.length) {
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>{noListItems}</div>
    );
  }
  if (!filteredListItems.length) {
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>
        {noFilteredListItems}
      </div>
    );
  }

  return (
    <BookListUL>
      {filteredListItems.map((listItem) => (
        <li key={listItem.id}>
          <BookRow user={user} book={listItem.book} />
        </li>
      ))}
    </BookListUL>
  );
}

export { ListItemList };
