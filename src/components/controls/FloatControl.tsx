import React, {useCallback, useState} from "react";

interface Props {
    onChange: (val: number | null) => void;
    initialValue?: number | null;
    required?: boolean;
}

const FloatControl = (props: Props) => {
    const [value, setValue] = useState(props.initialValue);

    const onChange = useCallback(e => {
        const val = e.target.value;
        if (val === '') {
            if (props.required)
                return;
            setValue(null);
            props.onChange(null);
            return;
        }

        setValue(val);
        const i = parseFloat(e.target.value);
        if (!isNaN(i)) {
            props.onChange(i);
        }
    }, [setValue, props.onChange, props.required]);

    return (
        <div className="control">
            <input type="number" className="input" onChange={onChange} value={value ?? ''} step="0.1" />
        </div>
    )
}

export default FloatControl;
