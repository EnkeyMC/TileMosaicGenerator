import {SvgShape} from "../models/svg";
import {
    EDITOR_ADD_SHAPE,
    EDITOR_SELECT_SHAPE,
    EDITOR_SELECT_TOOL,
    EDITOR_SET_GRID,
    EditorActions
} from "../actions/editor";
import {Tools} from "../editor-tools";


export interface EditorState {
    elements: SvgShape[];
    gridSize: number;
    selectedTool: Tools;
    selectedIdx?: number;
}

const initialState: EditorState = {
    elements: [],
    gridSize: 5,
    selectedTool: Tools.SELECT
}

export function editor(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EDITOR_ADD_SHAPE:
            const elements = [...state.elements, action.shape];
            return {...state, elements};
        case EDITOR_SET_GRID:
            return {...state, gridSize: action.size};
        case EDITOR_SELECT_SHAPE:
            return {...state, selectedIdx: action.idx};
        case EDITOR_SELECT_TOOL:
            return {...state, selectedTool: action.tool};
        default:
            return state;
    }
}
