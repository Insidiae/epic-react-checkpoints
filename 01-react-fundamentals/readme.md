# React Fundamentals ⚛

## Exercises

### 1. Basic JavaScript-rendered Hello World

- [Exercise Solution](exercises/01.html)
- 💯 Extra Credit
  1. [Generate the root node](exercises/01.extra-1.html)

We start by working with a barebones HTML file. Using the default JavaScript DOM APIs, we can generate the container `<div>`, specify its class name/s, and write the text `Hello World` contained within the element.

Interestingly, we can skip the `<!DOCTYPE html>`, `<html>`, and `<head>` tags when writing the code for this exercise - the browser seems to automatically generate the missing tags even if we skip to only writing the `<body>` tag containing the code for our exercise!

### 2. Intro to raw React APIs

- [Exercise Solution](exercises/02.html)
- 💯 Extra Credit
  1. [Nesting elements](exercises/02.extra-1.html)

We are introduced to the APIs React provides for creating DOM nodes. Instead of creating an empty element, setting its attributes, and defining its content, with React we can imperatively do all those tasks with its own `createElement` method. using React's API, we just specify the element type, pass its props (similar to attributes), and we can even specify the component's children as additional arguments!

Upon doing the Extra Credit for this exercise, we might encounter a `react-warning-keys` warning if we pass the children directly to the `children` prop. We can make the warning go away (for now) by simply passing the children as additional arguments to the `createElement` call - we'll learn more about what these `key`s mean in a future section...

### 3. Using JSX

- [Exercise Solution](exercises/03.html)
- 💯 Extra Credit
  1. [Interpolate `className` and `children`](exercises/03.extra-1.html)
  2. [Spread props](exercises/03.extra-2.html)

We are introduced to JSX, which is really just syntactic sugar to make working with the React API more intuitive and similar to working with HTML. Using JSX requires Babel to convert the JSX into the plain JavaScript that the browser can actually understand.

The Extra Credit exercises offer a deeper dive into the more fancy stuff we can do with JSX, such as interpolation and spreading variables into a component's props and/or children. Taking a peek at how this JSX compiles into the raw React API using Babel, we can start to appreciate the beauty of the React API with how it organizes the props and the children into its `createElement` method.

### 4. Creating Custom Components

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

### 5. Styling

- [Exercise Solution](exercises/05.js)
- 💯 Extra Credit
  1. [Create a custom component](exercises/05.extra-1.js)
  2. [Accept a size prop to encapsulate styling](exercises/05.extra-2.js)

We learn two different ways to style React components: Defining styles inline using the `style` prop, and defining styles with regular CSS then applying the styles through the `className` prop. With JSX, we see just how closely working with styles is to regular HTML, but here with JSX React offers a bit more flexibility by offering ways to combine styles using interpolation, and then using interpolation to help abstract the implementation details of these styles, as demonstrated in the Extra Credit exercises.

### 6. Forms

- [Exercise Solution](exercises/06.js)
- 💯 Extra Credit
  1. [Using `ref`s](exercises/06.extra-1.js)
  2. [Validate lower-case](exercises/06.extra-2.js)
  3. [Control the input value](exercises/06.extra-3.js)

In this exercise, we learn how React handles forms and what abstractions React provides to help make working with forms easier and also provide additional APIs to interact with forms beyond what we can do with regular DOM APIs and JavaScript.

The Extra Credit exercises introduce some new React APIs that help us manage forms: Using `ref`s as an alternative to get the current value of a certain input, and using state variables to provide additional features to forms such as input validation (and displaying error messages as needed) and even programmatically controlling what kind of values a certain input can have.

### 7. Rendering Arrays

