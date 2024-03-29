import * as React from "react";
// import {BrowserRouter as Router} from 'react-router-dom'
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  const { user } = useAuth();
  // 💯 Move the `Router` into the `AppProviders`
  // return user ? (
  //   <Router>
  //     <AuthenticatedApp />
  //   </Router>
  // ) : (
  //   <UnauthenticatedApp />
  // )
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export { App };
