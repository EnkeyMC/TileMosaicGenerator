import React, {useCallback, useState} from "react";

interface Props {
    onChange: (val: number | null) => void;
    initialValue?: number | null;
    required?: boolean;
}

const IntegerControl = (props: Props) => {
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

        const i = parseInt(val);
        setValue(i);
        props.onChange(i);
    }, [setValue, props.onChange, props.required]);

    return (
        <div className="control">
            <input type="number" className="input" onChange={onChange} value={value ?? ''} />
        </div>
    )
}

export default IntegerControl;
