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

### 5. [State Reducer](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)

> **One liner:** The State Reducer Pattern inverts control over the state management of your hook and/or component to the developer using it so they can control the state changes that happen when dispatching events.
>
> **Real World Projects that use this pattern:**
>
> - [downshift](https://github.com/downshift-js/downshift)

- [Exercise Solution](exercises/05.js)
- 💯 Extra Credit
  1. [Default state reducer](exercises/05.extra-1.js)
  2. [State reducer action types](exercises/05.extra-2.js)

The State Reducer pattern is a prime practical usage of the `useReducer` hook, allowing us to implement inversion of control for our hooks and/or components and instead let the users control how the state changes by passing their own reducer function.

Additionally, we could also provide a default reducer function in case the users only want a simple API and not have to pass their own reducer function every time they use these hooks and/or components. This also allows for some added simplicity for the users' own reducer functions because the users only have to worry about their own action types and state changes and then defer back to the default reducer function for all the other action types.

### 6. Control Props

> **One liner:** The Control Props pattern allows users to completely control state values within your component. This differs from the state reducer pattern in the fact that you can not only change the state changes based on actions dispatched but you also can trigger state changes from outside the component or hook as well.
>
> **Real World Projects that use this pattern:**
>
> - [downshift](https://github.com/downshift-js/downshift)
> - [`@reach/listbox`](https://reacttraining.com/reach-ui/listbox)

- [Exercise Solution](exercises/06.js)
- 💯 Extra Credit
  1. [Add read only warning](exercises/06.extra-1.js)
  2. [Add a controlled state warning](exercises/06.extra-2.js)
  3. [Extract warnings to a custom hook](exercises/06.extra-3.js)
  4. [Don’t warn in production](exercises/06.extra-4.js)

While the State Reducer pattern gives users control over how to deal with state changes _when the state changes happen_, they might also want to have control over _when the state changes happen_. The Control Props pattern allows exactly that, giving an API similar to controlled `<form>` inputs with their `value` and `onChange` props giving users control over the input's state.

With Control Props, users can optionally use a controlled prop combined with an `onChange` callback function to manually trigger state changes for the component, again giving a similar experience to controlled `<form>` inputs. We also learn how the `onChange` handler provides "suggested changes" which basically just tell the user what the updated value would've been if the component wasn't controlled.

The Extra Credit exercises dive a bit deeper into the similarities with controlled `<form>` inputs by also providing console warnings when the user misuses the controlled props, such as passing a control prop without an `onChange` handler, or passing a value for the control prop and later passing `null` or `undefined` (or vice versa).

## `next` Branch Exercises

### 1. Latest Ref 🆕

> **One liner:** The Latest Ref Pattern allows you to access the latest value of a prop, state, or callback without needing to list it in a dependency array.
>
> **Real World Projects that use this pattern:**
>
> - [react-query](https://react-query.tanstack.com/)
> - [`useInterval`](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)

- [Exercise Solution](next/01.tsx)

React Hooks changed a fundamental default behavior of the old class-based components: With class-based components, you are guaranteed to always get the _latest_ value of your prop for every new render. With React Hooks, function closures mean that the props never change for each new render. Now the old default behavior might lead to some tricky, hard-to-reproduce bugs, but it might also be a behavior that we might want (such as, for example, the `debounce` function in this exercise). Fortunately, we can still implement the old default behavior by **using** a **ref**erence to the latest value.
