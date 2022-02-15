import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Waiting from "../../pages/Waiting";
import InGame from "../../pages/Ingame";
import Channel from "../../pages/Channel";
import Admin from "../../pages/Admin";
import Room from "../../pages/Room";
import Spinner from "../Spinner";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/channel" component={Channel} />
        <Route path="/channel/:id" component={Room} />
        <Route path="/game/:id" component={InGame} />
        <Route exact path="/waiting" component={Waiting} />
        <Route path="/waiting/:id" component={Waiting} />
        <Route exact path="/test" component={Spinner} />
      </Switch>
    </BrowserRouter>
  );
}
