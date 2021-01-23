import {combineReducers, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {editor} from "./editor";
import {palette} from "./palette";

const rootReducer = combineReducers({
    editor,
    palette
});

const store = createStore(rootReducer,
    composeWithDevTools()
);

export type TheState = ReturnType<typeof rootReducer>

export default store;
