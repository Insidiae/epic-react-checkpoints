# Advanced React Hooks 🔥

## Exercises

### 1. useReducer: simple Counter

- [Exercise Solution](exercises/01.js)
- 💯 Extra Credit
  1. [Accept the step as the action](exercises/01.extra-1.js)
  2. [Simulate setState with an object](exercises/01.extra-2.js)
  3. [Simulate setState with an object OR function](exercises/01.extra-3.js)
  4. [Traditional dispatch object with a type and switch statement](exercises/01.extra-4.js)

We are introduced to the `useReducer` hook, which is an alternative of sorts to `useState` that has an API that is easily recognizable by someone familiar with Redux. With `useReducer`, we can still do exactly the same thing we do with `useState` (and even simulate how the old `this.setState` API works for class-based components), though one major advantage of `useReducer` is that it is more optimized to handle complex state objects (like how we merged multiple state variables into a single object in the previous workshop) by using the `dispatch` method to change specific sub-values depending on the `action.type`. We can also easily implement lazy initialization (again, like we did in the previous workshop) by passing the initializer function as a third argument to `useReducer`.

### 2. useCallback: custom hooks

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [Use useCallback to empower the user to customize memoization](exercises/02.extra-1.js)
  2. [Return a memoized `run` function from useAsync](exercises/02.extra-2.js)
  3. [Make safeDispatch with useCallback, useRef, and useEffect](exercises/02.extra-3.js)

We are introduced to the `useCallback` hook, which is a mechanism for memoizing expensive or otherwise time-consuming functions (i.e. async callbacks). We also get more practice writing custom hooks to extract the commonly used logic for our async calls into a reusable `useAsync` hook.

Upon first writing the `useAsync` hook, we encounter the `exhaustive-deps` ESLint warning and we immediately see one of the use-cases for `useCallback` as it enables us to move the concerns of managing the dependency list into a more proper place and better help ESLint catch potential errors. We also improve the API for our custom `useAsync` hook by returning a memoized `run` function which can then be used by the users of this API on their own `useEffect`.

Finally, we also solve a potential bug caused by the component being unmounted in the middle of an async call, resulting in the `dispatch` function being called for an already unmounted component. To solve this, we make yet another custom hook called `useSafeDispatch` that simply checks whether the component is still mounted before actually running the `dispatch` function.
