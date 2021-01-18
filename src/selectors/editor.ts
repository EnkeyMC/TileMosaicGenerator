import {TheState} from "../reducers";
import {SvgShape} from "../models/svg";
import {Tools} from "../editor-tools";

export const gridSizeSelector = (state: TheState): number => state.editor.gridSize;
export const elementsSelector = (state: TheState): SvgShape[] => state.editor.elements;
export const toolSelector = (state: TheState): Tools => state.editor.selectedTool;
