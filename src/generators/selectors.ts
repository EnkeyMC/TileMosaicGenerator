import Selector from "./Selector";
import {Property} from "../properties/decorators";
import {PropertyType} from "../properties/PropertyType";
import {MinValidator} from "../properties/validators";

export class LinearSelectorProperties {
    constructor(step: number, offset: number) {
        this.step = step;
        this.offset = offset;
    }

    @Property<number>(PropertyType.INTEGER, 'Step', true, [MinValidator(0)])
    step: number;

    @Property<number>(PropertyType.INTEGER, 'Offset', true, [MinValidator(0)])
    offset: number;
}

export const LinearSelector: Selector<LinearSelectorProperties, {}> = {
    label: 'Linear selector',
    description: 'step * index + offset',
    defaultProperties: new LinearSelectorProperties(1, 0),
    selectTile(idx: number, x: number, y: number, properties: LinearSelectorProperties): number {
        return properties.step as number * idx + properties.offset as number;
    }
}

export class GeometricSelectorProperties {
    constructor(q: number, initial: number) {
        this.q = q;
        this.initial = initial;
    }

    @Property<number>(PropertyType.FLOAT, 'q', true)
    q: number;

    @Property<number>(PropertyType.INTEGER, 'Initial', true)
    initial: number;
}

export const GeometricSelector: Selector<GeometricSelectorProperties, {last: number}> = {
    label: 'Geometric selector',
    description: 'lastValue * q',
    defaultProperties: new GeometricSelectorProperties(1.5, 1),
    selectTile(idx: number, x: number, y: number, properties: GeometricSelectorProperties): number {
        if (idx === 0) {
            this.state = {last: properties.initial};
        }
        return (this.state?.last ?? 1) * properties.q;
    }
}
