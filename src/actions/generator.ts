import {Action} from "redux";

export const GENERATOR_SET_ROWS = 'GENERATOR_SET_ROWS';
export const GENERATOR_SET_COLS = 'GENERATOR_SET_COLS';

export interface SetRowsAction extends Action<typeof GENERATOR_SET_ROWS> {
    rows: number;
}

export function setRows(rows: number): SetRowsAction {
    return {
        type: GENERATOR_SET_ROWS,
        rows
    }
}

export interface SetColsAction extends Action<typeof GENERATOR_SET_COLS> {
    cols: number;
}

export function setCols(cols: number): SetColsAction {
    return {
        type: GENERATOR_SET_COLS,
        cols
    }
}

export type GeneratorActions = SetRowsAction | SetColsAction;
