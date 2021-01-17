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
    colorId: number;
    zIndex: number;
}

export interface SvgCircle extends SvgShape {
    center: Point;
    r: number;
}

export interface SvgLine extends SvgShape {
    point1: Point;
    point2: Point;
}

export interface SvgPolygon extends SvgShape {
    points: Point[];
}

export interface SvgPolyline extends SvgPolygon {

}
