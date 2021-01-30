import {PropertyType} from "./PropertyType";
import {Validator} from "./Validator";

export function Property<T> (type: PropertyType, label: string, required?: boolean, validators?: Validator<T | null>[]) {
    return (target: any, key: string) => {
        if (!('__propertyDefinitions' in target)) {
            Object.defineProperty(target, '__propertyDefinitions', {value: {}});
        }

        target.__propertyDefinitions[key] = {
            type,
            label,
            required,
            validators
        }
    }
}
