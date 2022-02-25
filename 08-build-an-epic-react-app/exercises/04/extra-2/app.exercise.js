/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import * as auth from "auth-provider";
import { client } from "./utils/api-client";
import { useAsync } from "utils/hooks";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import * as colors from "styles/colors";
// 💯 Get the `FullPageSpinner` from `components/lib`
import { FullPageSpinner } from "components/lib";

async function getUser() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    const data = await client("me", { token });
    user = data.user;
  }

  return user;
}

// 💯 Let's update `App` to use `useAsync` and solve this loading state issue
function App() {
  // const [user, setUser] = React.useState(null)
  // 💰 Your coworker mentions you'll need to know that you can
  // set the data directly:
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync();
  // const doSomething = () => somethingAsync().then(data => setData(data))

  // React.useEffect(() => {
  //   getUser().then(u => setUser(u))
  // }, [])
  React.useEffect(() => {
    run(getUser());
  }, [run]);

  // const login = form => auth.login(form).then(u => setUser(u))
  const login = (form) => auth.login(form).then((user) => setData(user));
  // const register = form => auth.register(form).then(u => setUser(u))
  const register = (form) => auth.register(form).then((user) => setData(user));
  const logout = () => {
    auth.logout();
    // setUser(null)
    setData(null);
  };

  // 💯 When in `isLoading` or `isIdle` state, you can render the `FullPageSpinner`
  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  // 💯 If you end up in `isError` state then you can render this:
  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    );
  }
}

export { App };
