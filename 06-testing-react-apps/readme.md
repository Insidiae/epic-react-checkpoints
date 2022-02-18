# Testing React Apps 🧐

## Exercises

### 1. Simple test with ReactDOM

- [Exercise Solution](exercises/01.js)
- 💯 Extra Credit
  1. [Use dispatchEvent](exercises/01.extra-1.js)

We go through the basics of testing React elements. First, we manually render the element via ReactDOM, select the elements that are relevant for our tests, fire off events to mimic how a user might interact with the component we are testing (such as button clicks), then assert the changes we expect to happen (such as checking whether we display the correct text after firing off the events we did earlier). Finally, we also are reminded to clean up the DOM after each test so as to not interfere with other tests.

### 2. Simple test with React Testing Library

- [Exercise Solution](exercises/02.js)
- 💯 Extra Credit
  1. [Use @testing-library/jest-dom](exercises/02.extra-1.js)

Building off the first example, we now use React Testing Library to have a much nicer and simpler API for our tests. A bunch of our setup code from the first example can now be removed because React Testing Library already does it for us under the hood!

### 3. Avoid implementation details

- [Exercise Solution](exercises/03.js)
- 💯 Extra Credit
  1. [Use userEvent](exercises/03.extra-1.js)

We do some more refactors from the previous example by making sure our tests are resilient enough and not care about implementation details (such as how the React component is structured, for example, or even miniscule details like capitalizations).

To help avoid testing implementation details, React Testing Library provides us some useful methods such as `screen` queries to accurately get the relevant components, and `userEvent` to better mimic the actual browser events that the average user would fire off when interacting with the component we are testing.

### 4. Form testing

- [Exercise Solution](exercises/04.js)
- 💯 Extra Credit
  1. [Use a jest mock function](exercises/04.extra-1.js)
  2. [Generate test data](exercises/04.extra-2.js)
  3. [Allow for overrides](exercises/04.extra-3.js)
  4. [Use Test Data Bot](exercises/04.extra-4.js)

This exercise demonstrates the basic workflow for testing form components. We are also introduced to Jest mock functions (also called _spies_), which lets us track how the form's submit handler is called without needing to know the actual implementation of the submit handler.

The Extra Credit exercises also emphasizes some communication etiquettes when writing these kinds of tests, and further emphasizes moving away from implementation details by generating random data for the form input fields if the test shouldn't actually care about the fields having some specific values, and allowing overrides for the function that generates our input data whenever we might want to add our own constraints or even have specific values for certain inputs.

### 5. Mocking HTTP requests

- [Exercise Solution](exercises/05.js)
- 💯 Extra Credit
  1. [Reuse server request handlers](exercises/05.extra-1.js)
  2. [Test the unhappy path](exercises/05.extra-2.js)
  3. [Use inline snapshots for error messages](exercises/05.extra-3.js)
  4. [Use one-off server handlers](exercises/05.extra-4.js)

We are introduced to MSW, which is a tool for mocking server responses so we can test that our code properly interacts with the backend. With MSW, we can even setup a mock server and reuse the same setup for development and testing.

We also test that our components display a proper error message when something goes wrong with the request (i.e. invalid inputs, unexpected server errors, etc.). We also make use of snapshot testing to avoid testing the implementation detail of the error message's text content, and instead simply compare it with an automatically generated snapshot provided by Jest.

We also test unexpected server errors by using a custom one-off server handler that is only used by our test, and then simply test the error message that gets thrown by the custom handler.

### 6. Mocking Browser APIs and modules

- [Exercise Solution](exercises/06.js)
- 💯 Extra Credit
  1. [Mock the module](exercises/06.extra-1.js)
  2. Test the unhappy path
     - [Function mocking approach](exercises/06.extra-2a.js)
     - [Module mocking approach](exercises/06.extra-2b.js)

In this exercise, we learned the limitations of the jsdom API that our tests use, and so we have to mock the implementation of some browser APIs that are not available with jsdom.

We also work with two different approaches for mocking these kinds of APIs. The first is to directly mock the browser API that will be used by our tests via `jest.fn`, and then adding a mock implementation via `mockFn.mockImplementation` that provides the outputs that our tests expect. Alternatively, we can mock the module that uses the browser API via `jest.mock`, then use `mockFn.mockImplementation` to provide the same expected outputs.

### 7. Testing with context and a custom render method

