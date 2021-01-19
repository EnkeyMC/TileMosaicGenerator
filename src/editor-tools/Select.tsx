import Tool, {ToolType} from "./Tool";
import {Dispatch} from "redux";
import {Point, SvgShape} from "../models/svg";
import {selectShape} from "../actions/editor";

export interface SelectState {

}

export default class Select extends Tool<SelectState> {
    onClick(state: SelectState, dispatch: Dispatch, e: Point): SelectState {
        dispatch(selectShape(null));
        return state;
    }

    onShapeClick(state: SelectState, dispatch: Dispatch, idx: number, shape: SvgShape): SelectState {
        dispatch(selectShape(idx));
        return state;
    }

    showHoverPoint(): boolean {
        return false;
    }

    toolType(): ToolType {
        return ToolType.MANIPULATOR;
    }

    getInitialState(): SelectState {
        return {};
    }
}
