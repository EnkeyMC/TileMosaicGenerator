import React from "react";
import bem from "bem-ts";

const blk = bem('svg-editor');

const SvgToolbar = () => {
    return (
        <div className={blk('toolbar')}>
            <div className="buttons has-addons is-centered">
                <button className="button">Line</button>
                <button className="button">Polyline</button>
                <button className="button">Circle</button>
                <button className="button">Polygon</button>
            </div>
        </div>
    );
}

export default SvgToolbar;
