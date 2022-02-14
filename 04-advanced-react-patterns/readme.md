# Advanced React Patterns 🤯

## Exercises

### 1. Context Module Functions

> **One liner:** The Context Module Functions Pattern allows you to encapsulate a complex set of state changes into a utility function which can be tree-shaken and lazily loaded.

- [Exercise Solution](exercises/01.js)

#### Real World Projects that use this pattern:

- [React Devtools](https://github.com/bvaughn/react-devtools-experimental/pull/196/commits/d53ae2ea8a5db88232c6802fc8f480cb13c23576)

The Context Module Functions pattern helps abstract a complex sequence of state changes or `dispatch` calls into its own importable utility function that can then be called with the `dispatch` passed down from the context, along with other parameters that the function needs. With this pattern, you won't have to worry about creating helper methods that may just bloat your context provider - the utility function lives outside of the context provider itself and so can be tree-shaken if it's not used at all!

### 2. Compound Components

> **One liner:** The Compound Components Pattern enables you to provide a set of components that implicitly share state for a simple yet powerful declarative API for reusable components.

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [Support DOM component children](exercises/02.extra-1.js)

#### Real World Projects that use this pattern:

- [Reach UI](https://reacttraining.com/reach-ui)
  - [`@reach/tabs`](https://reacttraining.com/reach-ui/tabs)

The Compound Components Pattern makes use of the `React.Children` API to implicitly share state for children elements, without requiring users to pass these state variables as props to those children. This pattern is simple yet extensible, and you can add support for native DOM elements by simply not passing additional props for DOM elements, and you can also limit the components that can receive these state variables by checking the `child.type`.
