import React from "react";
import { render as rtlRender } from "@testing-library/react";


import { Provider, rootStore } from "store";

function render(
  ui,
  {
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
      return <Provider value={rootStore}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
