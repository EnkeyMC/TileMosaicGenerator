import React, {useCallback, useMemo} from "react";
import ReactDOMServer from 'react-dom/server';
import bem from "bem-ts";
import Scrollable from "../../components/Scrollable";
import IntegerControl from "../../components/controls/IntegerControl";
import {Provider, useDispatch, useSelector} from "react-redux";
import {setCols, setRows, setSelector, setSelectorProperty} from "../../actions/generator";
import {
    colsSelector,
    rowsSelector,
    tileSelectorKeySelector,
    tileSelectorPropertiesSelector
} from "../../selectors/generator";
import Field from "../../components/controls/Field";
import {MinValidator} from "../../properties/validators";
import SelectControl from "../../components/controls/SelectControl";
import generators, {getTileSelectorByName} from "../../generators";
import PropertyEditor from "../../components/PropertyEditor";
import {getPropertyDefinitions} from "../../properties/decorators";
import {download} from "../../utils";
import GenerateMosaic from "../../components/GenerateMosaic";
import store from "../../reducers";

const blk = bem('gen-settings');

const GeneratorSettings = () => {
    const rows = useSelector(rowsSelector);
    const cols = useSelector(colsSelector);
    const tileSelectorKey = useSelector(tileSelectorKeySelector);
    const tileSelector = getTileSelectorByName(tileSelectorKey);
    const tileSelectorProperties = useSelector(tileSelectorPropertiesSelector);
    const dispatch = useDispatch();

    const handleRowsChange = useCallback((value: number | null) => {
        dispatch(setRows(value ?? 0));
    }, [dispatch]);

    const handleColsChange = useCallback((value: number | null) => {
        dispatch(setCols(value ?? 0));
    }, [dispatch]);

    const handleTileSelectorChange = useCallback(value => {
        dispatch(setSelector(value));
    }, [dispatch]);

    const selectorChoices = useMemo(() => Object.keys(generators.tileSelectors).map((choice) => ({
        key: choice,
        label: getTileSelectorByName(choice).label
    })), [generators.tileSelectors]);

    const propertiesValueAccessor = useCallback((name) => {
        return tileSelectorProperties[name];
    }, [tileSelectorProperties]);

    const handlePropertyChange = useCallback((name, value) => {
        dispatch(setSelectorProperty(name, value));
    }, [dispatch]);

    const handleExport = useCallback(() => {
        download('mosaic.svg', ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
                <GenerateMosaic />
            </Provider>
        ))
    }, []);

    return (
        <div className={blk()}>
            <Scrollable>
                <div className={blk('content')}>
                    <h1 className="title">Settings</h1>
                    <button onClick={handleExport} className="button is-fullwidth is-link mb-3">Export mosaic</button>
                    <Field<number>
                        control={IntegerControl}
                        label="Rows"
                        onChange={handleRowsChange}
                        validators={[MinValidator(1)]}
                        required
                        value={rows} />
                    <Field<number>
                        control={IntegerControl}
                        label="Columns"
                        onChange={handleColsChange}
                        validators={[MinValidator(1)]}
                        required
                        value={cols} />

                    <div className="field-container">
                        <Field<string>
                            label="Tile selector"
                            control={SelectControl}
                            onChange={handleTileSelectorChange}
                            value={tileSelectorKey}
                            choices={selectorChoices}
                            required />
                        <p className="help">{tileSelector.description}</p>
                        <PropertyEditor
                            definitions={getPropertyDefinitions(tileSelector.defaultProperties)}
                            valueAccessor={propertiesValueAccessor}
                            onChange={handlePropertyChange} />
                    </div>
                </div>
            </Scrollable>
        </div>
    )
}

export default GeneratorSettings;
