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
