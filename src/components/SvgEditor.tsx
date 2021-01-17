import React, {SyntheticEvent, useCallback, useState} from "react";
import bem from "bem-ts";
import SvgCanvas from "./SvgCanvas";
import PanelLayout from "../layouts/PanelLayout";
import {useSelector} from "react-redux";
import {gridSizeSelector} from "../selectors/editor";
import SvgGrid from "./SvgGrid";
import SvgToolbar from "./SvgToolbar";

const blk = bem('svg-editor');

const useSvgUtils: () => [(el: SVGSVGElement) => void, (e: SyntheticEvent, grid: number) => SVGPoint] = () => {
    const [svg, setSvgRef] = useState(null);
    const [svgPoint, setSvgPoint] = useState(null);
    const ref = useCallback(el => {
        if (el !== null) {
            setSvgRef(el);
            setSvgPoint(el.createSVGPoint());
        }
    }, [setSvgRef]);

    const eventToSvgCoords = useCallback<(e: SyntheticEvent, grid: number) => SVGPoint>((e, grid) => {
        if (svgPoint === null)
            return;
        // @ts-ignore
        svgPoint.x = e.clientX;
        // @ts-ignore
        svgPoint.y = e.clientY;

        // @ts-ignore
        const transformed = svgPoint.matrixTransform(svg.getScreenCTM()?.inverse());
        transformed.x = Math.round(transformed.x / grid) * grid;
        transformed.y = Math.round(transformed.y / grid) * grid;
        return transformed;
    }, [svgPoint, svg]);

    return [ref, eventToSvgCoords];
}

const SvgEditor = () => {
    const [svgRef, eventToSvgCoords] = useSvgUtils();
    const [points, setPoints] = useState<SVGPoint[]>([]);
    const grid = useSelector(gridSizeSelector);
    const [hoverPoint, setHoverPoint] = useState<{x: number, y: number} | null>(null);

    const handleClick = useCallback((e) => {
        setPoints(points.concat([eventToSvgCoords(e, grid)]));
    }, [eventToSvgCoords, points, setPoints, grid]);

    const handleMouseMove = useCallback(e => {
        setHoverPoint(eventToSvgCoords(e, grid));
    }, [grid, eventToSvgCoords]);

    const handleMouseExit = useCallback(e => {
        setHoverPoint(null);
    }, [setHoverPoint]);


    return (
        <div className={blk()}>
            <PanelLayout left={<SvgToolbar />}>
                <div className={blk('wrap')}>
                    <SvgCanvas svgRef={svgRef} blk={blk} eventHandlers={{onClick: handleClick, onMouseMove: handleMouseMove, onMouseLeave: handleMouseExit}}
                               overlay={
                                   <>
                                       <SvgGrid gridSize={grid} />
                                       {hoverPoint && <circle cx={hoverPoint.x} cy={hoverPoint.y} r={1} stroke="black" strokeWidth={2}
                                                              vectorEffect="non-scaling-stroke"/>}
                                   </>
                               }
                    >
                        <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} style={{fill: 'red'}} />
                    </SvgCanvas>
                </div>
            </PanelLayout>
        </div>
    )
}

export default SvgEditor;
