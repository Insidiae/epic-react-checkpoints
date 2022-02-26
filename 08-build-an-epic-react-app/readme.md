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
