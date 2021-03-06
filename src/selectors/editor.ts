import {TheState} from "../reducers";
import {SvgShape} from "../models/svg";
import {Tools} from "../editor-tools";

export const gridSizeSelector = (state: TheState): number => state.editor.gridSize;
export const elementsSelector = (state: TheState): SvgShape[] => state.editor.elements;
export const toolSelector = (state: TheState): Tools => state.editor.selectedTool;
export const selectedIdxSelector = (state: TheState): number | null => state.editor.selectedIdx;
export const shapeSelector = (idx: number) => (state: TheState): SvgShape => state.editor.elements[idx];
export const elementPropertySelector = (idx: number, prop: string) => (state: TheState): any => state.editor.elements[idx][prop];
