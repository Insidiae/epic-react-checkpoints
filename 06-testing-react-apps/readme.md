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
