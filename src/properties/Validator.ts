export type Error = string | undefined;

export type Validator<T> = (value: T | null) => Error;
