import React from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {selectTool} from "../actions/editor";
import {Tools} from "../editor-tools";
import {toolSelector} from "../selectors/editor";

const blk = bem('svg-editor');

const SvgToolbar = () => {
    const dispatch = useDispatch();
    const selectedTool = useSelector(toolSelector);
    return (
        <div className={blk('toolbar')}>
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
