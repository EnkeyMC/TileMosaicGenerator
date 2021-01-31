import React from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom';
import TileEditor from "./pages/TileEditor";
import Generator from "./pages/Generator";
import Tiles from "./pages/Tiles";
import Reorder from "./pages/Tiles/Reorder";
import Import from "./pages/Import";
import Help from "./pages/Help";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/tiles/new">
                    <ErrorBoundary>
                        <TileEditor />
                    </ErrorBoundary>
                </Route>
                <Route path="/tiles/reorder">
                    <ErrorBoundary>
                        <Reorder />
                    </ErrorBoundary>
                </Route>
                <Route path="/tiles/:id">
                    <ErrorBoundary>
                        <TileEditor />
                    </ErrorBoundary>
                </Route>
                <Route path="/tiles">
                    <ErrorBoundary>
                        <Tiles />
                    </ErrorBoundary>
                </Route>
                <Route path="/import">
                    <ErrorBoundary>
                        <Import />
                    </ErrorBoundary>
                </Route>
                <Route path="/help">
                    <ErrorBoundary>
                        <Help />
                    </ErrorBoundary>
                </Route>
                <Route path="/">
                    <ErrorBoundary>
                        <Generator />
                    </ErrorBoundary>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default App;
