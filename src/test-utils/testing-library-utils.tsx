import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider, rootStore } from "store";
import { BrowserRouter } from "react-router-dom";

import HeaderNav from "../components/HeaderNav";

const render = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider value={rootStore}>
      <BrowserRouter>
        <>
          <HeaderNav />
          <div className="container">
            <div className="vertical-center">{children}</div>
          </div>
        </>
      </BrowserRouter>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
