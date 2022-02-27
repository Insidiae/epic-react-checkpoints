# Build an Epic React App 🚀

## Part 1

### 1. Render a React App

- [Exercise Solution](exercises/01/exercise/)
- 💯 Extra Credit
  1. [Use `@reach/dialog`](exercises/01/extra-1/)
  2. [Create a LoginForm component](exercises/01/extra-2/)

We start working on the Bookshelf app from scratch. We go from the very basics like rendering a simple React component, to rendering a basic login/register form. We are also introduced to the Reach UI library that helps with displaying common UI components like a modal dialog that will contain the login/registration forms.

### 2. Style React Components

- [Exercise Solution](exercises/02/exercise/)
- 💯 Extra Credit
  1. [Use the emotion macro](exercises/02/extra-1/)
  2. [Use colors and media queries file](exercises/02/extra-2/)
  3. [Make a loading spinner component](exercises/02/extra-3/)

We now add styles to the Bookshelf app via CSS-in-JS with the help of the Emotion library. With Emotion, we can add styles to components ala Styled Components, but we can also directly add one-off CSS styles into our components by using Emotion's `jsx` pragma and passing a `css` prop containing the styles into the component. We can also add a simple loading spinner using Emotion's `keyframes` helper.

### 3. Make HTTP Requests

- [Exercise Solution](exercises/03/exercise/)
- 💯 Extra Credit
  1. [Handle failed requests](exercises/03/extra-1/)
  2. [Use the useAsync hook](exercises/03/extra-2/)

We make use of the `window.fetch` API to make HTTP requests when the Bookshelf users search for a book. We then leverage the power of React Hooks to handle the data returned from the server, and we also explore handling errors in our HTTP requests as well. This exercise also demonstrates a practical application of the `useAsync` custom hook featured in previous workshops, massively simplifying the code we write for handling these HTTP requests.

## Part 2

### 4. Authentication

