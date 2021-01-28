import {GENERATOR_SET_COLS, GENERATOR_SET_ROWS, GeneratorActions} from "../actions/generator";

export interface GeneratorState {
    rows: number;
    cols: number;
}

export const initialState: GeneratorState = {
    rows: 17,
    cols: 17,
}

export function generator(state: GeneratorState = initialState, action: GeneratorActions): GeneratorState {
    switch (action.type) {
        case GENERATOR_SET_ROWS:
            return {...state, rows: action.rows};
        case GENERATOR_SET_COLS:
            return {...state, cols: action.cols};
        default:
            return state;
    }
}
