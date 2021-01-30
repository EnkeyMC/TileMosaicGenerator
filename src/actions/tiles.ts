import {Action} from "redux";
import Tile from "../models/Tile";

export const TILES_SET_TILE = 'TILES_SET_TILE';
export const TILES_DELETE_TILE = 'TILES_DELETE_TILE';
export const TILES_SET_TILES = 'TILES_SET_TILES';
export const TILES_DUPLICATE_TILE = 'TILES_DUPLICATE_TILE';
export const TILES_ROTATE = 'TILES_ROTATE';

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

export interface DuplicateTileAction extends Action<typeof TILES_DUPLICATE_TILE> {
    idx: number;
    newId: number;
}

export function duplicateTile(idx: number, newId: number): DuplicateTileAction {
    return {
        type: TILES_DUPLICATE_TILE,
        idx,
        newId
    }
}

export interface RotateAction extends Action<typeof TILES_ROTATE> {
    idx: number;
    ccw: boolean;
}

export function rotate(idx: number, ccw: boolean): RotateAction {
    return {
        type: TILES_ROTATE,
        idx,
        ccw
    }
}

export type TilesActions = SetTileAction | DeleteTileAction | SetTilesAction | DuplicateTileAction | RotateAction;
