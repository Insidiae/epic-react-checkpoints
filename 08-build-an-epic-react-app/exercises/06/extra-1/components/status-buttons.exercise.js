/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from "react-icons/fa";
import Tooltip from "@reach/tooltip";
// import {useQuery, useMutation, queryCache} from 'react-query'
// import {client} from 'utils/api-client'
// 💯 You'll need some custom hooks from 'utils/list-items'
import {
  useListItem,
  useCreateListItem,
  useUpdateListItem,
  useRemoveListItem,
} from "utils/list-items";
import { useAsync } from "utils/hooks";
import * as colors from "styles/colors";
import { CircleButton, Spinner } from "./lib";

function TooltipButton({ label, highlight, onClick, icon, ...rest }) {
  const { isLoading, isError, error, run } = useAsync();

  function handleClick() {
    run(onClick());
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: "white",
          ":hover,:focus": {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  );
}

function StatusButtons({ user, book }) {
  // 💯 Replace these useQuery and useMutation calls with our new custom hooks
  // const {data: listItems} = useQuery({
  //   queryKey: 'list-items',
  //   queryFn: () =>
  //     client(`list-items`, {token: user.token}).then(data => data.listItems),
  // })
  // const listItem = listItems?.find(li => li.bookId === book.id) ?? null
  const listItem = useListItem(user, book.id);

  // const [update] = useMutation(
  //   updates =>
  //     client(`list-items/${updates.id}`, {
  //       method: 'PUT',
  //       data: updates,
  //       token: user.token,
  //     }),
  //   {onSettled: () => queryCache.invalidateQueries('list-items')},
  // )
  const [update] = useUpdateListItem(user);

  // const [remove] = useMutation(
  //   ({id}) => client(`list-items/${id}`, {method: 'DELETE', token: user.token}),
  //   {onSettled: () => queryCache.invalidateQueries('list-items')},
  // )
  const [remove] = useRemoveListItem(user);

  // const [create] = useMutation(
  //   ({bookId}) => client(`list-items`, {data: {bookId}, token: user.token}),
  //   {onSettled: () => queryCache.invalidateQueries('list-items')},
  // )
  const [create] = useCreateListItem(user);

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => update({ id: listItem.id, finishDate: null })}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => update({ id: listItem.id, finishDate: Date.now() })}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={() => remove({ id: listItem.id })}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={() => create({ bookId: book.id })}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  );
}

export { StatusButtons };
