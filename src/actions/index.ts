import {Action} from "redux";
import {GeneratorState} from "../reducers/generator";
import {PaletteState} from "../reducers/palette";
import {TilesState} from "../reducers/tiles";
import {Version} from "../versioning";

export const IMPORT_PROJECT = 'IMPORT_PROJECT';

export interface ProjectType {
    version: Version,
    generator: GeneratorState,
    tiles: TilesState,
    palette: PaletteState
}

export interface ImportProjectAction extends Action<typeof IMPORT_PROJECT> {
    data: ProjectType;
}

export function importProject(data: ProjectType): ImportProjectAction {
    return {
        type: IMPORT_PROJECT,
        data
    }
}

export type GlobalActions = ImportProjectAction;
