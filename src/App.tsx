import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import TileEditor from "./pages/TileEditor";
import Generator from "./pages/Generator";
import Tiles from "./pages/Tiles";
import Reorder from "./pages/Tiles/Reorder";
import Import from "./pages/Import";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/tiles/new">
          <TileEditor />
        </Route>
        <Route path="/tiles/reorder">
          <Reorder />
        </Route>
        <Route path="/tiles/:id">
            <TileEditor />
        </Route>
        <Route path="/tiles">
            <Tiles />
        </Route>
        <Route path="/import">
          <Import />
        </Route>
        <Route path="/">
            <Generator />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
