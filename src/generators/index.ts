import { tileSelectors } from "./selectors";
import Selector from "./Selector";

const generators = {
    tileSelectors
};

export function getTileSelectorByName(name: string): Selector<any, any> {
    return (generators.tileSelectors as any)[name] as Selector<any, any>;
}

export default generators;
