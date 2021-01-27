import {TheState} from "../reducers";
import Tile from "../models/Tile";

export const tilesSelector = (state: TheState): Tile[] => state.tiles;
export const tileSelector = (id: number | null) => (state: TheState): Tile | undefined => state.tiles.find(t => t.id === id);
