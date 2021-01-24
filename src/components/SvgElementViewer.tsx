import React, {useCallback} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {elementsSelector, selectedIdxSelector} from "../selectors/editor";
import SvgCanvas from "./SvgCanvas";
import SvgShapeRenderer from "./SvgShapeRenderer";
import {SvgShape, SvgShapeType} from "../models/svg";
import Scrollable from "./Scrollable";
import {selectShape} from "../actions/editor";

const blk = bem('svg-element-viewer');

const shapeToLabel = (shape: SvgShape): string => {
    let type = 'Unknown';

    switch (shape.type) {
        case SvgShapeType.TYPE_POLYGON:
            type = 'Polygon';
            break;
        case SvgShapeType.TYPE_CIRCLE:
            type = 'Circle';
            break;
        case SvgShapeType.TYPE_POLYLINE:
            type = 'Polyline';
            break;
        case SvgShapeType.TYPE_LINE:
            type = 'Line';
            break;
    }

    return `${type} #${shape.id}`;
}

const SvgElementViewer = () => {
    const elements = useSelector(elementsSelector);
    const selectedIdx = useSelector(selectedIdxSelector);
    const dispatch = useDispatch();

    const handleSelect = useCallback((idx: number) => {
        dispatch(selectShape(idx));
    }, [dispatch]);

    return (
        <div className={blk()}>
            <Scrollable>
                <div className={blk('content')}>
                    <h2 className="title">Elements</h2>
                    <div className={blk('items')}>
                        {elements.map((el, idx) =>
                            <div onClick={() => handleSelect(idx)} className={blk('item', selectedIdx === idx ? ['active'] : [])}>
                                <div className={blk('thumb')}>
                                    <SvgCanvas blk={blk}>
                                        <SvgShapeRenderer shape={el} />
                                    </SvgCanvas>
                                </div>
                                <div className={blk('label')}>
                                    {shapeToLabel(el)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Scrollable>
        </div>
    )
}

export default SvgElementViewer;
