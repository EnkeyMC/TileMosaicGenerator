import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TileEditor from "./pages/TileEditor";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
            <TileEditor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
