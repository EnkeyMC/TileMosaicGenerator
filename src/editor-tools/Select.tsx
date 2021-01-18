import Tool from "./Tool";

export interface SelectState {

}

export default class Select extends Tool<SelectState> {
    getInitialState(): SelectState {
        return {};
    }
}
