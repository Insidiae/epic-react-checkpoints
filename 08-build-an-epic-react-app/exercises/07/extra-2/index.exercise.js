import { loadDevTools } from "./dev-tools/load";
import "./bootstrap";
import * as React from "react";
import ReactDOM from "react-dom";
import { ReactQueryConfigProvider } from "react-query";
// 💯 You'll need the AuthProvider
import { AuthProvider } from "context/auth-context";
import { App } from "./app";

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false;
    else if (failureCount < 2) return true;
    else return false;
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
};

loadDevTools(() => {
  // 💯 Wrap the App in the AuthProvider
  ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReactQueryConfigProvider>,
    document.getElementById("root")
  );
});
