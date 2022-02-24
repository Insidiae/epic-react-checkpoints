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
