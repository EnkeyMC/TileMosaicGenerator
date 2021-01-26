import {combineReducers, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {editor} from "./editor";
import {palette} from "./palette";
import {tiles} from "./tiles";

const rootReducer = combineReducers({
    editor,
    palette,
    tiles,
});

const store = createStore(rootReducer,
    composeWithDevTools()
);

export type TheState = ReturnType<typeof rootReducer>

export default store;
