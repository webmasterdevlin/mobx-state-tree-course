import React from "react";
import { Provider, rootStore } from "store";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "components/NavigationBar";
import routes, { renderRoutes } from "./Routes";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <Provider value={rootStore}>
      <CssBaseline>
        <BrowserRouter>
          <>
            <NavigationBar />
            <Container>{renderRoutes(routes)}</Container>
          </>
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  );
};
export default App;
