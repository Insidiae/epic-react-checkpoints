import * as auth from "auth-provider";
const apiURL = process.env.REACT_APP_API_URL;

function client(
  endpoint,
  { token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  // 🦉 If the user's token expires or the user does something they're not
  // supposed to, the backend can send a 401 request. If that happens,
  // then we'll want to log the user out and refresh the page automatically
  // so all data is removed from the page.
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // 💯 Call `auth.logout()` to delete the user's token from the Auth Provider
        await auth.logout();
        // 💯 Call `window.location.assign(window.location)`
        // to reload the page for them
        window.location.assign(window.location);
        return Promise.reject({ message: "Please re-authenticate." });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
