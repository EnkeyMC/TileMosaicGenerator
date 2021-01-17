import {combineReducers, createStore} from "redux";
import {editor} from "./editor";

const rootReducer = combineReducers({
    editor
});

const store = createStore(rootReducer);

export type TheState = ReturnType<typeof rootReducer>

export default store;
