import {Action} from "redux";
import Tile from "../models/Tile";

export const TILES_SET_TILE = 'TILES_SET_TILE';
export const TILES_DELETE_TILE = 'TILES_DELETE_TILE';
export const TILES_SET_TILES = 'TILES_SET_TILES';

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

export interface SetTilesAction extends Action<typeof TILES_SET_TILES> {
    tiles: Tile[];
}

export function setTiles(tiles: Tile[]): SetTilesAction {
    return {
        type: TILES_SET_TILES,
        tiles
    }
}

export type TilesActions = SetTileAction | DeleteTileAction | SetTilesAction;
