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

### 2. Render as you fetch

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [Suspense and Error Boundary positioning](exercises/02.extra-1.js)

The examples demonstrate three different options for fetching+rendering data: The first option is called "Render on fetch", where you render the structure of the component first before making a fetch call to get the data that you actually need to display. The second option is called "Fetch then render", where you make the fetch for the data you need before rendering the (lazy-loaded) component. These first two options share a similar downside: You have to make two separate requests, and the first request has to finish _before_ you even start the other request, which can lead to an ugly waterfall of requests where some requests depend on the completion of other requests, and lead to a non-optimal experience especially for users with slow network speeds.

The "Render as you fetch" method discussed in this exercise solves exactly this problem, since you can make the request for the code _and_ make a request for the data at the same time.

In this exercise, we make some refactors to our code that leverages React's experimental Suspense API to massively clean up the components that render the fetched data.
