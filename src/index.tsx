import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider, StoreProvider } from "context";

ReactDOM.render(
  <StoreProvider>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </StoreProvider>,
  document.getElementById("root")
);
