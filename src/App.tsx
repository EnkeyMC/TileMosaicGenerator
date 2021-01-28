import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TileEditor from "./pages/TileEditor";
import Generator from "./pages/Generator";
import Tiles from "./pages/Tiles";
import Reorder from "./pages/Tiles/Reorder";

function App() {
  return (
    <Router basename={'/TileMosaicGenerator'}>
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
        <Route path="/">
            <Generator />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
