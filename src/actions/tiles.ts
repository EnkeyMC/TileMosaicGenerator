import {Action} from "redux";
import Tile from "../models/Tile";

export const TILES_SET_TILE = 'TILES_SET_TILE';
export const TILES_DELETE_TILE = 'TILES_DELETE_TILE';

export interface SetTileAction extends Action<typeof TILES_SET_TILE> {
    tile: Tile
}

export function setTile(tile: Tile): SetTileAction {
    return {
        type: TILES_SET_TILE,
        tile
    }
}

export interface DeleteTileAction extends Action<typeof TILES_DELETE_TILE> {
    id: number;
}

export function deleteTile(id: number): DeleteTileAction {
    return {
        type: TILES_DELETE_TILE,
        id
    }
}

export type TilesActions = SetTileAction | DeleteTileAction;
