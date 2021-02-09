import Selector, {bindSelector, SelectorResult, TraversalContext} from "./Selector";
import {Property} from "../properties/decorators";
import {PropertyType} from "../properties/PropertyType";
import {MinValidator} from "../properties/validators";
import Big from "big.js";
import random from "random";
import seedrandom from "seedrandom";
import {join} from "path";

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
    selectTile(context: TraversalContext, properties: LinearSelectorProperties): number {
        return Math.round(properties.step * context.idx + properties.offset) % context.tileCount;
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

export const GeometricSelector: Selector<GeometricSelectorProperties, Big> = bindSelector({
    label: 'Geometric selector',
    description: 'lastValue * q',
    defaultProperties: new GeometricSelectorProperties(1.5, 1),
    state: new Big(0),
    selectTile(context: TraversalContext, properties: GeometricSelectorProperties): SelectorResult {
        if (context.idx === 0) {
            this.state = new Big(properties.initial);
            return this.state.mod(context.tileCount).toNumber();
        }
        this.state = this.state.times(new Big(properties.q));
        return Math.floor(this.state.mod(context.tileCount).toNumber());
    }
})

export class FibonacciSelectorProperties {
}

export const FibonacciSelector: Selector<FibonacciSelectorProperties, {n1: Big, n2: Big}> = bindSelector({
    label: 'Fibonacci selector',
    description: 'Selector using Fibonacci series',
    defaultProperties: new FibonacciSelectorProperties(),
    state: {n1: new Big(1), n2: new Big(1)},
    selectTile(context: TraversalContext, properties: FibonacciSelectorProperties): SelectorResult {
        if (context.idx === 0) {
            this.state = {n1: new Big(1), n2: new Big(1)};
            return 0;
        } else if (context.idx === 1) {
            return 0;
        }
        const tmp = this.state.n1;
        this.state.n1 = this.state.n2;
        this.state.n2 = this.state.n2.add(tmp);
        return Math.floor(this.state.n2.sub(1).mod(context.tileCount).toNumber());
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
    selectTile(context: TraversalContext, properties: UniformRandomSelectorProperties): SelectorResult {
        if (context.idx === 0) {
            this.state = (random as any).clone(seedrandom(properties.seed.toString())).uniform(0, context.tileCount - 1);
        }

        return Math.floor(this.state());
    }
}

export class LinearXYSelectorProperties {
    constructor(c1: number, c2: number, offset: number) {
        this.c1 = c1;
        this.c2 = c2;
        this.offset = offset;
    }

    @Property<number>(PropertyType.FLOAT, 'Coefficient 1', true)
    c1: number;
    @Property<number>(PropertyType.FLOAT, 'Coefficient 2', true)
    c2: number;
    @Property<number>(PropertyType.FLOAT, 'Offset', true)
    offset: number;
}

export const LinearXYSelector: Selector<LinearXYSelectorProperties, undefined> = {
    label: 'Linear XY selector',
    description: 'c1*x + c2*y + offset',
    defaultProperties: new LinearXYSelectorProperties(1, 1, 0),
    state: undefined,
    selectTile(context: TraversalContext, properties: LinearXYSelectorProperties): SelectorResult {
        return Math.max(Math.round(properties.c1*context.x + properties.c2*context.y + properties.offset) % context.tileCount, 0);
    }
}

export class QuadraticXYSelectorProperties {
    constructor(c1: number, c2: number, offset: number) {
        this.c1 = c1;
        this.c2 = c2;
        this.offset = offset;
    }

    @Property<number>(PropertyType.FLOAT, 'Coefficient 1', true)
    c1: number;
    @Property<number>(PropertyType.FLOAT, 'Coefficient 2', true)
    c2: number;
    @Property<number>(PropertyType.FLOAT, 'Offset', true)
    offset: number;
}

export const QuadraticXYSelector: Selector<QuadraticXYSelectorProperties, undefined> = {
    label: 'Quadratic XY selector',
    description: 'c1*x^2 + c2*y^2 + offset',
    defaultProperties: new QuadraticXYSelectorProperties(1, 1, 0),
    state: undefined,
    selectTile(context: TraversalContext, properties: QuadraticXYSelectorProperties): SelectorResult {
        return Math.max(Math.round(properties.c1*context.x*context.x + properties.c2*context.y*context.y + properties.offset) % context.tileCount, 0);
    }
}

export const tileSelectors = {
    LinearSelector,
    GeometricSelector,
    FibonacciSelector,
    UniformRandomSelector,
    LinearXYSelector,
    QuadraticXYSelector
}
