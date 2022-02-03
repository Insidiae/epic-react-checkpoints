# React Hooks 🎣

## Exercises

### 1. useState: greeting

- [Exercise Solution](exercises/01.js)
- 💯 Extra Credit
  1. [Accept an `initialName`](exercises/01.extra-1.js)

We are introduced to our first React Hook: the `useState` hook. As the name implies, `useState` lets us use state variables, or variables that have data that may be changed over time, in our React apps. `useState` provides us two things: (1) the state variable itself, and (2) a function that we can call to set another value to the state variable. We initialize the value of our state variable in the `useState` call, letting us optionally accept a prop that can set the initial value of that state variable as the component renders for the first time.

### 2. useEffect: persistent state

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [Lazy state initialization](exercises/02.extra-1.js)
  2. [Effect dependencies](exercises/02.extra-2.js)
  3. [Custom hook](exercises/02.extra-3.js)
  4. [Flexible localStorage hook](exercises/02.extra-4.js)

We are introduced to the `useEffect` hook, which accepts a function that runs some code when React (re-)renders a component. `useEffect` also accepts what is called a _dependency array_, which constrains when the function passed to `useEffect` to only when any of the items in the dependency array change.

In the Extra Credit exercises, we are also introduced to the nicer features of React Hooks, which is the ability to extract reusable logic into our own _custom hooks_. With custom hooks, we are able to take some of our commonly used patterns, extract them into a separate function, and make those custom hook functions more flexible and generic enough to support any data type.

> **NOTE:** React also expects us to add a "use" prefix into the name of our custom hook functions (e.g. `useLocalStorageState`). Apparently [the React team needed to pick a short but descriptive naming convention](https://github.com/facebook/react/issues/15227#issuecomment-477413391) so that React can easily distinguish custom Hook functions from regular functions that are neither React components nor custom React hooks.

> 📜 By the way, [here's a really awesome resource that lists some recipes for commonly used custom React Hooks.](https://usehooks.com/)
