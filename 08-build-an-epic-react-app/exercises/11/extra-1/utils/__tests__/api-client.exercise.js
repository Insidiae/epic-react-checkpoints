import { server, rest } from "test/server";
import { client } from "../api-client";
// 💰 use `jest.mock` to mock the `react-query` and `auth-provider` modules
import { queryCache } from "react-query";
import * as auth from "auth-provider";

jest.mock("react-query");
jest.mock("auth-provider");

const apiURL = process.env.REACT_APP_API_URL;

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("makes GET requests to the given endpoint", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await client(endpoint);

  expect(result).toEqual(mockResult);
});

test("adds auth token when a token is provided", async () => {
  const token = "FAKE_TOKEN";

  let request;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await client(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});

test("allows for config overrides", async () => {
  let request;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  const customConfig = {
    method: "PUT",
    headers: { "Content-Type": "fake-type" },
  };

  await client(endpoint, customConfig);

  expect(request.headers.get("Content-Type")).toBe(
    customConfig.headers["Content-Type"]
  );
});

test("when data is provided, it is stringified and the method defaults to POST", async () => {
  const endpoint = "test-endpoint";
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );
  const data = { a: "b" };
  const result = await client(endpoint, { data });

  expect(result).toEqual(data);
});

// 💯 Add a test to make sure that the user is logged out
// if the `response.status` is 401
test("automatically logs the user out if a request returns a 401", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult));
    })
  );

  const result = await client(endpoint).catch((e) => e);
  expect(result.message).toMatchInlineSnapshot(`"Please re-authenticate."`);

  expect(queryCache.clear).toHaveBeenCalledTimes(1);
  expect(auth.logout).toHaveBeenCalledTimes(1);
});

// 💯 Add another test to make sure that the promise is rejected with the data
// returned from the server if the response.ok is false.
// This happens if the response.status is outside of the successful range of 200-299
// 📜 https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
test("correctly rejects the promise if there is an error", async () => {
  const endpoint = "test-endpoint";
  const testError = { message: "Test error" };
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError));
    })
  );

  return expect(client(endpoint)).rejects.toEqual(testError);
});
