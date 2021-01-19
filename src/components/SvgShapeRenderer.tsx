import React from "react";
import {SvgCircle, SvgLine, SvgPolygon, SvgPolyline, SvgShape, SvgShapeType} from "../models/svg";

const SvgShapeRenderer = (props: {shape: SvgShape, eventHandlers?: any, selected?: boolean}) => {
    const shape = props.shape;
    const color = props.selected ? 'red' : 'black';

    switch (shape.type) {
        case SvgShapeType.TYPE_LINE:
            const line = shape as SvgLine;
            return <line x1={line.point1.x} y1={line.point1.y} x2={line.point2.x} y2={line.point2.y} stroke={color} strokeWidth={1} {...props.eventHandlers} />
        case SvgShapeType.TYPE_POLYLINE:
            const polyline = shape as SvgPolyline;
            return <polyline points={polyline.points.map(p => `${p.x},${p.y}`).join(' ')} stroke={color} strokeWidth={1} fill="none" {...props.eventHandlers} />
        case SvgShapeType.TYPE_CIRCLE:
            const circle = shape as SvgCircle;
            return <circle cx={circle.center.x} cy={circle.center.y} r={circle.r} fill={color} {...props.eventHandlers} />
        case SvgShapeType.TYPE_POLYGON:
            const polygon = shape as SvgPolygon;
            return <polygon points={polygon.points.map(p => `${p.x},${p.y}`).join(' ')} fill={color} {...props.eventHandlers} />
        default:
            return null;
    }
}

export default SvgShapeRenderer;
