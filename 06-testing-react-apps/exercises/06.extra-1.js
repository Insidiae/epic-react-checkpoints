// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from "react";
import { render, screen, act } from "@testing-library/react";
// 💯 Import the react-use-geolocation module
import { useCurrentPosition } from "react-use-geolocation";
import Location from "../../examples/location";

// 💯 Try to mock the module rather than the browser API it's using
jest.mock("react-use-geolocation");

// 💯 Since we're mocking the module, we won't be needing these
// 💥 beforeAll(() => {
// 💥   window.navigator.geolocation = {
// 💥     getCurrentPosition: jest.fn(),
// 💥   }
// 💥 })

// 💥 function deferred() {
// 💥   let resolve, reject
// 💥   const promise = new Promise((res, rej) => {
// 💥     resolve = res
// 💥     reject = rej
// 💥   })
// 💥   return {promise, resolve, reject}
// 💥 }

test("displays the users current location", async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  // 💯 We won't be needing these as well
  // 💥 const {promise, resolve} = deferred()

  // 💥 window.navigator.geolocation.getCurrentPosition.mockImplementation(
  // 💥   callback => {
  // 💥     promise.then(() => callback(fakePosition))
  // 💥   },
  // 💥 )

  // 💯 Mock the implementation of the useCurrentPosition hook
  // 💰 tip, you're mocking a hook. Your mock implementation can also be a hook
  // (so you can use `React.useState`!).
  let setReturnValue;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  // 💯 Resolve the mocked current position
  // await act(async () => {
  //   resolve()
  //   await promise
  // })
  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});
