import {TheState} from "../reducers";
import {VERSION} from "../versioning";
import {ProjectType} from "../actions";

export const exportSelector = (state: TheState): ProjectType => ({
    version: VERSION,
    tiles: state.tiles,
    generator: state.generator,
    palette: state.palette,
})
