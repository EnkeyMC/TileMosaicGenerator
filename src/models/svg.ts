import {PropertyDefinitions} from "../properties/PropertyDefinition";
import {PropertyType} from "../properties/PropertyType";
import {MinValidator} from "../properties/validators";

export enum SvgShapeType {
    TYPE_CIRCLE = 'CIRCLE',
    TYPE_LINE = 'LINE',
    TYPE_POLYGON = 'POLYGON',
    TYPE_POLYLINE = 'POLYLINE',
}

export interface Point {
    x: number;
    y: number;
}

export interface SvgShape {
    type: SvgShapeType;
    id: number;
    [key: string]: any;
}

interface WithStroke {
    strokeWidth: number | null;
    strokeColorId: number | null;
}

const WithStrokeProperties: PropertyDefinitions = {
    strokeWidth: {
        label: 'Stroke width',
        type: PropertyType.FLOAT,
        validators: [MinValidator(0)] as any
    },
    strokeColorId: {
        label: 'Stroke color',
        type: PropertyType.COLOR
    }
}

interface WithFill {
    fillColorId: number | null;
}

const WithFillProperties: PropertyDefinitions = {
    fillColorId: {
        label: 'Fill color',
        type: PropertyType.COLOR
    }
}

export interface SvgCircle extends SvgShape, WithStroke, WithFill {
    center: Point;
    r: number;
}

export const SvgCircleProperties: PropertyDefinitions = {
    center: {
        label: 'Center',
        type: PropertyType.POINT,
        required: true
    },
    r: {
        label: 'Radius',
        type: PropertyType.FLOAT,
        required: true
    },
    ...WithFillProperties,
    ...WithStrokeProperties
}

export interface SvgLine extends SvgShape, WithStroke {
    point1: Point;
    point2: Point;
}

export const SvgLineProperties: PropertyDefinitions = {
    point1: {
        label: 'Start point',
        type: PropertyType.POINT,
        required: true
    },
    point2: {
        label: 'End point',
        type: PropertyType.POINT,
        required: true
    },
    ...WithStrokeProperties
}

export interface SvgPolygon extends SvgShape, WithStroke, WithFill {
    points: Point[];
}

export const SvgPolygonProperties: PropertyDefinitions = {
    ...WithStrokeProperties,
    ...WithFillProperties
}

export interface SvgPolyline extends SvgShape, WithStroke {
    points: Point[];
}

export const SvgPolylineProperties: PropertyDefinitions = WithStrokeProperties;

export const propertiesMap = {
    [SvgShapeType.TYPE_LINE]: SvgLineProperties,
    [SvgShapeType.TYPE_POLYGON]: SvgPolygonProperties,
    [SvgShapeType.TYPE_POLYLINE]: SvgPolylineProperties,
    [SvgShapeType.TYPE_CIRCLE]: SvgCircleProperties,
}
