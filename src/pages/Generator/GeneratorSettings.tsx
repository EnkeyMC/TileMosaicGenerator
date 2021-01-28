import React, {useCallback} from "react";
import bem from "bem-ts";
import Scrollable from "../../components/Scrollable";
import IntegerControl from "../../components/controls/IntegerControl";
import {useDispatch, useSelector} from "react-redux";
import {setCols, setRows} from "../../actions/generator";
import {colsSelector, rowsSelector} from "../../selectors/generator";

const blk = bem('gen-settings');

const GeneratorSettings = () => {
    const rows = useSelector(rowsSelector);
    const cols = useSelector(colsSelector);
    const dispatch = useDispatch();

    const handleRowsChange = useCallback((value: number | null) => {
        dispatch(setRows(value ?? 0));
    }, [dispatch]);

    const handleColsChange = useCallback((value: number | null) => {
        dispatch(setCols(value ?? 0));
    }, [dispatch]);

    return (
        <div className={blk()}>
            <Scrollable>
                <div className={blk('content')}>
                    <h1 className="title">Settings</h1>
                    <div className="field">
                        <label className="label">
                            Rows
                        </label>
                        <IntegerControl onChange={handleRowsChange} required initialValue={rows} />
                    </div>
                    <div className="field">
                        <label className="label">
                            Columns
                        </label>
                        <IntegerControl onChange={handleColsChange} required initialValue={cols} />
                    </div>
                </div>
            </Scrollable>
        </div>
    )
}

export default GeneratorSettings;
