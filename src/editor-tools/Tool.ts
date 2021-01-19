import {ReactNode} from "react";
import {Dispatch} from "redux";
import {Point, SvgShape} from "../models/svg";

export enum ToolType {
    CREATOR,
    MANIPULATOR,
}

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

    public onShapeClick(state: T, dispatch: Dispatch, idx: number, shape: SvgShape): T {
        return state;
    }

    public onFinish(state: T, dispatch: Dispatch): T {
        return state;
    }

    public renderShape(state: T): ReactNode {
        return null;
    }

    public toolType(): ToolType {
        return ToolType.CREATOR;
    }

    public showHoverPoint(): boolean {
        return true;
    }

    public abstract getInitialState(): T;
}

