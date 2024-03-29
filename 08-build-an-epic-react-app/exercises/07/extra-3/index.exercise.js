import { loadDevTools } from "./dev-tools/load";
import "./bootstrap";
import * as React from "react";
import ReactDOM from "react-dom";
// 💯 Move all these providers into a single `AppProviders` component
// import {ReactQueryConfigProvider} from 'react-query'
// import {AuthProvider} from './context/auth-context'
import { AppProviders } from "context";
import { App } from "./app";

// const queryConfig = {
//   queries: {
//     useErrorBoundary: true,
//     refetchOnWindowFocus: false,
//     retry(failureCount, error) {
//       if (error.status === 404) return false
//       else if (failureCount < 2) return true
//       else return false
//     },
//   },
// }
loadDevTools(() => {
  ReactDOM.render(
    // <ReactQueryConfigProvider config={queryConfig}>
    //   <AuthProvider>
    //     <App />
    //   </AuthProvider>
    // </ReactQueryConfigProvider>,
    <AppProviders>
      <App />
    </AppProviders>,
    document.getElementById("root")
  );
});
