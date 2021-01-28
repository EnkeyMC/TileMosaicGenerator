import React from "react";
import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PanelLayout from "../../layouts/PanelLayout";
import bem from "bem-ts";
import MosaicRenderer from "../../components/MosaicRenderer";
import {useSelector} from "react-redux";
import {colsSelector, rowsSelector} from "../../selectors/generator";
import {tilesSelector} from "../../selectors/tiles";
import GeneratorSettings from "./GeneratorSettings";

const blk = bem('generator');

const Generator = () => {
    const tiles = useSelector(tilesSelector);
    const cols = useSelector(colsSelector);
    const rows = useSelector(rowsSelector);

    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <PanelLayout horizontal left={<GeneratorSettings />}>
                <div className={blk()}>
                    <div className={blk('wrap')}>
                        {tiles.length > 0 && <MosaicRenderer cols={cols} rows={rows} tiles={tiles} />}
                    </div>
                </div>
            </PanelLayout>
        </FullscreenPageLayout>
    )
}

export default Generator;
