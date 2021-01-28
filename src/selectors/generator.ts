import {TheState} from "../reducers";

export const rowsSelector = (state: TheState): number => state.generator.rows;
export const colsSelector = (state: TheState): number => state.generator.cols;
