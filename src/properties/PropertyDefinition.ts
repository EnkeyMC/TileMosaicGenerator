import {PropertyType} from "./PropertyType";
import {Validator} from "./Validator";

export interface PropertyDefinition<T> {
    label: string;
    type: PropertyType;
    required?: boolean;
    validators?: Validator<T>;
}

export type PropertyDefinitions = {[key: string]: PropertyDefinition<any>};
