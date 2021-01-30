import React, {useCallback} from "react";
import {Point} from "../../models/svg";
import {ControlProps} from "./helpers";
import FloatControl from "./FloatControl";


const PointControl = (props: ControlProps<Point>) => {
    const handleChange = useCallback((name: string, value: number | null) => {
        props.onChange({...props.value, [name]: value} as Point);
    }, [props.onChange, props.value]);

    return (
        <div className="control">
            <div className="columns">
                <div className="column">
                    <span>X</span>
                    <FloatControl
                        onChange={val => handleChange('x', val)}
                        required={props.required}
                        value={props.value?.x} />
                </div>
                <div className="column">
                    <span>Y</span>
                    <FloatControl
                        onChange={val => handleChange('y', val)}
                        required={props.required}
                        value={props.value?.y} />
                </div>
            </div>
            {props.error && <p className="help is-danger">{props.error}</p>}
        </div>
    )
}

export default PointControl;
