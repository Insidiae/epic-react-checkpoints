// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from "react";
// 💯 Swap your import of `@testing-library/react` with `test/test-utils`
import { render, screen } from "test/test-utils";
// import {ThemeProvider} from '../../components/theme'
import EasyButton from "../../components/easy-button";

// 💯 Remove this in favor of the custom render method from `test/test-utils`
// function renderWithProviders(ui, {theme = 'light', ...options} = {}) {
//   function Wrapper({children}) {
//     return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
//   }

//   return render(ui, {wrapper: Wrapper, ...options})
// }

test("renders with the light styles for the light theme", () => {
  // 💯 Use the custom render method from `test/test-utils`
  // renderWithProviders(<EasyButton>Easy</EasyButton>)
  render(<EasyButton>Easy</EasyButton>);

  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `);
});

test("renders with the dark styles for the dark theme", () => {
  // renderWithProviders(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  render(<EasyButton>Easy</EasyButton>, { theme: "dark" });

  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `);
});
