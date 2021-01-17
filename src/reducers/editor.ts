import {Action} from "redux";
import {SvgShape} from "../models/svg";

export interface EditorState {
    elements: SvgShape[];
    gridSize: number;
    selectedIdx: number;
}

export function editor(state = {}, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}
