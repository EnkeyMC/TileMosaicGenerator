import Tile from "../models/Tile";

export type TilesState = Tile[];

const initialState: TilesState = [];

export function tiles(state = initialState, action: any): TilesState {
    switch (action.type) {
        default:
            return state;
    }
}
