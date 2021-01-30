import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

export interface ControlProps<T> {
    onChange: (val: T | null) => void;
    value?: T | null;
    required?: boolean;
    error?: string;
    [key: string]: any;
}

export function useValue<T>(props: ControlProps<T>): [T | null | undefined, Dispatch<SetStateAction<T | null | undefined>>] {
    const [value, setValue] = useState<T | null | undefined>(props.value);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return [value, setValue];
}

type Validator = (v: any) => boolean;
type Formatter<T> = (v: any, ...args: any[]) => {success: boolean, formatted: T};

interface HasToString {
    toString(): string;
}

export function useControlLogic<T extends HasToString>(props: ControlProps<T>, validator: Validator, formatter: Formatter<T>): [string | T, string | undefined, Dispatch<SetStateAction<T | null>>] {
    const [value, setValue] = useValue(props);
    const [error, setError] = useState<string>();

    const handleChange = useCallback((val: any | null, ...args: any[]) => {
        if (val === null) {
            if (props.required) {
                setError('This field is required');
            } else {
                setError(undefined);
            }

            setValue(val);
            props.onChange(val);
            return;
        }

        if (!validator(val))
            return;

        setValue(val);

        const {success, formatted} = formatter(val, ...args);
        if (success) {
            props.onChange(formatted)
        }
    }, [setValue, props.onChange, props.required, formatter, validator]);

    return [value ?? '', error ?? props.error, handleChange];
}
