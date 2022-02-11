import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Waiting from "../../pages/Waiting";
import InGame from "../../pages/Ingame";
import Channel from "../../pages/Channel";
import Room from "../../pages/Room";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/lobby" component={Channel} />
        <Route path="/lobby/:id" component={Room} />
        <Route path="/waiting/:id" component={Waiting} />
        <Route exact path="/game" component={InGame} />
      </Switch>
    </BrowserRouter>
  );
}
