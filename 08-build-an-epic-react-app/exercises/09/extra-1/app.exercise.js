import * as React from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/lib";

// 💯 You can use webpack magic comments to have webpack
// instruct the browser to prefetch dynamic imports:
// const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ "./authenticated-app")
);
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
