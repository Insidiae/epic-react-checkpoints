import * as React from "react";
import { queryCache } from "react-query";
import * as auth from "auth-provider";
import { FullPageSpinner, FullPageErrorFallback } from "components/lib";
// import * as colors from 'styles/colors'
import { client } from "utils/api-client";
import { useAsync } from "utils/hooks";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    // throw new Error(`useAuth must be used within a AuthContext provider`)
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}

// 💯 Create an `AuthProvider` component that renders the `AuthContext.Provider`
async function getUser() {
  let user = null;

  const token = await auth.getToken();
  if (token) {
    const data = await client("me", { token });
    user = data.user;
  }

  return user;
}

function AuthProvider(props) {
  // 💯 Most of the code for this component will be moved from `src/app.js`
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
    status,
  } = useAsync();

  React.useEffect(() => {
    run(getUser());
  }, [run]);

  const login = (form) => auth.login(form).then((user) => setData(user));
  const register = (form) => auth.register(form).then((user) => setData(user));
  const logout = () => {
    auth.logout();
    queryCache.clear();
    setData(null);
  };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    // 💰 Your coworkers also provided a FullPageErrorFallback to display here!
    // return (
    //   <div
    //     css={{
    //       color: colors.danger,
    //       height: '100vh',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <p>Uh oh... There's a problem. Try refreshing the app.</p>
    //     <pre>{error.message}</pre>
    //   </div>
    // )
    return <FullPageErrorFallback error={error} />;
  }

  // 💯 Make sure that the value you pass to the provider is:
  // {user, login, register, logout}

  if (isSuccess) {
    const value = { user, login, register, logout };
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

// 💯 Don't forget to export the `AuthProvider` component along with
// the `useAuth` hook. And you don't need to export the `AuthContext` anymore!
// export {AuthContext, useAuth}
export { useAuth, AuthProvider };
