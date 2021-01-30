
export default interface Selector<T, S> {
    label: string;
    description?: string;
    defaultProperties: T;
    state?: S,
    selectTile(idx: number, x: number, y: number, properties: T): number;
}

export function bindSelector<T, S>(selector: Selector<T, S>): Selector<T, S> {
    selector.selectTile = selector.selectTile.bind(selector);
    return selector;
}
