import MosaicRenderer from "./MosaicRenderer";
import {useSelector} from "react-redux";
import {tilesSelector} from "../selectors/tiles";
import {
    colsSelector,
    rowsSelector,
    tileSelectorKeySelector,
    tileSelectorPropertiesSelector
} from "../selectors/generator";
import React from "react";

const GenerateMosaic = () => {
    const tiles = useSelector(tilesSelector);
    const cols = useSelector(colsSelector);
    const rows = useSelector(rowsSelector);
    const tileSelectorKey = useSelector(tileSelectorKeySelector);
    const tileSelectorProperties = useSelector(tileSelectorPropertiesSelector);

    return (<>
        {tiles.length && <MosaicRenderer rows={rows} cols={cols} tiles={tiles} tileSelector={tileSelectorKey} tileSelectorProperties={tileSelectorProperties} />}
    </>);
}

export default GenerateMosaic;
