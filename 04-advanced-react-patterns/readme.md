# Advanced React Patterns 🤯

## Exercises

### 1. Context Module Functions

> **One liner:** The Context Module Functions Pattern allows you to encapsulate a complex set of state changes into a utility function which can be tree-shaken and lazily loaded.

- [Exercise Solution](exercises/01.js)

The Context Module Functions pattern helps abstract a complex sequence of state changes or `dispatch` calls into its own importable utility function that can then be called with the `dispatch` passed down from the context, along with other parameters that the function needs. With this pattern, you won't have to worry about creating helper methods that may just bloat your context provider - the utility function lives outside of the context provider itself and so can be tree-shaken if it's not used at all!
