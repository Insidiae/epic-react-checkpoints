// mocking Browser APIs and modules
// http://localhost:3000/location

import { render, screen, act } from "@testing-library/react";
import React from "react";
// 💯 Import the react-use-geolocation module
import { useCurrentPosition } from "react-use-geolocation";
// 🦺 to keep TypeScript happy here, I recommend you use ts-jest/utils
// which is already installed.
import { mocked } from "ts-jest/utils";
import Location from "../../examples/location";

// 💯 Try to mock the module rather than the browser API it's using
jest.mock("react-use-geolocation");
const mockedUseCurrentPosition = mocked(useCurrentPosition);

// 💯 Since we're mocking the module, we won't be needing these
// 💥 const mockedGeolocation = {
// 💥   getCurrentPosition: jest.fn(),
// 💥 }

// 💥 beforeAll(() => {
// 💥   Object.defineProperty(window.navigator, 'geolocation', {
// 💥     value: mockedGeolocation,
// 💥   })
// 💥 })

// 💥 function deferred() {
// 💥   let resolve: (value?: unknown) => void, reject: (reason?: unknown) => void
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

  // 💥 mockedGeolocation.getCurrentPosition.mockImplementation(successCallback => {
  // 💥   promise.then(() => successCallback(fakePosition))
  // 💥 })

  // 💯 Mock the implementation of the useCurrentPosition hook
  // 💰 tip, you're mocking a hook. Your mock implementation can also be a hook
  // (so you can use `React.useState`!).
  type CurrentPositionReturn = ReturnType<typeof useCurrentPosition>;
  let setReturnValue: React.Dispatch<
    React.SetStateAction<CurrentPositionReturn>
  >;
  function useMockCurrentPosition() {
    const state = React.useState<CurrentPositionReturn>([undefined, undefined]);
    setReturnValue = state[1];
    return state[0];
  }

  mockedUseCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  // 💯 Resolve the mocked current position
  // resolve()

  // await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  act(() => {
    setReturnValue([fakePosition, undefined]);
  });

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`
  );
});

// 💯 Remember to mock the module for this test as well!
test("displays error message when geolocation is not supported", async () => {
  const fakeError = new Error(
    "Geolocation is not supported or permission denied"
  );
  // const {promise, reject} = deferred()

  // mockedGeolocation.getCurrentPosition.mockImplementation(
  //   (successCallback, errorCallback) => {
  //     promise.catch(() => errorCallback(fakeError))
  //   },
  // )
  type CurrentPositionReturn = ReturnType<typeof useCurrentPosition>;
  let setReturnValue: React.Dispatch<
    React.SetStateAction<CurrentPositionReturn>
  >;
  function useMockCurrentPosition() {
    const state = React.useState<CurrentPositionReturn>([undefined, undefined]);
    setReturnValue = state[1];
    return state[0];
  }
  mockedUseCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  // reject()

  // await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  act(() => {
    setReturnValue([undefined, fakeError]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByRole("alert")).toHaveTextContent(fakeError.message);
});
