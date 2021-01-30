import {Dispatch} from "redux";
import {importProject, ProjectType} from "./actions";
import {PaletteIdGenerator, ShapeIdGenerator, TileIdGenerator} from "./idGenerators";

export function importProjectAndSetupIdGenerators(dispatch: Dispatch, data: ProjectType) {
    dispatch(importProject(data));

    const maxPaletteId = Object.keys(data.palette).reduce((max, id) => Math.max(max, parseInt(id, 10)), 0);
    PaletteIdGenerator.setLastId(maxPaletteId);

    const maxTileId = data.tiles.reduce((max, tile) => Math.max(max, tile.id), 0);
    TileIdGenerator.setLastId(maxTileId);

    const maxShapeId = data.tiles.reduce((max, tile) => {
        return Math.max(max, tile.elements.reduce((elMax, el) => Math.max(elMax, el.id), 0));
    }, 0);
    ShapeIdGenerator.setLastId(maxShapeId);
}
