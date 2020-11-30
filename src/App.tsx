import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TileEditor from "./pages/TileEditor";
import Generator from "./pages/Generator";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/tile-editor">
            <TileEditor />
        </Route>
        <Route path="/">
            <Generator />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
