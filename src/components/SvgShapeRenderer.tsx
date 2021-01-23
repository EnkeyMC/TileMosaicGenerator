import React from "react";
import {SvgCircle, SvgLine, SvgPolygon, SvgPolyline, SvgShape, SvgShapeType} from "../models/svg";
import {useSelector} from "react-redux";
import {colorSelector} from "../selectors/palette";

interface RendererProps {
    eventHandlers?: any;
    selected?: boolean;
}

const selectedColor = '#3298dc';

const SvgLineRenderer = (props: {line: SvgLine} & RendererProps) => {
    const {line, selected} = props;

    const color = useSelector(colorSelector(line.strokeColorId));
    const actualColor = selected ? selectedColor : color;
    return <line
        x1={line.point1.x}
        y1={line.point1.y}
        x2={line.point2.x}
        y2={line.point2.y}
        stroke={actualColor ?? 'none'}
        strokeWidth={line.strokeWidth ?? 0}
        {...props.eventHandlers} />;
}

const SvgPolylineRenderer = (props: {polyline: SvgPolyline} & RendererProps) => {
    const {polyline, selected} = props;

    const color = useSelector(colorSelector(polyline.strokeColorId));
    const actualColor = selected ? selectedColor : color;
    return <polyline
        points={polyline.points.map(p => `${p.x},${p.y}`).join(' ')}
        stroke={actualColor ?? 'none'}
        strokeWidth={polyline.strokeWidth ?? 0}
        fill="none"
        {...props.eventHandlers} />
}

const SvgCircleRenderer = (props: {circle: SvgCircle} & RendererProps) => {
    const {circle, selected} = props;

    const color = useSelector(colorSelector(circle.fillColorId));
    const actualColor = selected ? selectedColor : color;

    const strokeColor = useSelector(colorSelector(circle.strokeColorId));

    return <circle
        cx={circle.center.x}
        cy={circle.center.y}
        r={circle.r}
        fill={actualColor ?? 'none'}
        stroke={strokeColor ?? 'none'}
        strokeWidth={circle.strokeWidth ?? 0}
        {...props.eventHandlers} />
}

const SvgPolygonRenderer = (props: {polygon: SvgPolygon} & RendererProps) => {
    const {polygon, selected} = props;

    const color = useSelector(colorSelector(polygon.fillColorId));
    const actualColor = selected ? selectedColor : color;

    const strokeColor = useSelector(colorSelector(polygon.strokeColorId));

    return <polygon
        points={polygon.points.map(p => `${p.x},${p.y}`).join(' ')}
        fill={actualColor ?? 'none'}
        stroke={strokeColor ?? 'none'}
        strokeWidth={polygon.strokeWidth ?? 0}
        {...props.eventHandlers} />
}

const SvgShapeRenderer = (props: {shape: SvgShape} & RendererProps) => {
    const shape = props.shape;

    switch (shape.type) {
        case SvgShapeType.TYPE_LINE:
            return <SvgLineRenderer line={shape as SvgLine} eventHandlers={props.eventHandlers} selected={props.selected} />
        case SvgShapeType.TYPE_POLYLINE:
            return <SvgPolylineRenderer polyline={shape as SvgPolyline} eventHandlers={props.eventHandlers} selected={props.selected} />
        case SvgShapeType.TYPE_CIRCLE:
            return <SvgCircleRenderer circle={shape as SvgCircle} eventHandlers={props.eventHandlers} selected={props.selected} />
        case SvgShapeType.TYPE_POLYGON:
            return <SvgPolygonRenderer polygon={shape as SvgPolygon} eventHandlers={props.eventHandlers} selected={props.selected} />
        default:
            return null;
    }
}

export default SvgShapeRenderer;
