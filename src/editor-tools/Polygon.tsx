import Tool from "./Tool";

export interface PolygonState {

}

export default class Polygon extends Tool<PolygonState> {
    getInitialState(): PolygonState {
        return {};
    }
}
