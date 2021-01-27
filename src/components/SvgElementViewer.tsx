import React, {SyntheticEvent, useCallback} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {elementsSelector, selectedIdxSelector} from "../selectors/editor";
import SvgCanvas from "./SvgCanvas";
import SvgShapeRenderer from "./SvgShapeRenderer";
import {SvgShape, SvgShapeType} from "../models/svg";
import Scrollable from "./Scrollable";
import {deleteElement, selectShape, setElements} from "../actions/editor";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const blk = bem('svg-element-viewer');

const shapeToLabel = (shape: SvgShape): string => {
    let type = 'Unknown';

    switch (shape.type) {
        case SvgShapeType.TYPE_POLYGON:
            type = 'Polygon';
            break;
        case SvgShapeType.TYPE_CIRCLE:
            type = 'Circle';
            break;
        case SvgShapeType.TYPE_POLYLINE:
            type = 'Polyline';
            break;
        case SvgShapeType.TYPE_LINE:
            type = 'Line';
            break;
    }

    return `${type} #${shape.id}`;
}

const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const SvgElementViewer = () => {
    const elements = useSelector(elementsSelector);
    const selectedIdx = useSelector(selectedIdxSelector);
    const dispatch = useDispatch();

    const handleSelect = useCallback((e: SyntheticEvent, idx: number) => {
        e.stopPropagation();
        dispatch(selectShape(elements.length - idx - 1));
    }, [dispatch, elements]);

    const handleDragEnd = useCallback((result) => {
        if (!result.destination) {
            return;
        }
        dispatch(setElements(reorder(
            elements,
            elements.length - result.source.index - 1,
            elements.length - result.destination.index - 1
        )));
    }, [elements, dispatch]);

    const handleDelete = useCallback((e: SyntheticEvent, id: number) => {
        e.stopPropagation();
        dispatch(deleteElement(id));
    }, [dispatch]);

    const handleDeselect = useCallback(() => {
        dispatch(selectShape(null));
    }, [dispatch]);

    const elementsReversed = [...elements];
    elementsReversed.reverse();

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className={blk()} onClick={handleDeselect}>
                <Scrollable>
                    <div className={blk('content')}>
                        <h2 className="title">Elements</h2>
                        <Droppable droppableId="elements">
                            {((provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={blk('items')}
                                >
                                    {elementsReversed.map((el, idx) =>
                                        <Draggable draggableId={el.id.toString()} index={idx} key={el.id}>
                                            {(innerProvided, snapshot) => (
                                                <div
                                                    key={el.id}
                                                    onClick={(e) => handleSelect(e, idx)}
                                                    className={blk('item', selectedIdx ===  elements.length - idx - 1 ? ['active'] : [])}
                                                    {...innerProvided.draggableProps}
                                                    {...innerProvided.dragHandleProps}
                                                    ref={innerProvided.innerRef}
                                                >
                                                    <div className={blk('info')}>
                                                        <div className={blk('thumb')}>
                                                            <SvgCanvas blk={blk}>
                                                                <SvgShapeRenderer shape={el} />
                                                            </SvgCanvas>
                                                        </div>
                                                        <div className={blk('label')}>
                                                            {shapeToLabel(el)}
                                                        </div>
                                                    </div>
                                                    <div className={blk('actions')}>
                                                        <button onClick={(e) => handleDelete(e, el.id)} className={blk('action', ['delete'])}>
                                                            <span className="icon">
                                                                <i className="fas fa-trash" />
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </div>
                            ))}
                        </Droppable>
                    </div>
                </Scrollable>
            </div>
        </DragDropContext>
    )
}

export default SvgElementViewer;
