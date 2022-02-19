# React Suspense 🔀

## Exercises

### 1. Simple Data-fetching

- [Exercise Solution](exercises/01.js)
- 💯 Extra Credit
  1. [Add error handling with an Error Boundary](exercises/01.extra-1.js)
  2. [Make more generic createResource](exercises/01.extra-2.js)
  3. [Use utils](exercises/01.extra-3.js)

We dive into the basics of the experimental `React.Suspense` API, letting us define a promise ahead of time, throwing the promise while it fetches its data, then using `React.Suspense` to rerender the component when the promise gets resolved. We can also use the `ErrorBoundary` component to catch errors if the promise gets rejected for any reason.

We can then genericize this logic to make a reusable utility function that does the data fetching and error handling work for us, and with the `React.Suspense` API, this leaves the components that use this utility function fully declarative.
