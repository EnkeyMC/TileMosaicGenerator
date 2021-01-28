import React from "react";
import Tile from "../models/Tile";
import SvgShapeRenderer from "./SvgShapeRenderer";

interface Props {
    tile: Tile
}

const TileSvg = ({tile}: Props) => {
    return (
        <svg viewBox="0 0 100 100" width={100} height={100} xmlns="http://www.w3.org/2000/svg">
            {tile.elements.map(el => <SvgShapeRenderer shape={el} key={el.id} />)}
        </svg>
    )
}

export default TileSvg;
