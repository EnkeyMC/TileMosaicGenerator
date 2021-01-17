import {SvgShape} from "../models/svg";
import {Action} from "redux";

export const EDITOR_ADD_SHAPE = 'EDITOR_ADD_SHAPE';
export const EDITOR_SET_GRID = 'EDITOR_SET_GRID';

export interface AddShapeAction extends Action<typeof EDITOR_ADD_SHAPE> {
    shape: SvgShape
}

export function addShape(shape: SvgShape): AddShapeAction {
    return {
        type: EDITOR_ADD_SHAPE,
        shape
    }
}

export interface SetGridAction extends Action<typeof EDITOR_SET_GRID> {
    size: number;
}

export function setGrid(size: number): SetGridAction {
    return {
        type: EDITOR_SET_GRID,
        size
    }
}

export type EditorActions = AddShapeAction | SetGridAction;
