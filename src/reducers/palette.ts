import {PaletteActions} from "../actions/palette";

export type Color = string;

export interface PaletteState {
    [id: number]: Color
}

export const defaultColor = '#000';

const initialState: PaletteState = {
    0: defaultColor
}

export const nextId = (() => {
    let lastId = 0;
    return () => ++lastId;
})();

export function palette(state = initialState, action: PaletteActions): PaletteState {
    switch (action.type) {
        case "PALETTE_ADD_COLOR":
            return {...state, [action.id]: action.color};
        case "PALETTE_REMOVE_COLOR":
            const {[action.id]: toRemove, ...newState} = state;
            return newState;
        case "PALETTE_UPDATE_COLOR":
            return {...state, [action.id]: action.color};
        default:
            return state;
    }
}
