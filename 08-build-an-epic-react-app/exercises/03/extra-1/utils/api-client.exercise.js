function client(endpoint, customConfig = {}) {
  const config = {
    method: "GET",
    ...customConfig,
  };

  return (
    window
      .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
      // 🦉 If the request fails with an unsuccessful status code (`>= 400`),
      // then the response object's ok property will be false.
      // 💯 Reject the promise if `response.ok` is false
      // .then(response => response.json())
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          return data;
        } else {
          return Promise.reject(data);
        }
      })
  );
}

export { client };
