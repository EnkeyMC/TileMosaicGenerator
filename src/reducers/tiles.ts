import Tile from "../models/Tile";
import {
    TILES_DELETE_TILE,
    TILES_DUPLICATE_TILE, TILES_ROTATE,
    TILES_SET_TILE,
    TILES_SET_TILES,
    TilesActions
} from "../actions/tiles";
import {Point, SvgCircle, SvgLine, SvgPolygon, SvgPolyline, SvgShapeType} from "../models/svg";
import {GlobalActions, IMPORT_PROJECT} from "../actions";


export type TilesState = Tile[];

const initialState: TilesState = [
    {
        id: 1,
        elements: [
            {
                type: SvgShapeType.TYPE_POLYLINE,
                zIndex: 0,
                strokeColorId: 0,
                strokeWidth: 2,
                points: [
                    {
                        x: 30,
                        y: 40
                    },
                    {
                        x: 60,
                        y: 75
                    },
                    {
                        x: 90,
                        y: 70
                    },
                    {
                        x: 70,
                        y: 0
                    },
                    {
                        x: 35,
                        y: 85
                    }
                ],
                id: 1
            }
        ]
    },
    {
        id: 2,
        elements: [
            {
                type: SvgShapeType.TYPE_LINE,
                zIndex: 0,
                strokeColorId: 0,
                strokeWidth: 2,
                point1: {
                    x: 20,
                    y: 35
                },
                point2: {
                    x: 80,
                    y: 85
                },
                id: 2
            },
            {
                type: SvgShapeType.TYPE_LINE,
                zIndex: 0,
                strokeColorId: 0,
                strokeWidth: 2,
                point1: {
                    x: 30,
                    y: 80
                },
                point2: {
                    x: 55,
                    y: 30
                },
                id: 3
            }
        ]
    },
    {
        id: 3,
        elements: [
            {
                type: SvgShapeType.TYPE_POLYGON,
                zIndex: 0,
                fillColorId: 0,
                points: [
                    {
                        x: 75,
                        y: 25
                    },
                    {
                        x: 25,
                        y: 60
                    },
                    {
                        x: 25,
                        y: 60
                    },
                    {
                        x: 75,
                        y: 85
                    },
                    {
                        x: 75,
                        y: 85
                    },
                    {
                        x: 15,
                        y: 10
                    },
                    {
                        x: 15,
                        y: 10
                    }
                ],
                strokeColorId: null,
                strokeWidth: null,
                id: 4
            }
        ]
    }
];

function rotatePoint(p: Point, ccw: boolean): Point {
    const tx = p.x - 50;
    const ty = p.y - 50;

    return {
        x: (!ccw ? -ty : ty) + 50,
        y: (!ccw ? tx : -tx) + 50
    }
}

export function tiles(state = initialState, action: TilesActions | GlobalActions): TilesState {
    switch (action.type) {
        case TILES_SET_TILE:
            const tileIdx = state.findIndex(t => t.id === action.tile.id);
            if (tileIdx >= 0) {
                return state.map(t => t.id === action.tile.id ? {...action.tile} : t);
            }
            return [...state, action.tile];
        case TILES_DELETE_TILE:
            return state.filter(tile => tile.id !== action.id);
        case TILES_SET_TILES:
            return [...action.tiles];
        case IMPORT_PROJECT:
            return JSON.parse(JSON.stringify(action.data.tiles));
        case TILES_DUPLICATE_TILE: {
            const tile = state[action.idx];
            const duplicated = JSON.parse(JSON.stringify(tile));
            duplicated.id = action.newId;

            const newTiles = [...state];
            newTiles.splice(action.idx + 1, 0, duplicated);
            return newTiles;
        }
        case TILES_ROTATE: {
            const elements = state[action.idx].elements.map(el => {
                switch (el.type) {
                    case SvgShapeType.TYPE_CIRCLE:
                        const circle = el as SvgCircle;
                        return {
                            ...circle,
                            center: rotatePoint(circle.center, action.ccw)
                        }
                    case SvgShapeType.TYPE_LINE:
                        const line = el as SvgLine;
                        return {
                            ...line,
                            point1: rotatePoint(line.point1, action.ccw),
                            point2: rotatePoint(line.point2, action.ccw)
                        }
                    case SvgShapeType.TYPE_POLYGON:
                        const polygon = el as SvgPolygon;
                        return {
                            ...polygon,
                            points: polygon.points.map(p => rotatePoint(p, action.ccw))
                        }
                    case SvgShapeType.TYPE_POLYLINE:
                        const polyline = el as SvgPolyline;
                        return {
                            ...polyline,
                            points: polyline.points.map(p => rotatePoint(p, action.ccw))
                        }
                    default:
                        return el;
                }
            });
            const tiles = [...state];
            tiles[action.idx] = {...state[action.idx], elements};
            return tiles;
        }
        default:
            return state;
    }
}
