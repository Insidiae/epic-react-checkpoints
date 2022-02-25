import * as auth from "auth-provider";
const apiURL = process.env.REACT_APP_API_URL;

// 💯 Enhance the client to support posting data
// Here's how we should be able to use the `client` when this is all done:
// client('http://example.com/pets', {
//   token: 'THE_USER_TOKEN',
//   data: {name: 'Fluffy', type: 'cat'},
// })

function client(
  endpoint,
  { token, data, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    // method: 'GET',
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        // refresh the page for them
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
