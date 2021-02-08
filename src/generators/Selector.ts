import Big from "big.js";

export type SelectorResult = Big | number;

export default interface Selector<T, S> {
    label: string;
    description?: string;
    defaultProperties: T;
    state: S,
    selectTile(this: Selector<T, S>, idx: number, x: number, y: number, properties: T): SelectorResult;
}

export function bindSelector<T, S>(selector: Selector<T, S>): Selector<T, S> {
    selector.selectTile = selector.selectTile.bind(selector);
    return selector;
}
