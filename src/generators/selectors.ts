import Selector, {bindSelector} from "./Selector";
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

export const LinearSelector: Selector<LinearSelectorProperties, {}> = bindSelector({
    label: 'Linear selector',
    description: 'step * index + offset',
    defaultProperties: new LinearSelectorProperties(1, 0),
    selectTile(idx: number, x: number, y: number, properties: LinearSelectorProperties): number {
        return properties.step as number * idx + properties.offset as number;
    }
})

export class GeometricSelectorProperties {
    constructor(q: number, initial: number) {
        this.q = q;
        this.initial = initial;
    }

    @Property<number>(PropertyType.FLOAT, 'q', true, [MinValidator(0)])
    q: number;

    @Property<number>(PropertyType.INTEGER, 'Initial', true, [MinValidator(0)])
    initial: number;
}

export const GeometricSelector: Selector<GeometricSelectorProperties, {last: number}> = bindSelector({
    label: 'Geometric selector',
    description: 'lastValue * q',
    defaultProperties: new GeometricSelectorProperties(1.5, 1),
    state: {last: 0},
    selectTile(idx: number, x: number, y: number, properties: GeometricSelectorProperties): number {
        if (idx === 0) {
            this.state = {last: properties.initial};
        }
        // @ts-ignore
        this.state.last = (this.state?.last ?? 1) * properties.q;
        // @ts-ignore
        return this.state.last;
    }
})

export class FibonacciSelectorProperties {
}

export const FibonacciSelector: Selector<FibonacciSelectorProperties, {n1: number, n2: number}> = bindSelector({
    label: 'Fibonacci selector',
    description: 'Selector using Fibonacci series',
    defaultProperties: new FibonacciSelectorProperties(),
    state: {n1: 1, n2: 1},
    selectTile(idx: number, x: number, y: number, properties: FibonacciSelectorProperties): number {
        if (idx === 0) {
            this.state = {n1: 1, n2: 1};
            return 1;
        } else if (idx === 1) {
            return 1;
        }
        const tmp = this.state?.n1;
        // @ts-ignore
        this.state.n1 = this.state.n2;
        // @ts-ignore
        this.state.n2 = this.state.n2 + tmp;
        // @ts-ignore
        return this.state.n2;
    }
})

export const tileSelectors = {
    LinearSelector,
    GeometricSelector,
    FibonacciSelector
}
