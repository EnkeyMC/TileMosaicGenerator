import MosaicRenderer from "./MosaicRenderer";
import {useSelector} from "react-redux";
import {tilesSelector} from "../selectors/tiles";
import {
    backgroundColorIdSelector,
    colsSelector,
    rowsSelector,
    tileSelectorKeySelector,
    tileSelectorPropertiesSelector
} from "../selectors/generator";
import React from "react";
import {colorSelector} from "../selectors/palette";

const GenerateMosaic = ({ async }: { async?: boolean }) => {
    const tiles = useSelector(tilesSelector);
    const cols = useSelector(colsSelector);
    const rows = useSelector(rowsSelector);
    const tileSelectorKey = useSelector(tileSelectorKeySelector);
    const tileSelectorProperties = useSelector(tileSelectorPropertiesSelector);
    const backgroundColorId = useSelector(backgroundColorIdSelector);
    const backgroundColor = useSelector(colorSelector(backgroundColorId));

    return (<>
        {tiles.length > 0 && <MosaicRenderer
            async={async}
            rows={rows} cols={cols}
            tiles={tiles} tileSelector={tileSelectorKey}
            tileSelectorProperties={tileSelectorProperties}
            backgroundColor={backgroundColor}
        />}
    </>);
}

export default GenerateMosaic;
