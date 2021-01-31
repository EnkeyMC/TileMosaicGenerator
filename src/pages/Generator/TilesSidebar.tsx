import bem from "bem-ts";
import React, {useCallback} from "react";
import Scrollable from "../../components/Scrollable";
import Field from "../../components/controls/Field";
import PalettePickerControl from "../../components/controls/PalettePickerControl";
import {useDispatch, useSelector} from "react-redux";
import {backgroundColorIdSelector} from "../../selectors/generator";
import {setBackground} from "../../actions/generator";
import ReorderableTileList from "../../components/ReorderableTileList";

const blk = bem('tiles-sidebar');

const TilesSidebar = () => {
    const backgroundColorId = useSelector(backgroundColorIdSelector);
    const dispatch = useDispatch();

    const handleBackgroundChange = useCallback(id => {
        dispatch(setBackground(id));
    }, [dispatch]);

    return (
        <div className={blk()}>
            <Scrollable>
                <div className={blk('content')}>
                    <h1 className="title">Tiles</h1>
                    <Field
                        label="Background color"
                        control={PalettePickerControl}
                        onChange={handleBackgroundChange}
                        value={backgroundColorId}
                    />
                    <h2 className="title is-4 mt-5">Tile set</h2>
                    <p className="subtitle is-6">Reorder by drag&drop</p>
                    <ReorderableTileList />
                </div>
            </Scrollable>
        </div>
    )
}

export default TilesSidebar;
