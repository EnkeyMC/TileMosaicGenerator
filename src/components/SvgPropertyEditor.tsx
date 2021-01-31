import React, {useCallback} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {selectedIdxSelector, shapeSelector} from "../selectors/editor";
import {propertiesMap} from "../models/svg";
import {elemPropChange} from "../actions/editor";
import Scrollable from "./Scrollable";
import PropertyEditor from "./PropertyEditor";


const blk = bem('svg-properties');

const SvgPropertyEditor = () => {
    const selectedIdx = useSelector(selectedIdxSelector);
    const shape = useSelector(shapeSelector(selectedIdx ?? 0));

    const dispatch = useDispatch();

    const handleChange = useCallback((key: string, value: any) => {
        dispatch(elemPropChange(selectedIdx as number, key, value));
    }, [selectedIdx, dispatch]);

    const propAccessor = useCallback(prop => {
        return shape && shape[prop];
    }, [shape]);

    return (
        <div className={blk()}>
            <Scrollable>
                <h2 className={"title " + blk('title')}>Properties</h2>

                {selectedIdx === null ?
                    <p className={blk('text', ['unselected'])}>No shape selected</p>
                    :
                    <PropertyEditor
                        definitions={propertiesMap[shape.type]}
                        valueAccessor={propAccessor}
                        onChange={handleChange}
                    />
                }
            </Scrollable>
        </div>
    );
}

export default SvgPropertyEditor;
