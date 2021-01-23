import React, {useCallback, useState} from "react";
import {Point} from "../../models/svg";

interface Props {
    onChange: (val: Point) => void;
    initialValue?: Point;
    required?: boolean;
}

const PointControl = (props: Props) => {
    const [value, setValue] = useState(props.initialValue);

    const onChange = useCallback(e => {
        const prop = e.target.name;
        const val = e.target.value ?? null;

        if (val === null && props.required)
            return;

        setValue({...value, [prop]:  val} as Point);
        const i = parseFloat(e.target.value);
        const newVal = val === null ? val : i;
        if (!isNaN(newVal)) {
            props.onChange({...value, [prop]: newVal} as Point);
        }
    }, [value, setValue, props.onChange, props.required]);

    return (
        <div className="control">
            <div className="columns">
                <div className="column">
                    <span>X</span>
                    <input type="number" className="input" name="x" onChange={onChange} value={value?.x ?? ''} />
                </div>
                <div className="column">
                    <span>Y</span>
                    <input type="number" className="input" name="y" onChange={onChange} value={value?.y ?? ''} />
                </div>
            </div>
        </div>
    )
}

export default PointControl;
