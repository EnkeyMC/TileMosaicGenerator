import React, {useCallback} from "react";
import {PropertyType} from "../properties/PropertyType";
import IntegerControl from "./controls/IntegerControl";
import FloatControl from "./controls/FloatControl";
import PointControl from "./controls/PointControl";
import PalettePickerControl from "./controls/PalettePickerControl";
import {PropertyDefinition, PropertyDefinitions} from "../properties/PropertyDefinition";
import Field from "./controls/Field";

const propertyControlMap = {
    [PropertyType.INTEGER]: IntegerControl,
    [PropertyType.FLOAT]: FloatControl,
    [PropertyType.POINT]: PointControl,
    [PropertyType.COLOR]: PalettePickerControl,
}

interface PropertyInputProps<T> {
    property: PropertyDefinition<T>;
    propName: string;
    value: T | null;
    onChange: (propName: string, value: T | null) => void;
}

function PropertyInput<T>(props: PropertyInputProps<T>) {
    const Control = propertyControlMap[props.property.type];

    const handleChange = useCallback(value => {
        props.onChange(props.propName, value);
    }, [props.onChange, props.propName]);

    return (
        <Field
            control={Control}
            label={props.property.label}
            value={props.value as any}
            onChange={handleChange as any}
            required={props.property.required}
            validators={props.property.validators}
        />
    )
}

interface Props {
    definitions: PropertyDefinitions;
    valueAccessor: (key: string) => any;
    onChange: (key: string, value: any) => void;
}

const PropertyEditor = (props: Props) => {
    const properties = Object.keys(props.definitions);

    return (
        <div>
            {properties.map(prop =>
                <PropertyInput<any>
                    key={prop}
                    property={props.definitions[prop]}
                    propName={prop}
                    value={props.valueAccessor(prop)}
                    onChange={props.onChange}
                />
            )}
        </div>
    );
}

export default PropertyEditor
