import Tool from "./Tool";
import {Point, SvgPolygon, SvgShapeType} from "../models/svg";
import {Dispatch} from "redux";
import {addShape} from "../actions/editor";
import React from "react";
import SvgShapeRenderer from "../components/SvgShapeRenderer";
import {ShapeIdGenerator} from "../idGenerators";

export type PolygonState = SvgPolygon;

export default class Polygon extends Tool<PolygonState> {
    onClick(state: PolygonState, dispatch: Dispatch, e: Point): PolygonState {
        if (state.points.length > 0 && e.x === state.points[0].x && e.y === state.points[0].y)
            return this.onFinish(state, dispatch);
        return {...state, points: state.points.concat([e, e])};
    }

    onMouseMove(state: PolygonState, dispatch: Dispatch, e: Point): PolygonState {
        if (state.points.length === 0)
            return state;

        const points = [...state.points];
        points.pop();
        points.push(e);
        return {...state, points};
    }

    onFinish(state: PolygonState, dispatch: Dispatch): PolygonState {
        const points = [...state.points];
        points.pop();
        const shape = {...state, points, id: ShapeIdGenerator.getNextId()} as SvgPolygon;
        dispatch(addShape(shape));

        return this.getInitialState();
    }

    renderShape(state: PolygonState): React.ReactNode {
        return <SvgShapeRenderer shape={state as SvgPolygon} />
    }
    getInitialState(): PolygonState {
        return {
            type: SvgShapeType.TYPE_POLYGON,
            zIndex: 0,
            fillColorId: 0,
            points: [],
            strokeColorId: null,
            strokeWidth: null,
            id: 0
        };
    }
}
