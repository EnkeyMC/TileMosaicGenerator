import React, {useCallback} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {selectedIdxSelector, shapeSelector} from "../selectors/editor";
import {Properties, propertiesMap, Property, PropertyType} from "../models/svg";
import IntegerControl from "./controls/IntegerControl";
import {elemPropChange} from "../actions/editor";
import FloatControl from "./controls/FloatControl";
import PointControl from "./controls/PointControl";
import PalettePickerControl from "./controls/PalettePickerControl";
import Scrollable from "./Scrollable";


const blk = bem('svg-properties');

const PropertyInput = (props: {property: Property, propName: string, initialValue: any, shapeIdx: number}) => {
    const dispatch = useDispatch();

    const changeHandler = useCallback((value: any) => {
        dispatch(elemPropChange(props.shapeIdx, props.propName, value));
    }, [props.shapeIdx, props.propName, dispatch]);

    const ResolveControl = useCallback(({initialValue, onChange, required}) => {
        switch (props.property.type) {
            case PropertyType.INTEGER:
                return <IntegerControl initialValue={initialValue} onChange={onChange} required={required} />
            case PropertyType.FLOAT:
                return <FloatControl initialValue={initialValue} onChange={onChange} required={required} />
            case PropertyType.POINT:
                return <PointControl initialValue={initialValue} onChange={onChange} required={required} />
            case PropertyType.COLOR:
                return <PalettePickerControl initialValue={initialValue} onChange={onChange} required={required} />
            default:
                return null;
        }
    }, [props.property.type, props.shapeIdx]);

    return (
        <div className="field">
            <label className="label">
                {props.property.label}
            </label>
            <ResolveControl initialValue={props.initialValue} onChange={changeHandler} />
        </div>
    )
}

const PropertiesEditor = (props: {shapeIdx: number}) => {
    const shape = useSelector(shapeSelector(props.shapeIdx));
    const propertyTypes: Properties = propertiesMap[shape.type];
    const properties = Object.keys(propertyTypes);

    return (
        <div>
            {properties.map(prop =>
                <PropertyInput
                    key={prop}
                    property={propertyTypes[prop]}
                    propName={prop}
                    initialValue={shape[prop]}
                    shapeIdx={props.shapeIdx} />
            )}
        </div>
    );
}

const SvgPropertyEditor = () => {
    const selectedIdx = useSelector(selectedIdxSelector);

    return (
        <div className={blk()}>
            <Scrollable>
                <h2 className={"title " + blk('title')}>Properties</h2>

                {selectedIdx === null ?
                    <p className={blk('text', ['unselected'])}>No shape selected</p>
                    :
                    <PropertiesEditor shapeIdx={selectedIdx} />
                }
            </Scrollable>
        </div>
    );
}

export default SvgPropertyEditor;
