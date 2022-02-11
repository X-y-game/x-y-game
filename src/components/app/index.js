import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import Waiting from "../../pages/Waiting";
import InGame from "../../pages/Ingame";
import Channel from "../../pages/Channel";
import Admin from "../../pages/Admin/admin";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={Admin} />
        <Route path="/lobby" component={Channel} />
        <Route path="/waiting" component={Waiting} />
        <Route path="/game" component={InGame} />
      </Switch>
    </BrowserRouter>
  );
}
