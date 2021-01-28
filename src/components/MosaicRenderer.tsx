import TileSvg from "./TileSvg";
import React from "react";
import Tile from "../models/Tile";

interface Props {
    rows: number;
    cols: number;
    tiles: Tile[];
}

const MosaicRenderer = (props: Props) => {
    const tilesLen = props.tiles.length;

    const rowArray = Array(props.rows).fill(0);
    const colArray = Array(props.cols).fill(0);

    return (
        <svg preserveAspectRatio="xMidYMid meet" viewBox={`0 0 ${props.cols*100} ${props.rows*100}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                {props.tiles.map(tile => (
                    <g key={tile.id} id={`tile-${tile.id}`}>
                        <TileSvg key={tile.id} tile={tile} />
                    </g>
                ))}
            </defs>
            {rowArray.map((_, row) => (
                colArray.map((_, col) => {
                    const idx = row * props.cols + col;
                    const tile = props.tiles[(idx) % tilesLen];
                    return <use key={idx} href={`#tile-${tile.id}`} x={col * 100}
                                y={row * 100}/>
                })
            ))}
        </svg>
    )
}

export default MosaicRenderer;
