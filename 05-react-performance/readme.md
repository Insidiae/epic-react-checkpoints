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

### 3. React.memo for reducing unnecessary re-renders

- [Exercise Solution](exercises/03.js)
- 💯 Extra Credit
  1. [Use a custom comparator function](exercises/03.extra-1.js)
  2. [Pass only primitive values](exercises/03.extra-2.js)

Another way to take advantage of memoization for React apps is to use `React.memo`, which memoizes _components_ in a way that doesn't go through the whole process of re-rendering if the props passed to the component stay the same.

We can visualize this re-rendering process through the `Profiler` tab of the React Devtools, giving us more insight into what exactly triggers a re-render for each component, and perhaps optimize the ones that really don't necessarily need to be re-rendered that often.

The Extra Credit exercises dive deeper into using `React.memo` by making use of a custom comparator function that helps `React.memo` tell whether to re-render the component depending on which props change. The second Extra Credit exercise also gives a word of caution with prematurely optimizing re-renders this way - If you find yourself needing to do some complicated calculations (such as comparing different object properties) just to figure out whether to re-render a component, it might be wiser to perform those calculations in the parent component and instead pass primitive values that can be compared more easily, and might even totally eliminate the need for these large and complicated comparator functions!

### 4. Window large lists with react-virtual

- [Exercise Solution](exercises/04.js)

Sometimes we might receive a really large dataset containing tens of thousands of items to render and interact with. This obviously will cause performance issues simply due to the sheer amount of items we have to manage. We are introduced to the `react-virtual` library, which helps with "just-in-time" rendering only a small subset of our data, and display the appropriate items as the users navigate through the list. This gives the users the freedom to scroll through our tens of thousands of list items, but our component is now as performant as if it's only rendering 20-30 items at once (because it actually is)!

### 5. Optimize context value

- [Exercise Solution](exercises/05.js)
- 💯 Extra Credit
  1. [Separate the contexts](exercises/05.extra-1.js)

Whenever the context value changes between renders, the consuming components also trigger a re-render regardless of whether they're `React.memo`-ed or not. There's a bit of a gotcha here - when putting your context values into a single array/object, it still triggers a re-render of all consuming elements even though the individual values themselves all stay the same. This is because we're essentially creating a brand new array/object every single render, triggering a re-render for the consuming elements regardless of whether the values in that new array/object is the same as the previous one. The simple solution to this is to just `React.useMemo()` the context value array/object before you pass it down, because it memoizes the array/object itself and so it won't trigger a re-render unless one of the individual values change.

Another option would be to just use a separate context provider if the children components only need different parts of your context value. That way, when an individual context value changes, only the components that explicitly depend on that value would need to be re-rendered.

> Another gotcha that almost got me in this exercise - Be mindful when trying to pass down values wrapped in an object like this:
>
> ```jsx
> function AppProvider({ children }) {
>   /*...*/
>
>   return (
>     <AppStateContext.Provider value={{ state }}>
>       <AppDispatchContext.Provider value={{ dispatch }}>
>         {children}
>       </AppDispatchContext.Provider>
>     </AppStateContext.Provider>
>   );
> }
> ```
>
> I ran through the Profiler tab in the React Devtools and it just gets back to the initial behavior where everything re-renders when the context provider re-renders.
>
> We'll want to pass the values directly instead like so:
>
> ```jsx
> function AppProvider({ children }) {
>   /*...*/
>
>   return (
>     <AppStateContext.Provider value={state}>
>       <AppDispatchContext.Provider value={dispatch}>
>         {children}
>       </AppDispatchContext.Provider>
>     </AppStateContext.Provider>
>   );
> }
> ```
>
> In hindsight, I guess the reason why the first example goes back to our unwanted initial behavior is because we're essentially mimicking the `const value = [state, dispatch]` assignment when we pass down the values wrapped in objects, because those objects _also get re-declared upon re-render and causes everything else to re-render anyway_ 😅

### 6. Fix “perf death by a thousand cuts”

- [Exercise Solution](exercises/06.js)
- 💯 Extra Credit
  1. [Separate contexts](exercises/06.extra-1.js)
  2. [Limit the work consuming components do](exercises/06.extra-2.js)
  3. [Write an HOC to get a slice of app state](exercises/06.extra-3.js)
  4. [Use recoil](exercises/06.extra-4.js)

In this exercise, we take a look at different ways to solve the “perf death by a thousand cuts” issue, or when there are too many components that by themselves are quite fast, but become a bottleneck when everything is put together.

First, we simply just colocate the state values to which components actually _need_ to deal with them. Removing unnecessary state values from a global context prevents re-rendering other components that otherwise don't even need to consume those values.

Another method is to separate the contexts for different values. This gives the same benefit as colocating state, but more useful for when your state values really do need to be consumed by multiple different components.

Even after isolating different context values to their relevant components, some components might realistically only need a small portion (or _slice_) of the context value and won't need to re-render unless their specific slice of the context value gets modified. We can improve the performance of such components by creating a "middle-man" component that does the actual consuming of the context value, and then just pass the relevant slices to the components that need them. We can extend this further by making a generic higher-order component that serves as the "middle-man" component that can serve other different components.

Finally, we can simply use a state management library such as [Recoil](https://recoiljs.org/) that already comes prebuilt with these optimizations in mind, and then our problem will just boil down to just working with the state management library's API and integrate it to our components.

### 7. Production performance monitoring

- [Exercise Solution](exercises/07.js)
- 💯 Extra Credit
  1. [Use the experimental trace API ⚠️](exercises/07.extra-1.js)

We are introduced to some production profiling tools React provides for us. The `<React.Profiler />` API lets us track some of the render times for the component it's wrapped around (along with its children) which we can then aggregate and send to our servers for us to monitor.

> **NOTE:** Unless you build your app using `react-dom/profiling` and `scheduler/tracing-profiling`, this component won’t do anything.

We can also use the [experimental trace API ⚠️](https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16) to include interactions such as button clicks, form submits, HTTP responses, etc. to our profiling logs.

> ⚠️ **WARNING!** As of React 17, the experimental trace API is now removed. However, it seems [we can still utilize the interaction tracing API](https://github.com/kentcdodds/react-performance/issues/107), at least with the React version that the workshop uses as of writing these notes.
