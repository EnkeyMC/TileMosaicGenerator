import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import React, {useCallback} from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bem from "bem-ts";
import {useSelector} from "react-redux";
import {tilesSelector} from "../../selectors/tiles";
import Scrollable from "../../components/Scrollable";
import TileItem, {NewTileItem} from "./TileItem";
import {NavLink, useHistory} from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

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
                    <div className={blk('heading')}>
                        <h1 className="title">Tiles</h1>
                        <p className={blk('actions')}>
                            <NavLink to="/tiles/reorder">Reorder</NavLink>
                        </p>
                    </div>
                    <ErrorBoundary>
                        <div className={blk('items')}>
                            {tiles.map((tile, idx) => <TileItem key={tile.id} idx={idx} tile={tile} />)}
                            <NewTileItem onClick={handleAddNew} />
                        </div>
                    </ErrorBoundary>
                </div>
            </Scrollable>
        </FullscreenPageLayout>
    );
}

export default Tiles;
