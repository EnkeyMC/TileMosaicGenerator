import React, {useCallback, useState} from "react";
import {PropertyType} from "../properties/PropertyType";
import IntegerControl from "./controls/IntegerControl";
import FloatControl from "./controls/FloatControl";
import PointControl from "./controls/PointControl";
import PalettePickerControl from "./controls/PalettePickerControl";
import {PropertyDefinition, PropertyDefinitions} from "../properties/PropertyDefinition";
import {Validator} from "../properties/Validator";

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
    const [error, setError] = useState<string>();

    const changeHandler = useCallback((value: T | null) => {
        for (const validator of (props.property.validators ?? []) as Validator<T>[]) {
            const err = validator(value);
            if (err) {
                setError(err);
                return;
            }
        }
        setError(undefined);

        props.onChange(props.propName, value);
    }, [props.propName, props.onChange, props.property, props.property.validators]);

    const Control = propertyControlMap[props.property.type];

    return (
        <div className="field">
            <label className="label">
                {props.property.label}
            </label>
            <Control value={props.value as any} error={error} onChange={changeHandler as any} required={props.property.required} />
        </div>
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
