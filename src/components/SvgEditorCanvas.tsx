import React, {SyntheticEvent, useCallback, useEffect, useState} from "react";
import bem from "bem-ts";
import SvgCanvas from "./SvgCanvas";
import {useDispatch, useSelector} from "react-redux";
import {elementsSelector, gridSizeSelector, selectedIdxSelector, toolSelector} from "../selectors/editor";
import SvgGrid from "./SvgGrid";
import {Point} from "../models/svg";
import {useTool} from "../editor-tools";
import SvgShapeRenderer from "./SvgShapeRenderer";
import {ToolType} from "../editor-tools/Tool";
import {clear, setElements} from "../actions/editor";
import { useParams } from "react-router-dom";
import {tileSelector} from "../selectors/tiles";

const blk = bem('svg-editor');

const useSvgUtils: () => [(el: SVGSVGElement) => void, (e: SyntheticEvent, grid: number) => Point] = () => {
    const [svg, setSvgRef] = useState(null);
    const [svgPoint, setSvgPoint] = useState(null);
    const ref = useCallback(el => {
        if (el !== null) {
            setSvgRef(el);
            setSvgPoint(el.createSVGPoint());
        }
    }, [setSvgRef]);

    const eventToSvgCoords = useCallback<(e: SyntheticEvent, grid: number) => Point>((e, grid): Point => {
        if (svgPoint === null)
            return {x: 0, y: 0};
        // @ts-ignore
        svgPoint.x = e.clientX;
        // @ts-ignore
        svgPoint.y = e.clientY;

        // @ts-ignore
        const transformed = svgPoint.matrixTransform(svg.getScreenCTM()?.inverse());
        return {
            x: Math.round(transformed.x / grid) * grid,
            y: Math.round(transformed.y / grid) * grid,
        };
    }, [svgPoint, svg]);

    return [ref, eventToSvgCoords];
}

function isInBounds(p: Point) {
    return p.x >= 0 && p.y >= 0 && p.x <= 100 && p.y <= 100;
}

const SvgEditorCanvas = () => {
    const [svgRef, eventToSvgCoords] = useSvgUtils();
    const grid = useSelector(gridSizeSelector);
    const selectedTool = useSelector(toolSelector);
    const selectedIdx = useSelector(selectedIdxSelector);
    const elements = useSelector(elementsSelector);
    const [hoverPoint, setHoverPoint] = useState<Point | null>(null);
    const tool = useTool(selectedTool);
    const dispatch = useDispatch();

    const params = useParams<{id: string}>();
    const id = params.id ? parseInt(params.id) : null;
    const tile = useSelector(tileSelector(id));

    const handleClick = useCallback((e) => {
        const point = eventToSvgCoords(e, grid);
        if (isInBounds(point)) {
            tool.svgEventHandlers.onClick(point);
        }
    }, [eventToSvgCoords, grid, tool.svgEventHandlers.onClick]);

    const handleMouseMove = useCallback(e => {
        const point = eventToSvgCoords(e, grid);
        if (isInBounds(point)) {
            setHoverPoint(point);
        }
    }, [grid, eventToSvgCoords]);

    const handleMouseExit = useCallback(e => {
        setHoverPoint(null);
        const point = eventToSvgCoords(e, grid);
        if (isInBounds(point)) {
            tool.svgEventHandlers.onMouseLeave(point);
        }
    }, [setHoverPoint, eventToSvgCoords, grid, tool.svgEventHandlers.onMouseLeave]);

    const handleShapeClick = useCallback((e: SyntheticEvent, idx) => {
        if (tool.toolType === ToolType.MANIPULATOR) {
            e.stopPropagation();
            tool.onShapeClick(idx, elements[idx]);
        }
    }, [tool.onShapeClick, elements]);

    const handleContextMenu = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        tool.svgEventHandlers.onFinish();
    }, [tool.svgEventHandlers.onFinish]);

    useEffect(() => {
        hoverPoint && tool.svgEventHandlers.onMouseMove(hoverPoint);
    }, [hoverPoint]);

    useEffect(() => {
        dispatch(clear());
        if (id !== null && tile) {
            dispatch(setElements(tile.elements));
        }
    }, [id, tile, dispatch]);

    return (
        <SvgCanvas svgRef={svgRef} blk={blk}
                   padding={grid / 2}
                   eventHandlers={{
                       onClick: handleClick,
                       onMouseMove: handleMouseMove,
                       onMouseLeave: handleMouseExit,
                       onContextMenu: handleContextMenu
                   }}
                   overlay={
                       <>
                           <SvgGrid gridSize={grid} />
                           {hoverPoint && tool.showHoverPoint &&
                           <circle cx={hoverPoint.x} cy={hoverPoint.y} r={1} stroke="black" strokeWidth={2}
                                   vectorEffect="non-scaling-stroke"/>}
                       </>
                   }
        >
            <SvgCanvas width={100} height={100}>
                {elements.map((el, idx) => <SvgShapeRenderer key={el.id} selected={idx === selectedIdx} shape={el} eventHandlers={{onClick: (e: SyntheticEvent) => handleShapeClick(e, idx)}} />)}
                {tool.renderedShape}
            </SvgCanvas>
        </SvgCanvas>
    )
}

export default SvgEditorCanvas;
