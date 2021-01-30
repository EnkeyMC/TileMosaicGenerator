import React, {useCallback} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {selectTool} from "../actions/editor";
import {Tools} from "../editor-tools";
import {elementsSelector, toolSelector} from "../selectors/editor";
import {setTile} from "../actions/tiles";
import {useHistory, useParams} from "react-router-dom";
import {TileIdGenerator} from "../idGenerators";

const blk = bem('svg-editor');

const SvgToolbar = () => {
    const dispatch = useDispatch();
    const selectedTool = useSelector(toolSelector);
    const elements = useSelector(elementsSelector);
    const history = useHistory();

    const params = useParams<{id: string}>();
    const id = params.id ? parseInt(params.id) : null;

    const handleSave = useCallback(() => {
        dispatch(setTile({
            id: id !== null ? id : TileIdGenerator.getNextId(),
            elements
        }));
        history.push('/tiles');
    }, [elements, dispatch, history, id]);

    return (
        <div className={blk('toolbar')}>
            <button className="button" onClick={handleSave}>Save</button>
            <div className="buttons has-addons is-centered">
                <button className={"button" + (selectedTool === Tools.SELECT ? " is-dark" : "")} onClick={() => dispatch(selectTool(Tools.SELECT))}>Select</button>
                <button className={"button" + (selectedTool === Tools.LINE ? " is-dark" : "")} onClick={() => dispatch(selectTool(Tools.LINE))}>Line</button>
                <button className={"button" + (selectedTool === Tools.POLYLINE ? " is-dark" : "")} onClick={() => dispatch(selectTool(Tools.POLYLINE))}>Polyline</button>
                <button className={"button" + (selectedTool === Tools.CIRCLE ? " is-dark" : "")} onClick={() => dispatch(selectTool(Tools.CIRCLE))}>Circle</button>
                <button className={"button" + (selectedTool === Tools.POLYGON ? " is-dark" : "")} onClick={() => dispatch(selectTool(Tools.POLYGON))}>Polygon</button>
            </div>
        </div>
    );
}

export default SvgToolbar;
