import * as React from "react";
import { useAuth } from "./context/auth-context";
// 🐨 you'll want to render the FullPageSpinner as the fallback
import { FullPageSpinner } from "./components/lib";

// 🐨 exchange these for React.lazy calls
// import {AuthenticatedApp} from './authenticated-app'
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
// import {UnauthenticatedApp} from './unauthenticated-app'
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  // 🐨 wrap this in a <React.Suspense /> component
  // return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export { App };
