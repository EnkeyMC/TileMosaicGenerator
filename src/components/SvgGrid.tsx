import React from "react";

interface Props {
    gridSize: number;
}

const SvgGrid = (props: Props) => {
    const gridLinesCount = 100/props.gridSize + 1;
    const grid = props.gridSize;
    const lines = Array(gridLinesCount).fill(0);
    return (
        <>
            {lines.map((_, idx) =>
                <line x1={0} y1={idx * grid} x2={100} y2={idx * grid} stroke="#000" strokeOpacity={0.3}
                      strokeWidth={1} vectorEffect="non-scaling-stroke"/>
            )}
            {lines.map((_, idx) =>
                <line y1={0} x1={idx * grid} y2={100} x2={idx * grid} stroke="#000" strokeOpacity={0.3}
                        strokeWidth={1} vectorEffect="non-scaling-stroke"/>
            )}
        </>
    );
}

export default SvgGrid;
