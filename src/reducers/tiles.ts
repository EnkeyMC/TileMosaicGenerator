import Tile from "../models/Tile";
import {TILES_DELETE_TILE, TILES_SET_TILE, TILES_SET_TILES, TilesActions} from "../actions/tiles";

export const nextTileId = (() => {
    let lastId = 0;
    return () => ++lastId;
})();

export type TilesState = Tile[];

const initialState: TilesState = [];

export function tiles(state = initialState, action: TilesActions): TilesState {
    switch (action.type) {
        case TILES_SET_TILE:
            const tileIdx = state.findIndex(t => t.id === action.tile.id);
            if (tileIdx >= 0) {
                return state.map(t => t.id === action.tile.id ? {...action.tile} : t);
            }
            return [...state, action.tile];
        case TILES_DELETE_TILE:
            return state.filter(tile => tile.id !== action.id);
        case TILES_SET_TILES:
            return [...action.tiles];
        default:
            return state;
    }
}
