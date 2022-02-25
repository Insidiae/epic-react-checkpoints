const apiURL = process.env.REACT_APP_API_URL;

// 💯 Add the ability to accept the `token` option
// function client(endpoint, customConfig = {}) {
function client(
  endpoint,
  { token, headers: customHeaders, ...customConfig } = {}
) {
  // 💯 Set the `token` in the `Authorization` header
  // (remember, it should be set to: `Bearer ${token}`)
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };
