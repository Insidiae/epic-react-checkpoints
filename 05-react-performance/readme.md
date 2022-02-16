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

### 2. useMemo for expensive calculations

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [React Production Mode](https://react-performance.netlify.app/isolated/final/02.extra-1.js)
  2. [Put getItems into a Web Worker](exercises/02.extra-2.js)

It is important to note that because we typically are using function components with React Hooks, all calculations performed within that function have to be performed every time the function gets called (aka every single render). This also means that expensive, or otherwise slow calculations also result in the component itself being slow, which might lead to a performance bottleneck.

Fortunately, React provides us a handful of tools to minimize the amount of times where we have to perform such expensive or slow calculations. Enter `React.useMemo()`, which allows us to put these calculations behind a function that only gets called when absolutely necessary (i.e. when the dependencies change). This brings the major benefits of memoization into our component, where the expensive or slow calculations won't be re-calculated if the re-render doesn't actually change the dependencies that go into these calculations.

The first Extra Credit demonstrates another optimization React performs under the hood by simply running in production mode, where we see a vast improvement due to React building an optimized and minified bundle for production mode.

The second Extra Credit exercise also introduces Web Workers, which is another optimization we might want to consider for expensive or slow calculations by putting them in a web worker that the browser can run in another thread separate to our app, boosting the performance even further.
