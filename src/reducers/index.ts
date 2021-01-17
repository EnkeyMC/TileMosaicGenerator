import {combineReducers, createStore} from "redux";
import {editor} from "./editor";

const store = createStore(combineReducers({
    editor
}));

export default store;
