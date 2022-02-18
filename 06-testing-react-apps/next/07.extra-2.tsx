// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from "react";
import { render, screen } from "@testing-library/react";
// 🦺 You'll want the RenderOptions type from `@testing-library/react`
import type { RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "../../components/theme";
// 🦺 `ThemeProvider` also includes a `Theme` type. You might want that as well!
import type { Theme } from "../../components/theme";
import EasyButton from "../../components/easy-button";

// 💯 Create a custom render method that encapsulates the shared wrapper logic.
// It'll need to accept an option for the `theme` (dark or light).
function renderWithProviders(
  ui: React.ReactElement,
  { theme = "light", ...options }: RenderOptions & { theme?: Theme } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>;
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

test("renders with the light styles for the light theme", () => {
  // 💯 Use the custom render method to remove the duplicated logic
  // function Wrapper({children}: {children: React.ReactNode}) {
  //   return <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  // }
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderWithProviders(<EasyButton>Easy</EasyButton>);
  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `);
});

test("renders with the dark styles for the dark theme", () => {
  // function Wrapper({children}: {children: React.ReactNode}) {
  //   return <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  // }
  // render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  renderWithProviders(<EasyButton>Easy</EasyButton>, { theme: "dark" });
  const button = screen.getByRole("button", { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `);
});
