import {Action} from "redux";

export const GENERATOR_SET_ROWS = 'GENERATOR_SET_ROWS';
export const GENERATOR_SET_COLS = 'GENERATOR_SET_COLS';
export const GENERATOR_SET_SELECTOR = 'GENERATOR_SET_SELECTOR';
export const GENERATOR_SET_SELECTOR_PROPERTY = 'GENERATOR_SET_SELECTOR_PROPERTY';

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

export interface SetSelectorAction extends Action<typeof GENERATOR_SET_SELECTOR> {
    selector: string;
}

export function setSelector(selector: string): SetSelectorAction {
    return {
        type: GENERATOR_SET_SELECTOR,
        selector
    }
}

export interface SetSelectorPropertyAction extends Action<typeof GENERATOR_SET_SELECTOR_PROPERTY> {
    prop: string;
    value: any;
}

export function setSelectorProperty(prop: string, value: any): SetSelectorPropertyAction {
    return {
        type: GENERATOR_SET_SELECTOR_PROPERTY,
        prop,
        value
    }
}

export type GeneratorActions = SetRowsAction | SetColsAction | SetSelectorAction | SetSelectorPropertyAction;
