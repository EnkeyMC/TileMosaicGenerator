import React, {useCallback} from "react";
import {ControlProps, useControlLogic} from "./helpers";


const FloatControl = (props: ControlProps<number>) => {
    const validator = useCallback(val => /^-?\d*(\d\.\d*)?$/.test(val as string), []);
    const formatter = useCallback(val => {
        const i = parseFloat(val);
        return {success: !isNaN(i), formatted: i};
    }, []);

    const [value, error, onChange] = useControlLogic<number>(props, validator, formatter);

    const handleChange = useCallback(e => {
        const val = e.target.value;
        onChange(val === '' ? null : val);
    }, [onChange]);

    return (
        <>
            <div className="control">
                <input type="number" className="input" onChange={handleChange} value={value} step="0.1" />
            </div>
            {error && <p className="help is-danger">{error}</p>}
        </>
    )
}

export default FloatControl;
