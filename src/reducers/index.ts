import {combineReducers, createStore} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {editor} from "./editor";

const rootReducer = combineReducers({
    editor
});

const store = createStore(rootReducer,
    composeWithDevTools()
);

export type TheState = ReturnType<typeof rootReducer>

export default store;
