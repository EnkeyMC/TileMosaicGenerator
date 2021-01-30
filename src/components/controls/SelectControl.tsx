import {ControlProps, useControlLogic} from "./helpers";
import React, {ReactNode, useCallback} from "react";

type KeyType = string | number;

interface Props<T extends KeyType> extends ControlProps<T> {
    choices: {
        key: T | null;
        label: ReactNode;
    }[];
}

export default function SelectControl<T extends KeyType>(props: Props<T>) {
    const validator = useCallback(_ => true, []);
    const formatter = useCallback(val => {
        return {success: true, formatted: val};
    }, []);

    const [value, error, onChange] = useControlLogic<T>(props, validator, formatter);

    const handleChange = useCallback(e => {
        const val = e.target.value;
        onChange(val);
    }, [onChange]);

    return (
        <>
            <div className="control">
                <div className="select">
                    <select className="input" onChange={handleChange} value={value as string}>
                        {props.choices && props.choices.map(choice => (
                            <option key={choice.key} value={choice.key as any}>{choice.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            {error && <p className="help is-danger">{error}</p>}
        </>
    )
}
