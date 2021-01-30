import Tool from "./Tool";
import {Point, SvgCircle, SvgShapeType} from "../models/svg";
import {Dispatch} from "redux";
import {addShape} from "../actions/editor";
import SvgShapeRenderer from "../components/SvgShapeRenderer";
import React from "react";
import {ShapeIdGenerator} from "../idGenerators";

export type CircleState = Partial<SvgCircle>;

export default class Circle extends Tool<CircleState> {
    onClick(state: CircleState, dispatch: Dispatch, e: Point): CircleState {
        if (state.center) {
            dispatch(addShape({...state, id: ShapeIdGenerator.getNextId()} as SvgCircle));
            return this.getInitialState();
        }

        return {...state, center: e};
    }

    onMouseMove(state: CircleState, dispatch: Dispatch, e: Point): CircleState {
        if (state.center) {
            return {...state, r: Circle.getDistance(state.center, e)};
        }
        return state;
    }

    renderShape(state: CircleState): React.ReactNode {
        if (state.center && state.r)
            return <SvgShapeRenderer shape={state as SvgCircle} />;
        return null;
    }

    getInitialState(): CircleState {
        return {
            type: SvgShapeType.TYPE_CIRCLE,
            zIndex: 0,
            fillColorId: 0,
            strokeWidth: null,
            strokeColorId: null,
        };
    }

    private static getDistance(p1: Point, p2: Point) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}
