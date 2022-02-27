// 💯 Move the server setup from `src/utils/__tests__/api-client.js`
import { server } from "test/server";

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
