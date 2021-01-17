import React, {SyntheticEvent, useCallback, useState} from "react";
import bem from "bem-ts";
import SvgCanvas from "./SvgCanvas";
import PanelLayout from "../layouts/PanelLayout";

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
    const [grid, setGrid] = useState<number>(5);
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

    const gridLinesCount = 100/grid + 1;

    return (
        <div className={blk()}>
            <PanelLayout left={
                <div className={blk('toolbar')}>
                    <div className="buttons has-addons is-centered">
                        <button className="button">Line</button>
                        <button className="button">Polyline</button>
                        <button className="button">Circle</button>
                        <button className="button">Polygon</button>
                    </div>
                </div>
            }>
                <div className={blk('wrap')}>
                    <SvgCanvas svgRef={svgRef} blk={blk} eventHandlers={{onClick: handleClick, onMouseMove: handleMouseMove, onMouseLeave: handleMouseExit}}
                               overlay={
                                   <>
                                       {Array(gridLinesCount).fill(0).map((_, idx) =>
                                           <line x1={0} y1={idx * grid} x2={100} y2={idx * grid} stroke="#000" strokeOpacity={0.3}
                                                 strokeWidth={1} vectorEffect="non-scaling-stroke"/>
                                       )}
                                       {Array(gridLinesCount).fill(0).map((_, idx) =>
                                           <line y1={0} x1={idx * grid} y2={100} x2={idx * grid} stroke="#000" strokeOpacity={0.3}
                                                 strokeWidth={1} vectorEffect="non-scaling-stroke"/>
                                       )}

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
