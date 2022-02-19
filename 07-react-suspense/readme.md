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

### 3. useTransition for improved loading states

- [Exercise Solution](exercises/03.js)
- 💯 Extra Credit
  1. [Use CSS transitions](exercises/03.extra-1.js)
  2. [Avoid flash of loading content](exercises/03.extra-2.js)

> 📣 **BREAKING CHANGE ALERT:** The version of React in this project works like it does in the recorded videos. However in the future experimental builds of React, the `SUSPENSE_CONFIG` option to `useTransition` has been completely removed. Read more about this here: https://github.com/facebook/react/pull/19703

We are introduced to an experimental React hook called `useTransition`, which improves the loading experience for our users by providing a mechanism to control what happens when a suspending component needs to be updated (such as when making fetch calls), and providing an `isPending` state that we can use to indicate to the user that our component is currently in a loading state. We can also tweak some settings to further improve the user experience by delaying the display of the loading state for a specified amount of time so that users with fast network speeds need not even see the loading state at all.

### 4. Cache resources

- [Exercise Solution](exercises/04.js)
- 💯 Extra Credit
  1. [Put cache in context](exercises/04.extra-1.js)
  2. [Create a context provider](exercises/04.extra-2.js)
  3. [Add cache timeout](exercises/04.extra-3.js)

We further improve the user experience for the Pokemon example app by adding the ability to cache the data we fetch from the API so that the user won't need to re-fetch a Pokemon they've already viewed before. We also take advantage of React Context to improve our control of the cached data and add some basic cache invalidation strategy.

### 5. Suspense Image

- [Exercise Solution](exercises/05.js)
- 💯 Extra Credit
  1. [Avoid waterfall](exercises/05.extra-1.js)
  2. [Render as you Fetch](exercises/05.extra-2.js)

React's experimental Suspense API is not only limited to fetching data from API, we can actually use the exact same concepts and preload images at the same time we fetch our data (as long as we have some way to get the image's `src` URL from the request parameters)!.With this, we can fully utilize the "Render as you fetch" strategy to fetch our lazily-loaded code, the data from the API, and the images to be displayed, all at the same time!
