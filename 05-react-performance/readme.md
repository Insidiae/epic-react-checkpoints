# React Performance ⚡

## Exercises

### 1. Code splitting

- [Exercise Solution](exercises/01.js)
- 💯 Extra Credit
  1. [Eager loading](exercises/01.extra-1.js)
  2. [Webpack magic comments](exercises/01.extra-2.js)

We are introduced to `React.lazy()` and `<React.Suspense>`, which are tools React provides for code splitting, or dynamically loading potentially large/slow components until the user actually needs them. The Extra Credit exercises also demonstrate eager loading, which prefetches these lazily loaded components in the background so the user has to wait less time to interact with the component when they need it.

There are two different methods for eager loading demonstrated here. One is fetching the lazily loaded component as soon as the user hovers/focuses/etc. the checkbox that toggles whether the lazily loaded component should be displayed. Another method which might be better for these commonly used lazily loaded components is to prefetch the component as soon as the page loads, which can be done using `<link prefetch>` tags or Webpack magic components.

We also discuss some of the features of the Chrome Devtools with the React Devtools extension to help keep track of which files are loaded by the user via the `Network` tab, and with the `Coverage` tab, compare them with which parts of the code are actually used to display what's on the user's screen.
