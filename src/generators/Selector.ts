export type SelectorResult = number;

export interface TraversalContext {
    idx: number;
    x: number;
    y: number;
    tileCount: number;
}

export default interface Selector<T, S> {
    label: string;
    description?: string;
    defaultProperties: T;
    state: S,
    selectTile(this: Selector<T, S>, context: TraversalContext, properties: T): SelectorResult;
}

export function bindSelector<T, S>(selector: Selector<T, S>): Selector<T, S> {
    selector.selectTile = selector.selectTile.bind(selector);
    return selector;
}
