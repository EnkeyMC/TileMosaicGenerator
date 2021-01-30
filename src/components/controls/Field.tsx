import React, {useCallback, useState} from "react";
import {ControlProps} from "./helpers";
import {Validator} from "../../properties/Validator";

interface Props<T> extends ControlProps<T>{
    label: string;
    control: React.ElementType;
    validators?: Validator<T>[];
}

function Field<T>(props: Props<T>) {
    const {control: Control, label, onChange, validators, ...controlProps} = props;
    const [error, setError] = useState<string>();

    const handleChange = useCallback((value: T | null) => {
        for (const validator of (validators ?? [])) {
            const err = validator(value);
            if (err) {
                setError(err);
                return;
            }
        }
        setError(undefined);

        onChange(value);
    }, [onChange, validators]);
    return (
        <div className="field">
            <label className="label">
                {label}
            </label>
            <Control onChange={handleChange} error={error} {...controlProps} />
        </div>
    )
}

export default Field;
