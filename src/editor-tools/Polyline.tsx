import Tool from "./Tool";

export interface PolylineState {

}

export default class Polyline extends Tool<PolylineState> {
    getInitialState(): PolylineState {
        return {};
    }
}
