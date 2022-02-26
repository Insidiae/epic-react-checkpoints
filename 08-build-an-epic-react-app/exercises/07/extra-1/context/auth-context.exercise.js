import * as React from "react";

const AuthContext = React.createContext();

// 💯 Create a `useAuth` custom hook
// that consumes the `AuthContext` from `React.useContext`
function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContext provider`);
  }

  return context;
}

export { AuthContext, useAuth };
