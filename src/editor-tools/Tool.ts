import {ReactNode} from "react";
import {Dispatch} from "redux";
import {Point, SvgShape} from "../models/svg";

export default abstract class Tool<T> {
    public onClick(state: T, dispatch: Dispatch, e: Point): T {
        return state;
    }

    public onMouseMove(state: T, dispatch: Dispatch, e: Point): T {
        return state;
    }

    public onMouseLeave(state: T, dispatch: Dispatch, e: Point) {
        return state;
    }

    public onShapeClick(state: T, dispatch: Dispatch, idx: number, shape: SvgShape) {

    }

    public renderShape(state: T): ReactNode {
        return null;
    }

    public abstract getInitialState(): T;
}

