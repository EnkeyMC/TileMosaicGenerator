import {PropertyType} from "./PropertyType";
import {Validator} from "./Validator";
import {PropertyDefinitions} from "./PropertyDefinition";

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

export function getPropertyDefinitions(obj: any): PropertyDefinitions {
    return obj.__propertyDefinitions ?? {};
}
