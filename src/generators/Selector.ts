
export default interface Selector<T, S> {
    label: string;
    description?: string;
    defaultProperties: T;
    state?: S,
    selectTile(idx: number, x: number, y: number, properties: T): number;
}
