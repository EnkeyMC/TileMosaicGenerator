import {TheState} from "../reducers";
import {PaletteState} from "../reducers/palette";

export const colorSelector = (id: number | null) => (state: TheState) => id === null ? undefined : state.palette[id];
export const paletteSelector = (state: TheState): PaletteState => state.palette;
