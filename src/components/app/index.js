import React from "react";
import { Switch, Route } from "react-router-dom";
import GlobalStyle from "../../styles/GlobalStyle";
import Home from "../Home";

export default function App() {
  return (
    <Switch>
      <GlobalStyle />
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}
