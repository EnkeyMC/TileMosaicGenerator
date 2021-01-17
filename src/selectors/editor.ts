import {TheState} from "../reducers";
import {SvgShape} from "../models/svg";

export const gridSizeSelector = (state: TheState): number => state.editor.gridSize;
export const elementsSelector = (state: TheState): SvgShape[] => state.editor.elements;
