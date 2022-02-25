/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
// 🐨 you're going to need this:
import * as auth from "auth-provider";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  // 🐨 useState for the user
  const [user, setUser] = React.useState(null);

  // 🐨 create a login function that calls auth.login then sets the user
  // 💰 const login = form => auth.login(form).then(u => setUser(u))
  function login(form) {
    return auth.login(form).then((userData) => setUser(userData));
  }

  // 🐨 create a registration function that does the same as login except for register
  function register(form) {
    return auth.register(form).then((userData) => setUser(userData));
  }

  // 🐨 create a logout function that calls auth.logout() and sets the user to null
  function logout() {
    auth.logout();
    setUser(null);
  }

  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  if (user) {
    return <AuthenticatedApp user={user} logout={logout} />;
  }

  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register
  return <UnauthenticatedApp login={login} register={register} />;
}

export { App };
