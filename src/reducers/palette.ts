import {PALETTE_ADD_COLOR, PALETTE_REMOVE_COLOR, PALETTE_UPDATE_COLOR, PaletteActions} from "../actions/palette";
import {GlobalActions, IMPORT_PROJECT} from "../actions";

export type Color = string;

export interface PaletteState {
    [id: number]: Color
}

export const defaultColor = '#000';

const initialState: PaletteState = {
    0: defaultColor
}

export function palette(state = initialState, action: PaletteActions | GlobalActions): PaletteState {
    switch (action.type) {
        case PALETTE_ADD_COLOR:
            return {...state, [action.id]: action.color};
        case PALETTE_REMOVE_COLOR:
            const {[action.id]: toRemove, ...newState} = state;
            return newState;
        case PALETTE_UPDATE_COLOR:
            return {...state, [action.id]: action.color};
        case IMPORT_PROJECT:
            return JSON.parse(JSON.stringify(action.data.palette));
        default:
            return state;
    }
}
