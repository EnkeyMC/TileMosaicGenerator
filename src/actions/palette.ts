import {Action} from "redux";
import {Color} from "../reducers/palette";

export const PALETTE_ADD_COLOR = 'PALETTE_ADD_COLOR';
export const PALETTE_REMOVE_COLOR = 'PALETTE_REMOVE_COLOR';
export const PALETTE_UPDATE_COLOR = 'PALETTE_UPDATE_COLOR';

export interface AddColorAction extends Action<typeof PALETTE_ADD_COLOR> {
    id: number;
    color: Color;
}

export function addColor(id: number, color: Color): AddColorAction {
    return {
        type: PALETTE_ADD_COLOR,
        id,
        color
    }
}

export interface RemoveColorAction extends Action<typeof PALETTE_REMOVE_COLOR> {
    id: number;
}

export function removeColor(id: number): RemoveColorAction {
    return {
        type: PALETTE_REMOVE_COLOR,
        id
    }
}

export interface UpdateColorAction extends Action<typeof PALETTE_UPDATE_COLOR> {
    id: number;
    color: Color;
}

export function updateColor(id: number, color: Color): UpdateColorAction {
    return {
        type: PALETTE_UPDATE_COLOR,
        id,
        color
    }
}

export type PaletteActions = AddColorAction | RemoveColorAction | UpdateColorAction;
