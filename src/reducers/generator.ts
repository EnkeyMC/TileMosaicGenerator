import {
    GENERATOR_SET_BACKGROUND,
    GENERATOR_SET_COLS,
    GENERATOR_SET_ROWS,
    GENERATOR_SET_SELECTOR,
    GENERATOR_SET_SELECTOR_PROPERTY,
    GeneratorActions
} from "../actions/generator";
import {LinearSelector} from "../generators/selectors";
import {varToString} from "../utils";
import {getTileSelectorByName} from "../generators";
import {GlobalActions, IMPORT_PROJECT} from "../actions";

export interface GeneratorState {
    rows: number;
    cols: number;
    tileSelector: string;
    tileSelectorProperties: any;
    backgroundColorId: number | null;
}

export const initialState: GeneratorState = {
    rows: 17,
    cols: 17,
    tileSelector: varToString({LinearSelector}),
    tileSelectorProperties: LinearSelector.defaultProperties,
    backgroundColorId: null,
}

export function generator(state: GeneratorState = initialState, action: GeneratorActions | GlobalActions): GeneratorState {
    switch (action.type) {
        case GENERATOR_SET_ROWS:
            return {...state, rows: action.rows};
        case GENERATOR_SET_COLS:
            return {...state, cols: action.cols};
        case GENERATOR_SET_SELECTOR:
            return {...state,
                tileSelector: action.selector,
                tileSelectorProperties: getTileSelectorByName(action.selector).defaultProperties
            };
        case GENERATOR_SET_SELECTOR_PROPERTY:
            return {
                ...state,
                tileSelectorProperties: {
                    ...state.tileSelectorProperties,
                    [action.prop]: action.value
                }
            }
        case IMPORT_PROJECT:
            return JSON.parse(JSON.stringify(action.data.generator));
        case GENERATOR_SET_BACKGROUND:
            return {...state, backgroundColorId: action.backgroundColorId};
        default:
            return state;
    }
}
