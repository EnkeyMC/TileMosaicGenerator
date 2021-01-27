import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import React, {useCallback} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bem from "bem-ts";
import {useSelector} from "react-redux";
import {tilesSelector} from "../../selectors/tiles";
import Scrollable from "../../components/Scrollable";
import TileItem, {NewTileItem} from "./TileItem";
import { useHistory } from "react-router-dom";

const blk = bem('tiles');


const Tiles = () => {
    const tiles = useSelector(tilesSelector);
    const history = useHistory();

    const handleAddNew = useCallback(() => {
        history.push('/tiles/new');
    }, [history]);

    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <Scrollable>
                <div className={blk()}>
                    <h1 className="title">Tiles</h1>
                    <div className={blk('items')}>
                        {tiles.map(tile => <TileItem key={tile.id} tile={tile} />)}
                        <NewTileItem onClick={handleAddNew} />
                    </div>
                </div>
            </Scrollable>
        </FullscreenPageLayout>
    );
}

export default Tiles;
