# React Fundamentals ⚛

## 1. Basic JavaScript-rendered Hello World

- [Exercise Solution](exercises/01.html)
- 💯 Extra Credit
  1. [Generate the root node](exercises/01.extra-1.html)

We start by working with a barebones HTML file. Using the default JavaScript DOM APIs, we can generate the container `<div>`, specify its class name/s, and write the text `Hello World` contained within the element.

Interestingly, we can skip the `<!DOCTYPE html>`, `<html>`, and `<head>` tags when writing the code for this exercise - the browser seems to automatically generate the missing tags even if we skip to only writing the `<body>` tag containing the code for our exercise!

## 2. Intro to raw React APIs

- [Exercise Solution](exercises/02.html)
- 💯 Extra Credit
  1. [Nesting elements](exercises/02.extra-1.html)

We are introduced to the APIs React provides for creating DOM nodes. Instead of creating an empty element, setting its attributes, and defining its content, with React we can imperatively do all those tasks with its own `createElement` method. using React's API, we just specify the element type, pass its props (similar to attributes), and we can even specify the component's children as additional arguments!

Upon doing the Extra Credit for this exercise, we might encounter a `react-warning-keys` warning if we pass the children directly to the `children` prop. We can make the warning go away (for now) by simply passing the children as additional arguments to the `createElement` call - we'll learn more about what these `key`s mean in a future section...

## 3. Using JSX

- [Exercise Solution](exercises/03.html)
- 💯 Extra Credit
  1. [Interpolate `className` and `children`](exercises/03.extra-1.html)
  2. [Spread props](exercises/03.extra-2.html)

We are introduced to JSX, which is really just syntactic sugar to make working with the React API more intuitive and similar to working with HTML. Using JSX requires Babel to convert the JSX into the plain JavaScript that the browser can actually understand.

The Extra Credit exercises offer a deeper dive into the more fancy stuff we can do with JSX, such as interpolation and spreading variables into a component's props and/or children. Taking a peek at how this JSX compiles into the raw React API using Babel, we can start to appreciate the beauty of the React API with how it organizes the props and the children into its `createElement` method.

## 4. Creating Custom Components

- [Exercise Solution](exercises/04.html)
- 💯 Extra Credit
  1. [Using a custom component with `React.createElement`](exercises/04.extra-1.html)
  2. [Using a custom component with JSX](exercises/04.extra-2.html)
  3. [Runtime validation with `PropTypes`](exercises/04.extra-3.html)
  4. [Use the `prop-types` package](exercises/04.extra-4.html)
  5. [Using React Fragments](exercises/04.extra-5.html)

We are introduced to the concept of _components_, which is a way to share code between JSX elements by abstracting into separate functions.

The Extra Credit exercises delve into how to create components step-by-step, starting from the raw `React.createElement` API and progressively changing our code as we use JSX instead of the raw `React.createElement` API. We also take another peek into how our JSX is interpreted by Babel when we use different naming conventions (i.e. camelCase, PascalCase, etc.), offering a greater insight to how React works under the hood.

Additional Extra Credit exercises also demonstrate `propTypes`, which is a way to indicate _during development_ whether we passed the wrong type of value for a prop (which is also something that using a statically-typed language like TypeScript makes redundant).

Finally, we also try out React Fragments to render multiple elements without needing to specify a parent element first, which is something that may be useful when working with complex layout grids or tables.

## 5. Styling

- [Exercise Solution](exercises/05.js)
- 💯 Extra Credit
  1. [Create a custom component](exercises/05.extra-1.js)
  2. [Accept a size prop to encapsulate styling](exercises/05.extra-2.js)

We learn two different ways to style React components: Defining styles inline using the `style` prop, and defining styles with regular CSS then applying the styles through the `className` prop. With JSX, we see just how closely working with styles is to regular HTML, but here with JSX React offers a bit more flexibility by offering ways to combine styles using interpolation, and then using interpolation to help abstract the implementation details of these styles, as demonstrated in the Extra Credit exercises.

## 6. Forms

- [Exercise Solution](exercises/06.js)
- 💯 Extra Credit
  1. [Using `ref`s](exercises/06.extra-1.js)
  2. [Validate lower-case](exercises/06.extra-2.js)
  3. [Control the input value](exercises/06.extra-3.js)

In this exercise, we learn how React handles forms and what abstractions React provides to help make working with forms easier and also provide additional APIs to interact with forms beyond what we can do with regular DOM APIs and JavaScript.

The Extra Credit exercises introduce some new React APIs that help us manage forms: Using `ref`s as an alternative to get the current value of a certain input, and using state variables to provide additional features to forms such as input validation (and displaying error messages as needed) and even programmatically controlling what kind of values a certain input can have.

## 7. Rendering Arrays

- [Exercise Solution](exercises/07.js)
- 💯 Extra Credit
  1. [Focus Demo](https://react-fundamentals.netlify.app/isolated/final/07.extra-1.js)

We are introduced to an interesting quirk React has with regards to rendering arrays. We learn exactly what the `react-warning-keys` error shown in a previous exercise was for, and why React needs keys to keep track of array elements as they get changed, added, removed, or even shuffled.

As a bonus, the Extra Credit shows a demo of a bug one might encounter when incorrectly setting keys - Without proper keys for React to use to keep track of elements, form inputs lose whatever part is highlighted as the inputs get shuffled around, and the focused element becomes hard to track as the focus does not follow the input as it gets moved to a new position in the array. With a proper setting of keys, this problem pretty much gets eliminated entirely.
