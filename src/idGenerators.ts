
export interface IdGenerator {
    setLastId: (id: number) => void;
    getNextId: () => number;
}

function idGeneratorFactory(): IdGenerator {
    let lastId = 0;
    return {
        setLastId: (id: number) => lastId = id,
        getNextId: () => ++lastId
    };
}

export const ShapeIdGenerator: IdGenerator = idGeneratorFactory();

export const PaletteIdGenerator: IdGenerator = idGeneratorFactory();

export const TileIdGenerator: IdGenerator = idGeneratorFactory();
