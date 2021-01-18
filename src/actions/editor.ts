import {SvgShape} from "../models/svg";
import {Action} from "redux";
import {Tools} from "../editor-tools";

export const EDITOR_ADD_SHAPE = 'EDITOR_ADD_SHAPE';
export const EDITOR_SET_GRID = 'EDITOR_SET_GRID';
export const EDITOR_SELECT_SHAPE = 'EDITOR_SELECT_SHAPE';
export const EDITOR_SELECT_TOOL = 'EDITOR_SELECT_TOOL';

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

export interface SelectShapeAction extends Action<typeof EDITOR_SELECT_SHAPE> {
    idx: number;
}

export function selectShape(idx: number): SelectShapeAction {
    return {
        type: EDITOR_SELECT_SHAPE,
        idx
    }
}

export interface SelectToolAction extends Action<typeof EDITOR_SELECT_TOOL> {
    tool: Tools
}

export function selectTool(tool: Tools): SelectToolAction {
    return {
        type: EDITOR_SELECT_TOOL,
        tool
    }
}

export type EditorActions = AddShapeAction | SetGridAction | SelectShapeAction | SelectToolAction;
