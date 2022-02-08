import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Waiting from "../Waiting";
import InGame from "../Ingame";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/waiting" component={Waiting} />
        <Route exact path="/game" component={InGame} />
      </Switch>
    </BrowserRouter>
  );
}
