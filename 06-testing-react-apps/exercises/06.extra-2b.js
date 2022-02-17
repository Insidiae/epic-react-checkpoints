// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from "react";
import { render, screen, act } from "@testing-library/react";
import { useCurrentPosition } from "react-use-geolocation";
import Location from "../../examples/location";

jest.mock("react-use-geolocation");

let setReturnValue;
function useMockCurrentPosition() {
  const state = React.useState([]);
  setReturnValue = state[1];
  return state[0];
}

afterEach(() => {
  setReturnValue = null;
});

test("displays the users current location", async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

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

// 💯 Add a test for what happens in the event of an error
test("displays error message when geolocation is not supported", async () => {
  const fakeError = new Error(
    "Geolocation is not supported or permission denied"
  );

  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([null, fakeError]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByRole("alert")).toHaveTextContent(fakeError.message);
});
