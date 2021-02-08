import TileSvg from "./TileSvg";
import React, {useMemo} from "react";
import Tile from "../models/Tile";
import {getTileSelectorByName} from "../generators";
import Big from "big.js";

interface Props {
    rows: number;
    cols: number;
    tiles: Tile[];
    tileSelector: string;
    tileSelectorProperties: any;
    backgroundColor?: string;
}

const MosaicRenderer = (props: Props) => {
    const tilesLen = props.tiles.length;

    const rowArray = useMemo(() => Array(props.rows).fill(0), [props.rows]);
    const colArray = useMemo(() => Array(props.cols).fill(0), [props.cols]);

    const tileSelector = getTileSelectorByName(props.tileSelector);

    const tileMatrix = useMemo(() => {
        return rowArray.map((_, row) => (
            colArray.map((_, col) => {
                const idx = row * props.cols + col;
                const selectedTile = tileSelector.selectTile(idx, row, col, props.tileSelectorProperties);
                if (selectedTile instanceof Big) {
                    const tile = props.tiles[Math.floor(selectedTile.mod(tilesLen).toNumber())];
                    return tile?.id;
                } else {
                    const tile = props.tiles[Math.floor(selectedTile) % tilesLen];
                    return tile?.id;
                }
            })
        ))
    }, [rowArray, colArray, tileSelector, tilesLen, props.cols, props.tiles, props.tileSelectorProperties]);

    const tileDefinitions = useMemo(() => (
        props.tiles.map(tile => (
            <g key={tile.id} id={`tile-${tile.id}`}>
                <TileSvg key={tile.id} tile={tile} />
            </g>
        ))
    ), [props.tiles]);

    return (
        <svg
            version="1.1"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${props.cols*100} ${props.rows*100}`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                {tileDefinitions}
            </defs>
            {props.backgroundColor && <rect x={0} y={0} width={props.cols * 100} height={props.rows * 100} fill={props.backgroundColor} />}
            {tileMatrix.map((column, row) => (
                column.map((tileId, col) => {
                    return <use key={row * props.cols + col} xlinkHref={`#tile-${tileId}`} x={col * 100}
                                y={row * 100}/>
                })
            ))}
        </svg>
    )
}

export default MosaicRenderer;
