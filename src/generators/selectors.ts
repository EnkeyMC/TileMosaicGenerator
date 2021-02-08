import Selector, {bindSelector, SelectorResult} from "./Selector";
import {Property} from "../properties/decorators";
import {PropertyType} from "../properties/PropertyType";
import {MinValidator} from "../properties/validators";
import Big from "big.js";
import random from "random";
import seedrandom from "seedrandom";

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

export const LinearSelector: Selector<LinearSelectorProperties, undefined> = bindSelector({
    label: 'Linear selector',
    description: 'step * index + offset',
    defaultProperties: new LinearSelectorProperties(1, 0),
    state: undefined,
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

export const GeometricSelector: Selector<GeometricSelectorProperties, SelectorResult> = bindSelector({
    label: 'Geometric selector',
    description: 'lastValue * q',
    defaultProperties: new GeometricSelectorProperties(1.5, 1),
    state: new Big(0),
    selectTile(idx: number, x: number, y: number, properties: GeometricSelectorProperties): SelectorResult {
        if (idx === 0) {
            this.state = new Big(properties.initial);
            return this.state;
        }
        this.state = (this.state ?? new Big(1)).times(new Big(properties.q));
        return this.state;
    }
})

export class FibonacciSelectorProperties {
}

export const FibonacciSelector: Selector<FibonacciSelectorProperties, {n1: SelectorResult, n2: SelectorResult}> = bindSelector({
    label: 'Fibonacci selector',
    description: 'Selector using Fibonacci series',
    defaultProperties: new FibonacciSelectorProperties(),
    state: {n1: new Big(1), n2: new Big(1)},
    selectTile(idx: number, x: number, y: number, properties: FibonacciSelectorProperties): SelectorResult {
        if (idx === 0) {
            this.state = {n1: new Big(1), n2: new Big(1)};
            return new Big(1);
        } else if (idx === 1) {
            return new Big(1);
        }
        const tmp = this.state.n1;
        this.state.n1 = this.state.n2;
        this.state.n2 = this.state.n2.add(tmp);
        return this.state.n2;
    }
})

export class UniformRandomSelectorProperties {
    constructor(seed: number) {
        this.seed = seed;
    }

    @Property<string>(PropertyType.INTEGER, "Seed", true)
    seed: number;
}

export const UniformRandomSelector: Selector<UniformRandomSelectorProperties, () => number> = {
    label: 'Uniform random selector',
    description: 'Selector using uniform seeded random generator',
    get defaultProperties() {
        return new UniformRandomSelectorProperties(random.int(1000000, 999999999));
    },
    state: random.uniform(),
    selectTile(idx: number, x: number, y: number, properties: UniformRandomSelectorProperties): SelectorResult {
        if (idx === 0) {
            this.state = (random as any).clone(seedrandom(properties.seed.toString())).uniform(0, 10000);
        }

        return this.state();
    }
}

export const tileSelectors = {
    LinearSelector,
    GeometricSelector,
    FibonacciSelector,
    UniformRandomSelector
}
