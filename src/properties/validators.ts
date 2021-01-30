import {Validator} from "./Validator";

export const MinValidator: (min: number) => Validator<number | null> =
        min => value => (value && value < min ? `Minimum is ${min}` : undefined);
export const MaxValidator: (max: number) => Validator<number | null> =
        max => value => (value && value > max ? `Maximum is ${max}` : undefined);

