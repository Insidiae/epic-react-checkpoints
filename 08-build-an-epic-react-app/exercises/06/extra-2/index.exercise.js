import { loadDevTools } from "./dev-tools/load";
import "./bootstrap";
import * as React from "react";
import ReactDOM from "react-dom";
// 💯 You'll need `ReactQueryConfigProvider` from `react-query`
import { ReactQueryConfigProvider } from "react-query";
import { App } from "./app";

// 💯 Create a `queryConfig` object here
const queryConfig = {
  queries: {
    // 💯 Enable `useErrorBoundary`
    useErrorBoundary: true,
    // 💯 Disable `refetchOnWindowFocus` for queries (not for mutations though)
    refetchOnWindowFocus: false,
    // 💯 Customizethe `retry` option
    // See if you can figure out how to make it not retry if the error status
    // is 404 or if the failure count is greater than 2.
    retry(failureCount, error) {
      if (error.status === 404) {
        return false;
      }

      if (failureCount > 2) {
        return false;
      }

      return true;
    },
  },
};

loadDevTools(() => {
  // ReactDOM.render(<App />, document.getElementById('root'))
  ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>,
    document.getElementById("root")
  );
});
