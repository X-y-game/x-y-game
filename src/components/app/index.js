import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Waiting from "../Waiting";
import InGame from "../Ingame";

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/waiting">
        <Waiting />
      </Route>
      <Route exact path="/game">
        <InGame />
      </Route>
    </Switch>
  );
}