- [Exercise Solution](exercises/04/exercise/)
- 💯 Extra Credit
  1. [Load the user's data on page load](exercises/04/extra-1/)
  2. [Use `useAsync`](exercises/04/extra-2/)
  3. [Automatically logout on 401](exercises/04/extra-3/)
  4. [Support posting data](exercises/04/extra-4/)

We now add Authentication to the Bookshelf app using JWT tokens provided from an auth provider API. Leveraging the power of our `useAsync` hook, we can easily add some nice handlers to automatically fetch user data upon loading the page. We also improve our API client code a bit to support handling expired/invalid tokens and support `POST`ing data with the client as well.

### 5. Routing

- [Exercise Solution](exercises/05/exercise/)
- 💯 Extra Credit
  1. [Handle URL redirects](exercises/05/extra-1/)
  2. [Add `useMatch` to highlight the active nav item](exercises/05/extra-2/)

We now add routing to the Bookshelf app using React Router. React Router is a de-facto standard routing library for React applications, letting us easily and declaratively define a list of routes that render different "pages" (really just regular React components), and can even change the look of certain components depending on the URL. We also add multiple ways to handle redirects, both for local development and production deployment using Netlify.

### 6. Cache Management

- [Exercise Solution](exercises/06/exercise/)
- 💯 Extra Credit
  1. [Make hooks](exercises/06/extra-1/)
  2. [Wrap the `<App />` in a `<ReactQueryConfigProvider />`](exercises/06/extra-2/)
  3. [Handle mutation errors properly](exercises/06/extra-3/)
  4. [Add a loading spinner for the notes](exercises/06/extra-4/)
  5. [Prefetch the book search query](exercises/06/extra-5/)
  6. [Add books to the query cache](exercises/06/extra-6/)
  7. [Add optimistic updates and recovery](exercises/06/extra-7/)

We use a library called React Query that provides some nice abstractions for handling data that comes from our server. We start by replacing some of our `useAsync` calls dealing with fetching data from the server to instead use React Query's `useQuery` hook. We also use React Query's `useMutation` hook to add more features (reading list, notes, and ratings) to the Bookshelf app.

We also demonstrate the power of custom React hooks by cleaning up massive chunks of reused hook and abstracting them into their own custom hooks. This also prevents bugs that may arise from improperly calling React Query's hooks with the wrong parameters.

Incidentally, React Query also comes with many of the same booleans we might know from `useAsync`, which also lets us display loading spinners while the request is pending, or display the appropriate error when the request fails.

We can also take advantage of React Query's `queryCache` feature to provide a much smoother experience for the Bookshelf users. Using the `queryCache`, we can prefetch queries so that loading the books on the discover list appears instant for the user, and also instantly display changes (if any) if the user navigates back to the book search list after viewing a specific book. We can also use `queryCache` to skip the loading process for individual books, given that the book data is already provided to us via the book search and reading list queries. Finally, we also explore adding optimistic UI for React Query mutations so that state updates feel instant for the user, yet we can also roll back to the previous state if the request somehow fails.

## Part 3

### 7. Context

- [Exercise Solution](exercises/07/exercise/)
- 💯 Extra Credit
  1. [Create a `useAuth` hook](exercises/07/extra-1/)
  2. [Create an `AuthProvider` component](exercises/07/extra-2/)
  3. [Colocate global providers](exercises/07/extra-3/)
  4. [Create a `useClient` hook](exercises/07/extra-4/)

We improve the Authentication API for the Bookshelf app by extracting the authentication-related code into a separate React Context. This reduces the amount of prop drilling within the app, and ensures that only the components that actually need to deal with authentication code makes use of the context.

We also use custom hooks to clean things up even further by moving the context-consuming code into a custom hook, and abstracting authenticated API calls into another custom hook.

### 8. Compound Components

- [Exercise Solution](exercises/08/exercise/)
- 💯 Extra Credit
  1. [Add `callAll`](exercises/08/extra-1/)
  2. [Create ModalContentsBase](exercises/08/extra-2/)

We make use of the (Flexible) Compound Components pattern in the Bookshelf app by abstracting the login/register form modal into a more reusable Modal component. The new Modal component is not only more customizable, it also abstracts away the handling of its `isOpen` state.

We also provide further abstractions for the more common use cases by genericizing the previous `ModalContents` component into a `ModalContentsBase` (for users who might want a different use case), and instead provide a new `ModalContents` component with the commonly-used components built-in.

### 9. Performance

- [Exercise Solution](exercises/09/exercise/)
- 💯 Extra Credit
  1. [Prefetch the Authenticated App](exercises/09/extra-1/)
  2. [Memoize context](exercises/09/extra-2/)
  3. [Production Monitoring](exercises/09/extra-3/)
  4. [Add interaction tracing](exercises/09/extra-4/)

We add some performance enhancements to the Bookshelf app by lazy-loading the app components, prefetching the authenticated app component, and memoizing the auth context values.

We also use `React.Profiler` to monitor different parts of the Bookshelf app and send relevant data to the backend server, and enable profiling in the production builds as well. We also make use of the experimental interaction tracing API to help determine the interactions that are involved in the profiled data.

### 10. Render as you fetch

- [Exercise Solution](exercises/10/exercise/)
- 💯 Extra Credit
  1. [Preload all initial data](exercises/10/extra-1/)

We provide an even smoother loading experience for the Bookshelf users by preloading the user data while the page renders. This is done by simply moving the user data request from inside the `useEffect` call to just outside the `AuthProvider` function. This can be done because the user data request doesn't actually need any data from the `AuthProvider` to start fetching the user data, so we can move the request outside the function so it can be run before the `useEffect` callbacks are even called!

React Query also provides tools to improve things further by also fetching the list items and setting them into the query cache, and those requests can be done at the same time as the page is rendering so that the list items are instantly there as soon as the page finishes rendering. With a little help from Bookshelf's backend engineers, we can combine the user data request and the reading list item request into a single request to a special endpoint that returns both of those data at once!

## Part 4

### 11. Unit Testing

- [Exercise Solution](exercises/11/exercise/)
- 💯 Extra Credit
  1. [Test failure cases](exercises/11/extra-1/)
  2. [Use `setupTests.js`](exercises/11/extra-2/)

We begin testing the features of the Bookshelf app by writing a few unit tests. As a warmup, we start by testing a simple `formatDate` function.

We than add tests for the custom `client` function we use to interact with the server. We use `msw` to mock the server responses and write tests to ensure that the use cases for the `client` function all work properly. We also add more tests to verify that the `client` function correctly handles failure cases via promise rejection. We also add tests for the special case where the user should be logged out on a 401 error with the help of mocking the relevant modules via `jest.mock`.

### 12. Testing Hooks and Components

- [Exercise Solution](exercises/12/exercise/)
- 💯 Extra Credit
  1. [AHA Testing](exercises/12/extra-1/)

We test the reusable `Modal` component using React Testing Library, making sure to test the basic functionality such as opening and closing the modal and also using accessible labels and roles to query the rendered components.

We also test the `useAsync` hook using React Hooks Testing Library, starting by verifying the basic use cases using `useAsync`'s `run` function to handle async calls. We also test other configuration options such as providing an initial state and manually setting the `data` and `error` values. We also test `useAsync`'s ability to handle potential errors, such as attempting to set state on an unmounted component and `run`ning without a promise. We then apply the AHA principle to clean up some reused code across the test file.

### 13. Integration Testing

- [Exercise Solution](exercises/13/exercise/)
- 💯 Extra Credit
  1. [Create mock server for all fetch requests](exercises/13/extra-1/)
  2. [Write second integration test](exercises/13/extra-2/)
  3. [Create test utilities](exercises/13/extra-3/)
  4. [Move test utilities to global utils](exercises/13/extra-4/)
  5. [Cover more use cases](exercises/13/extra-5/)
  6. [Create a component-specific utility](exercises/13/extra-6/)
  7. [Write error state tests](exercises/13/extra-7/)

We write a large part of the tests for the Bookshelf app with these integration tests, where we render the whole `App` component and use these tests to explore some user flows that can occur within the app. These integration tests pretty much use most of the concepts from the previous testing exercises, but now we actually test that the Bookshelf app's components actually work together correctly and the tests start resembling the way an real user would actually go around the app.
