import React from "react";
import bem from "bem-ts";
import {useDispatch} from "react-redux";
import {selectTool} from "../actions/editor";
import {Tools} from "../editor-tools";

const blk = bem('svg-editor');

const SvgToolbar = () => {
    const dispatch = useDispatch();
    return (
        <div className={blk('toolbar')}>
            <div className="buttons has-addons is-centered">
                <button className="button" onClick={() => dispatch(selectTool(Tools.SELECT))}>Select</button>
                <button className="button" onClick={() => dispatch(selectTool(Tools.LINE))}>Line</button>
                <button className="button" onClick={() => dispatch(selectTool(Tools.POLYGON))}>Polyline</button>
                <button className="button" onClick={() => dispatch(selectTool(Tools.CIRCLE))}>Circle</button>
                <button className="button" onClick={() => dispatch(selectTool(Tools.POLYGON))}>Polygon</button>
            </div>
        </div>
    );
}

export default SvgToolbar;
