import React from "react";
import {SvgLine, SvgShape, SvgShapeType} from "../models/svg";

const SvgShapeRenderer = (props: {shape: SvgShape}) => {
    const shape = props.shape;

    switch (shape.type) {
        case SvgShapeType.TYPE_LINE:
            const line = shape as SvgLine;
            return <line x1={line.point1.x} y1={line.point1.y} x2={line.point2.x} y2={line.point2.y} stroke="#000" strokeWidth={2} />
        default:
            return null;
    }
}

export default SvgShapeRenderer;
