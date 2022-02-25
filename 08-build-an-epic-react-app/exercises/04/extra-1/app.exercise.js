/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import * as auth from "auth-provider";
import { client } from "utils/api-client";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

// 💰 The backend devs gave us an API we can use to get the user's information
// by providing the token:
async function getUser() {
  let user = null;
  const token = await auth.getToken();

  if (token) {
    // we're logged in! Let's go get the user's data:
    // client('me', {token}).then(data => {
    //   console.log(data.user)
    // })
    const data = await client("me", { token });
    user = data.user;
  } else {
    // we're not logged in. Show the login screen
  }

  return user;
}

function App() {
  const [user, setUser] = React.useState(null);

  const login = (form) => auth.login(form).then((u) => setUser(u));
  const register = (form) => auth.register(form).then((u) => setUser(u));
  const logout = () => {
    auth.logout();
    setUser(null);
  };

  // 💯 Get the user's data on page load so users don't have to re-enter their
  // username and password if the Auth Provider has the token already
  React.useEffect(() => {
    getUser().then((userData) => {
      setUser(userData);
    });
  }, []);

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  );
}

export { App };
