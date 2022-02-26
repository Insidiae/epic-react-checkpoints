// 💯 Create an AppProviders component that:
// - accepts a children prop
// - renders all the context providers for our app:
//   - `ReactQueryConfigProvider` <-- get that from the src/index.js module
//   - `Router` <-- get that from the src/app.js module
//   - `AuthProvider` <-- you should have created that in src/context/auth-context.js
// - Pass the children along to the last provider
import * as React from "react";
import { ReactQueryConfigProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./auth-context";

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};

export function AppProviders({ children }) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  );
}
