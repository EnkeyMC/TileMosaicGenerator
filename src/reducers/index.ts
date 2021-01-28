import {combineReducers, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {editor} from "./editor";
import {palette} from "./palette";
import {tiles} from "./tiles";
import {generator} from "./generator";

const rootReducer = combineReducers({
    editor,
    palette,
    tiles,
    generator
});

const store = createStore(rootReducer,
    composeWithDevTools()
);

export type TheState = ReturnType<typeof rootReducer>

export default store;
