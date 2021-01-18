import Tool from "./Tool";

export interface CircleState {

}

export default class Circle extends Tool<CircleState> {
    getInitialState(): CircleState {
        return {};
    }
}
