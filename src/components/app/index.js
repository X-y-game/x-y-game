import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Waiting from "../../pages/Waiting";
import InGame from "../../pages/Ingame";
import Channels from "../../pages/Channels/Container";
import Admin from "../../pages/Admin";
import Room from "../../pages/Room";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/channel" component={Channels} />
        <Route path="/channel/:id" component={Room} />
        <Route path="/game/:id" component={InGame} />
        <Route exact path="/waiting" component={Waiting} />
        <Route path="/waiting/:id" component={Waiting} />
      </Switch>
    </BrowserRouter>
  );
}
