import {SvgShape} from "../models/svg";
import {
    EDITOR_ADD_SHAPE, EDITOR_CLEAR, EDITOR_DELETE_ELEMENT, EDITOR_ELEM_PROP_CHANGE,
    EDITOR_SELECT_SHAPE,
    EDITOR_SELECT_TOOL, EDITOR_SET_ELEMENTS,
    EDITOR_SET_GRID,
    EditorActions
} from "../actions/editor";
import {Tools} from "../editor-tools";


export interface EditorState {
    elements: SvgShape[];
    gridSize: number;
    selectedTool: Tools;
    selectedIdx: number | null;
}

const initialState: EditorState = {
    elements: [],
    gridSize: 5,
    selectedTool: Tools.SELECT,
    selectedIdx: null,
}

export function editor(state = initialState, action: EditorActions): EditorState {
    switch (action.type) {
        case EDITOR_ADD_SHAPE:
            const newSelected = state.elements.length;
            const elements = [...state.elements, action.shape];
            return {...state, elements, selectedIdx: newSelected};
        case EDITOR_SET_GRID:
            return {...state, gridSize: action.size};
        case EDITOR_SELECT_SHAPE:
            return {...state, selectedIdx: action.idx};
        case EDITOR_SELECT_TOOL:
            return {...state, selectedTool: action.tool};
        case EDITOR_ELEM_PROP_CHANGE:
            return {...state, elements: state.elements.map(
                (s, i) => i === action.elemIdx ? {...s, [action.propName]: action.value} : s
            )}
        case EDITOR_SET_ELEMENTS:
            const newSelectedIdx = state.selectedIdx !== null
                ?
                action.elements.findIndex(el => el.id === state.elements[state.selectedIdx ?? 0].id)
                :
                null;
            return {...state, elements: action.elements, selectedIdx: newSelectedIdx};
        case EDITOR_DELETE_ELEMENT:
            return {...state, elements: state.elements.filter(el => el.id !== action.id)};
        case EDITOR_CLEAR:
            return initialState;
        default:
            return state;
    }
}
