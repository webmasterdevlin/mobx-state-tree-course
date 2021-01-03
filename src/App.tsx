import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "routes";
import HeaderNav from "components/HeaderNav";
import { Provider, rootStore } from "store";

const App = () => (
  <Provider value={rootStore}>
    <BrowserRouter>
      <>
        <HeaderNav />
        <div className="container">
          <div className="vertical-center">
            <Routes />
          </div>
        </div>
      </>
    </BrowserRouter>
  </Provider>
);

export default App;
