import Tool from "./Tool";
import {Point, SvgPolyline, SvgShapeType} from "../models/svg";
import {Dispatch} from "redux";
import React from "react";
import SvgShapeRenderer from "../components/SvgShapeRenderer";
import {addShape} from "../actions/editor";

export type PolylineState = SvgPolyline;

export default class Polyline extends Tool<PolylineState> {

    onClick(state: PolylineState, dispatch: Dispatch, e: Point): PolylineState {
        return {...state, points: state.points.concat(e)};
    }

    onMouseMove(state: PolylineState, dispatch: Dispatch, e: Point): PolylineState {
        const points = [...state.points];
        points.pop();
        points.push(e);
        return {...state, points};
    }

    onFinish(state: PolylineState, dispatch: Dispatch): PolylineState {
        const points = [...state.points];
        points.pop();
        const shape = {...state, points} as SvgPolyline;
        dispatch(addShape(shape));

        return this.getInitialState();
    }

    renderShape(state: PolylineState): React.ReactNode {
        return <SvgShapeRenderer shape={state as SvgPolyline} />
    }

    getInitialState(): PolylineState {
        return {
            type: SvgShapeType.TYPE_POLYLINE,
            zIndex: 0,
            strokeColorId: 0,
            strokeWidth: 2,
            points: [],
        };
    }
}
