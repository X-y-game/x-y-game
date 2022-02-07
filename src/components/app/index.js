import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import Game from "../../pages/Ingame/ingame";
import WaitingRoom from "../../pages/Ingame/waiting";

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/waiting">
        <WaitingRoom />
      </Route>
      <Route exact path="/game">
        <Game />
      </Route>
    </Switch>
  );
}
