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

### 3. Lifting state

- [Exercise Solution](exercises/03.js)
- 💯 Extra Credit
  1. [Colocating state](exercises/03.extra-1.js)

The React docs strongly recommend the idea of _"lifting state up"_, or to move the state that is needed by multiple sibling components to their lowest common parent component. This exercise demonstrates the process of lifting the state from a child component to a parent component so the state variable can also be accessed by a sibling component.

The Extra Credit exercise also recommends a complementing idea: To _colocate state_, or "push the state back down" when it is no longer needed to be shared between multiple sibling components. This makes the state more easily manageable, and the one component that needs this state variable can be more easily reused as needed since it now manages the state it needs within the component itself.

### 4. useState: tic tac toe

- [Exercise Solution](exercises/04.js)
- 💯 Extra Credit
  1. [Preserve state in localStorage](exercises/04.extra-1.js)
  2. [useLocalStorageState](exercises/04.extra-2.js)
  3. [Add game history feature](exercises/04.extra-3.js)

We work with a classic example featured in the React docs: Making a tic-tac-toe game using React! This exercise also demonstrates the power of React hooks by refactoring the class-based example featured in the React docs into React Hooks, and seeing how much duplicated code is stripped away with proper implementation of React Hooks. No more code reuse between `componentDidMount`, `componentDidUpdate`, and other class methods that manage the state - We just define the state using `useState` and the state variable can simply be called anywhere between the function component, and any side effects that result from updating the state variable can now be easily handled by `useEffect`!

### 5. useRef and useEffect: DOM interaction

- [Exercise Solution](exercises/05.js)

This one is a pretty brief exercise that demonstrates how the `useRef` hook gives us access to the DOM nodes for components rendered by React, for instance when we are working with another library that needs direct access to DOM nodes (such as `vanilla-tilt` for this exercise). We also learn how `useEffect` lets us manage the extra functionalities added by these DOM libraries (i.e. event listeners) and remove those to free up memory as the component gets unmounted via a cleanup function defined in the `useEffect` call.

### 6. useEffect: HTTP requests

- [Exercise Solution](exercises/06.js)
- 💯 Extra Credit
  1. [Handle errors](exercises/06.extra-1.js)
  2. [Use a status](exercises/06.extra-2.js)
  3. [Store the state in an object](exercises/06.extra-3.js)
  4. [Create an ErrorBoundary component](exercises/06.extra-4.js)
  5. [Re-mount the error boundary](exercises/06.extra-5.js)
  6. [Use react-error-boundary](exercises/06.extra-6.js)
  7. [Reset the error boundary](exercises/06.extra-7.js)
  8. [Use resetKeys](exercises/06.extra-8.js)

We work with a more advanced example for `useEffect` by handling HTTP requests. The Extra Credit exercises also dive deeper into working with HTTP requests (or any other async operations in general) by adding error handling, using a status state variable to help figure out what to render depending on the status of the request, and we also clean up our states by merging them all into one state object.

More Extra Credit exercises also demonstrate the `ErrorBoundary` component. We start by doing a basic `ErrorBoundary` component following the React docs, then we move into a more fully-featured `ErrorBoundary` component provided by the `react-error-boundary` library which also provides some nicer features like the `resetErrorBoundary` and `resetKeys` props to reset the error state without having to unmount and re-mount the component.

## `next` Branch Exercises

### 1. Managing UI State

- [Exercise Solution](next/01.tsx)
- 💯 Extra Credit
  1. [Initialize state](next/01.extra-1.tsx)
  2. [Derived state for validation](next/01.extra-2.tsx)
  3. [Improve error UX](next/01.extra-3.tsx)
  4. [Improve error accessibility for screen readers](next/01.extra-4.tsx)

This `next` branch exercise goes more in-depth about managing state with `useState` and adds Extra Credit exercises about improving accessibility for our forms.

### 2. Synchronizing Side-Effects

- [Exercise Solution](next/02.tsx)
- 💯 Extra Credit
  1. [Lazy state initialization](next/02.extra-1.tsx)
  2. [Effect dependencies](next/02.extra-2.tsx)
  3. [Custom hook](next/02.extra-3.tsx)
  4. [Flexible localStorage hook](next/02.extra-4.tsx)

Even though we work with a somewhat different example for this branch, the main concepts remains exactly the same. A few minor caveats for typing our custom hooks in the Extra Credit exercises, but some quick googling successfully migrates out custom hook to TypeScript!
