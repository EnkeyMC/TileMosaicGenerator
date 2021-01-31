import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import SvgCanvas from "./SvgCanvas";
import SvgShapeRenderer from "./SvgShapeRenderer";
import React, {useCallback} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {tilesSelector} from "../selectors/tiles";
import {setTiles} from "../actions/tiles";
import {reorder} from "../utils";

const blk = bem('reorder');

const ReorderableTileList = () => {
    const tiles = useSelector(tilesSelector);
    const dispatch = useDispatch();

    const handleDragEnd = useCallback((result) => {
        if (!result.destination) {
            return;
        }
        dispatch(setTiles(reorder(
            tiles,
            result.source.index,
            result.destination.index
        )));
    }, [tiles, dispatch]);

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className={blk('columns')}>
                <div className={blk('col', ['idx'])}>
                    {tiles.map((_, idx) => (
                        <div key={idx} className={blk('item', ['idx'])}>{idx}</div>
                    ))}
                </div>
                <Droppable droppableId="tiles">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={blk('col', ['items'])}
                        >
                            {tiles.map((tile, idx) => (
                                <Draggable key={tile.id} draggableId={tile.id.toString()} index={idx}>
                                    {(innerProvided) => (
                                        <div
                                            {...innerProvided.dragHandleProps}
                                            {...innerProvided.draggableProps}
                                            ref={innerProvided.innerRef}
                                            className={blk('item', ['tile'])}
                                        >
                                            <div className={blk('thumb')}>
                                                <SvgCanvas blk={blk}>
                                                    {tile.elements.map(el => <SvgShapeRenderer key={el.id} shape={el} />)}
                                                </SvgCanvas>
                                            </div>
                                            <div className={blk('label')}>
                                                ID: {tile.id}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}

export default ReorderableTileList;
