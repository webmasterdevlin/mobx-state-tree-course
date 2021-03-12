import React from "react";
import { Provider, rootStore } from "store";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import NavigationBar from "../components/NavigationBar";

const render = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => (
    <Provider value={rootStore}>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>{children}</Container>
          </>
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
