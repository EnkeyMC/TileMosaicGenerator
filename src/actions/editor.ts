import {SvgShape} from "../models/svg";
import {Action} from "redux";
import {Tools} from "../editor-tools";

export const EDITOR_ADD_SHAPE = 'EDITOR_ADD_SHAPE';
export const EDITOR_SET_GRID = 'EDITOR_SET_GRID';
export const EDITOR_SELECT_SHAPE = 'EDITOR_SELECT_SHAPE';
export const EDITOR_SELECT_TOOL = 'EDITOR_SELECT_TOOL';
export const EDITOR_ELEM_PROP_CHANGE = 'EDITOR_ELEM_PROP_CHANGE';

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
    idx: number | null;
}

export function selectShape(idx: number | null): SelectShapeAction {
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

export interface ElemPropChangeAction extends Action<typeof EDITOR_ELEM_PROP_CHANGE> {
    elemIdx: number;
    propName: string;
    value: any;
}

export function elemPropChange(elemIdx: number, propName: string, value: any) {
    return {
        type: EDITOR_ELEM_PROP_CHANGE,
        elemIdx,
        propName,
        value
    }
}

export type EditorActions = AddShapeAction | SetGridAction | SelectShapeAction | SelectToolAction | ElemPropChangeAction;
