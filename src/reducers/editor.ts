import {SvgShape} from "../models/svg";
import {EDITOR_ADD_SHAPE, EDITOR_SET_GRID, EditorActions} from "../actions/editor";

export interface EditorState {
    elements: SvgShape[];
    gridSize: number;
    selectedIdx: number | null;
}

const initialState: EditorState = {
    elements: [],
    gridSize: 5,
    selectedIdx: null
}

export function editor(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EDITOR_ADD_SHAPE:
            state.elements = [...state.elements, action.shape];
            return state;
        case EDITOR_SET_GRID:
            state.gridSize = action.size;
            return state;
        default:
            return state;
    }
}