- [Exercise Solution](exercises/07.js)
- 💯 Extra Credit
  1. [Focus Demo](https://react-fundamentals.netlify.app/isolated/final/07.extra-1.js)

We are introduced to an interesting quirk React has with regards to rendering arrays. We learn exactly what the `react-warning-keys` error shown in a previous exercise was for, and why React needs keys to keep track of array elements as they get changed, added, removed, or even shuffled.

As a bonus, the Extra Credit shows a demo of a bug one might encounter when incorrectly setting keys - Without proper keys for React to use to keep track of elements, form inputs lose whatever part is highlighted as the inputs get shuffled around, and the focused element becomes hard to track as the focus does not follow the input as it gets moved to a new position in the array. With a proper setting of keys, this problem pretty much gets eliminated entirely.

## `next` Branch Exercises

### 1. Basic JavaScript-rendered Hello World

- [Exercise Solution](next/01.html)
- 💯 Extra Credit
  1. [Generate the root node](next/01.extra-1.html)

Looks pretty much the exact same as the `main` branch.

### 2. Intro to raw React APIs

- [Exercise Solution](next/02.html)
- 💯 Extra Credit
  1. [Nesting elements](next/02.extra-1.html)
  2. [Deep nesting elements](next/02.extra-2.html)

Again, pretty much the same as the `main` branch but the Extra Credit exercises go a bit more in-depth with nesting elements.

### 3. Using JSX

- [Exercise Solution](next/03.html)
- 💯 Extra Credit
  1. [Interpolate `className` and `children`](next/03.extra-1.html)
  2. [Spread props](next/03.extra-2.html)
  3. [Deep nesting elements with JSX](next/03.extra-3.html)
  4. [Using React Fragments](next/03.extra-4.html)

First two Extra Credit exercises were the same as the `main` branch, and two additional Extra Credit exercises were added to demonstrate the power of JSX.

### 4. Creating Custom Components

- [Exercise Solution](next/04.html)
- 💯 Extra Credit
  1. [Using a custom component with `React.createElement`](next/04.extra-1.html)
  2. [Using a custom component with JSX](next/04.extra-2.html)
  3. [Custom Props](next/04.extra-3.html)

The Extra Credit exercises involving `PropTypes` were removed (because we'll be using TypeScript in these `next` branch workshops to sove pretty much the same issue). Instead we have another Extra Credit exercise where we use custom props to help render the children of a component.

### 5. TypeScript with React

- [Exercise Solution](next/05.tsx)
- 💯 Extra Credit
  1. [Improve autocomplete for the operator string](next/05.extra-1.tsx)
  2. [Derive the operator type from the operations object](next/05.extra-2.tsx)
  3. [Default prop values](next/05.extra-3.tsx)
  4. [Reduce duplication for operation functions](next/05.extra-4.tsx)
  5. [Use a “Constrained Identity Function (CIF)”](next/05.extra-5.tsx)

This is a new exercise that introduces TypeScript for the purposes of the Epic React workshops. We start by learning the basics of TypeScript, from adding simple type annotations to our functions, to exploring some of the capabilities empowered by TypeScript in the Extra Credits such as adding autocomplete for custom types, deriving types from objects, and reducing duplication for type annotations by using Records and Constrained Identity Functions (CIF).

### 6. Styling

- [Exercise Solution](next/06.tsx)
- 💯 Extra Credit
  1. [Create a custom component](next/06.extra-1.tsx)
  2. [Accept a size prop to encapsulate styling](next/06.extra-2.tsx)

We now go back to the rest of the exercises featured in the `main` branch, but this time we use TypeScript to provide type annotations to the custom components that we make. To help with this, we can use the generic types provided by React, and we can even extend these generics with our own custom props as needed via intersection types.

### 7. Forms

- [Exercise Solution](next/07.tsx)
- 💯 Extra Credit
  1. [Using `ref`s](next/07.extra-1.tsx)
  2. [Improve form typing](next/07.extra-2.tsx)
  3. [Control the input value](next/07.extra-3.tsx)

We practice more TypeScript with React by working with forms. We use the different generic types that React provides for working with forms and its inputs/event handlers/etc. We also learn how to improve the typing for forms by extending the generic types and overriding some types to accomodate our custom inputs. This exercise also has a different Extra Credit exercise for controlled form inputs, which demonstrates a couple more generics provided by React for TypeScript.

### 8. Rendering Arrays

- [Exercise Solution](next/08.tsx)
- 💯 Extra Credit
  1. [Adding a key prop](next/08.extra-1.tsx)

This exercise greatly improves from the previous version in the `main` branch. We now implement the code to render the array of items ourselves, and adding the `key` prop is now moved into an Extra Credit exercise with a much more detailed explanation.
