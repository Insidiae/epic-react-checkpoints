# Advanced React Patterns 🤯

## Exercises

### 1. Context Module Functions

> **One liner:** The Context Module Functions Pattern allows you to encapsulate a complex set of state changes into a utility function which can be tree-shaken and lazily loaded.
>
> **Real World Projects that use this pattern:**
>
> - [React Devtools](https://github.com/bvaughn/react-devtools-experimental/pull/196/commits/d53ae2ea8a5db88232c6802fc8f480cb13c23576)

- [Exercise Solution](exercises/01.js)

The Context Module Functions pattern helps abstract a complex sequence of state changes or `dispatch` calls into its own importable utility function that can then be called with the `dispatch` passed down from the context, along with other parameters that the function needs. With this pattern, you won't have to worry about creating helper methods that may just bloat your context provider - the utility function lives outside of the context provider itself and so can be tree-shaken if it's not used at all!

### 2. Compound Components

> **One liner:** The Compound Components Pattern enables you to provide a set of components that implicitly share state for a simple yet powerful declarative API for reusable components.
>
> **Real World Projects that use this pattern:**
>
> - [Reach UI](https://reacttraining.com/reach-ui)
>   - [`@reach/tabs`](https://reacttraining.com/reach-ui/tabs)

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [Support DOM component children](exercises/02.extra-1.js)

The Compound Components Pattern makes use of the `React.Children` API to implicitly share state for children elements, without requiring users to pass these state variables as props to those children. This pattern is simple yet extensible, and you can add support for native DOM elements by simply not passing additional props for DOM elements, and you can also limit the components that can receive these state variables by checking the `child.type`.

### 3. Flexible Compound Components

> **One liner:** The Flexible Compound Components Pattern only differs from the previous exercise in that it uses React context. You should use this version of the pattern more often.
>
> **Real World Projects that use this pattern:**
>
> - [`@reach/accordion`](https://reacttraining.com/reach-ui/accordion)

- [Exercise Solution](exercises/03.js)
- 💯 Extra Credit
  1. [Custom hook validation](exercises/03.extra-1.js)

The Flexible Compound Components Pattern extends the previous pattern by making use of the Context API so that the state can be shared even with deeply nested children.

### 4. Prop Collections and Getters

> **One liner:** The Prop Collections and Getters Pattern allows your hook to support common use cases for UI elements people build with your hook.
>
> **Real World Projects that use this pattern:**
>
> - [downshift](https://github.com/downshift-js/downshift) (uses prop getters)
> - [react-table](https://github.com/tannerlinsley/react-table) (uses prop getters)
> - [`@reach/tooltip`](https://reacttraining.com/reach-ui/tooltip) (uses prop collections)

- [Exercise Solution](exercises/04.js)
- 💯 Extra Credit
  1. [Prop getters](exercises/04.extra-1.js)

The Prop Collections and Getters Pattern is an extension for custom hooks, adding a collection of common predefined props which can then be passed along to whatever uses the hook. This is especially useful for adding common accessibility-related props without the user having to worry about having to add their own. This pattern can also be extended further by extracting these common predefined props into a helper function that does take the custom props that the users might want to use and composes them together with our predefined props.
