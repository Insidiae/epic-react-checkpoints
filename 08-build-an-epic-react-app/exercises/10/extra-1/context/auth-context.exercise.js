/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import * as auth from "auth-provider";
// 💯 You'll need `queryCache` from `react-query`
import { queryCache } from "react-query";
import { client } from "utils/api-client";
import { useAsync } from "utils/hooks";
//💯 You might also want `setQueryDataForBook` from 'utils/books'
import { setQueryDataForBook } from "utils/books";
import { FullPageSpinner, FullPageErrorFallback } from "components/lib";

// 💯 Instead of only fetching user data, preload the user's list item data as well
// 💰 Our backend engineers created a special endpoint that will give you
// all the data you need in one request
// 💰 If you make a GET to the endpoint `bootstrap`, it will send you an object
// with the `user` and the user's `listItems`.
// async function getUser() {
//   let user = null

//   const token = await auth.getToken()
//   if (token) {
//     const data = await client('me', {token})
//     user = data.user
//   }

//   return user
// }
async function bootstrapAppData() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    const data = await client("bootstrap", { token });

    queryCache.setQueryData("list-items", data.listItems, { staleTime: 5000 });
    // Let's also set the books in the query cache as well
    for (const listItem of data.listItems) {
      setQueryDataForBook(listItem.book);
    }

    user = data.user;
  }

  return user;
}

// const userPromise = getUser()
const appDataPromise = bootstrapAppData();

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync();

  React.useEffect(() => {
    // run(userPromise)
    run(appDataPromise);
  }, [run]);

  const login = React.useCallback(
    (form) => auth.login(form).then((user) => setData(user)),
    [setData]
  );
  const register = React.useCallback(
    (form) => auth.register(form).then((user) => setData(user)),
    [setData]
  );
  const logout = React.useCallback(() => {
    auth.logout();
    setData(null);
  }, [setData]);

  const value = React.useMemo(
    () => ({ user, login, logout, register }),
    [login, logout, register, user]
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const {
    user: { token },
  } = useAuth();
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth, useClient };
