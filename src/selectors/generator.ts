import {TheState} from "../reducers";

export const rowsSelector = (state: TheState): number => state.generator.rows;
export const colsSelector = (state: TheState): number => state.generator.cols;
export const tileSelectorKeySelector = (state: TheState): string => state.generator.tileSelector;
export const tileSelectorPropertiesSelector = (state: TheState): any => state.generator.tileSelectorProperties;
export const backgroundColorIdSelector = (state: TheState): null | number => state.generator.backgroundColorId;
