import Tool from "./Tool";
import {Point, SvgLine, SvgShapeType} from "../models/svg";
import {Dispatch} from "redux";
import React from "react";
import {addShape} from "../actions/editor";
import SvgShapeRenderer from "../components/SvgShapeRenderer";
import {ShapeIdGenerator} from "../idGenerators";

export type LineState = Partial<SvgLine>;

export default class Line extends Tool<LineState> {
    onClick(state: LineState, dispatch: Dispatch, e: Point): LineState {
        if (state.point1) {
            dispatch(addShape({...state, id: ShapeIdGenerator.getNextId()} as SvgLine));
            return this.getInitialState();
        }
        return {...state, point1: e};
    }

    onMouseMove(state: LineState, dispatch: Dispatch, e: Point): LineState {
        if (state.point1)
            return {...state, point2: e};
        return state;
    }

    renderShape(state: LineState): React.ReactNode {
        if (state.point1 && state.point2) {
            return <SvgShapeRenderer shape={state as SvgLine} />
        }
        return null;
    }

    getInitialState(): LineState {
        return {
            type: SvgShapeType.TYPE_LINE,
            zIndex: 0,
            strokeColorId: 0,
            strokeWidth: 2,
        };
    }
}