- [Exercise Solution](exercises/07.js)
- 💯 Extra Credit
  1. [Add a test for the dark theme](exercises/07.extra-1.js)
  2. [Create a custom render method](exercises/07.extra-2.js)
  3. [Swap @testing-library/react with app test utils](exercises/07.extra-3.js)

This is a short and sweet exercise. We basically just extend React Testing Library's `render` method to include a `wrapper` option with a component that contains all of our context providers so we won't have to redeclare them every time we want to render components that consume from those providers. We can also provide additional options to the wrapper component so we can pass along additional props (such as initial values) to the context providers. As a bonus, we can even move this custom render method into a separate file which we can reuse for other tests that make use of the same context providers!

### 8. Testing custom hooks

- [Exercise Solution](exercises/08.js)
- 💯 Extra Credit
  1. [Fake component](exercises/08.extra-1.js)
  2. [Setup function](exercises/08.extra-2.js)
  3. [Using react-hooks testing library](exercises/08.extra-3.js)

This exercise explores some different options for testing custom React Hooks.

For most custom React Hooks that we write ourselves, the best way to test these hooks would be to test the components that use these hooks. That would usually give us 100% coverage if the component fully utilizes the hooks. Alternatively, we can also create an example component for testing purposes that just uses the hook, and test that example component instead.

For more complex hooks, usually for highly reusable hooks and/or hooks that are part of a popular open-source library, it might be a good idea to setup some fake component that gets the values returned by the hook, which we can then test directly just like a regular function return values (note that we'll have to wrap the state changing calls in `act` if we do this approach).

When testing hooks this way, we might also want to abstract the common logic (such as getting the hook's return values) into a reusable `setup` function. We can the use that `setup` function in multiple different tests to account for different edge cases for the hook.

The Testing Library team actually recognizes this pattern, and so they provided us these testing utilities via `react-hooks-testing-library` that work similar to our `setup` function to let us test our react hooks using this approach while maintaining best practices!

## `next` Branch Exercises

### 1. Simple test with ReactDOM

- [Exercise Solution](next/01.tsx)
- 💯 Extra Credit
  1. [Use dispatchEvent](next/01.extra-1.tsx)

Pretty much the same as the `main` branch counterpart, though TypeScript is a bit stricter when dealing with DOM nodes like we do in this exercise.

### 2. Simple test with React Testing Library

- [Exercise Solution](next/02.tsx)
- 💯 Extra Credit
  1. [Use @testing-library/jest-dom](next/02.extra-1.tsx)

Again, pretty much the same as the `main` branch counterpart.

### 3. Avoid implementation details

- [Exercise Solution](next/03.tsx)
- 💯 Extra Credit
  1. [Use userEvent](next/03.extra-1.tsx)

Yep, still exactly the same as the `main` branch counterpart.

### 4. Form testing

- [Exercise Solution](next/04.tsx)
- 💯 Extra Credit
  1. [Use a jest mock function](next/04.extra-1.tsx)
  2. [Generate test data](next/04.extra-2.tsx)
  3. [Allow for overrides](next/04.extra-3.tsx)
  4. [Use Test Data Bot](next/04.extra-4.tsx)

Same as the `main` branch counterpart, though now we can use TypeScript annotations for better type safety.

### 5. Mocking HTTP requests

- [Exercise Solution](next/05.tsx)
- 💯 Extra Credit
  1. [Reuse server request handlers](next/05.extra-1.tsx)
  2. [Test the unhappy path](next/05.extra-2.tsx)
  3. [Use inline snapshots for error messages](next/05.extra-3.tsx)
  4. [Use one-off server handlers](next/05.extra-4.tsx)

Still the same as the `main` branch counterpart 😅

### 6. Mocking Browser APIs and modules

- [Exercise Solution](next/06.tsx)
- 💯 Extra Credit
  1. [Test the unhappy path](next/06.extra-1.tsx)
  2. [Mock the module](next/06.extra-2.tsx)

Same concepts as the `main` branch counterpart, but the Extra Credit exercises swapped positions so we don't need two different files for the `Test the unhappy path` test. I can also use the new Extra Credit 2 as a basis to fix up [my alternate implementation](exercises/06.extra-2b.js) for the main branch Extra Credit as well!

### 7. Testing with context and a custom render method

- [Exercise Solution](next/07.tsx)
- 💯 Extra Credit
  1. [Add a test for the dark theme](next/07.extra-1.tsx)
  2. [Create a custom render method](next/07.extra-2.tsx)
  3. [Swap @testing-library/react with app test utils](next/07.extra-3.tsx)

Again, pretty much the same as the `main` branch counterpart.
