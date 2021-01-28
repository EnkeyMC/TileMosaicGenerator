import React, {useCallback} from "react";
import FullscreenPageLayout from "../../layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bem from "bem-ts";
import Scrollable from "../../components/Scrollable";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import {tilesSelector} from "../../selectors/tiles";
import SvgCanvas from "../../components/SvgCanvas";
import SvgShapeRenderer from "../../components/SvgShapeRenderer";
import {setTiles} from "../../actions/tiles";
import {reorder} from "../../utils";
import {NavLink} from "react-router-dom";

const blk = bem('reorder');


const Reorder = () => {
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
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <Scrollable>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className={blk()}>
                        <div className={blk('heading')}>
                            <h1 className="title">Reorder tiles</h1>
                            <p className={blk('actions')}>
                                <NavLink to="/tiles">Back</NavLink>
                            </p>
                        </div>
                        <p className="subtitle">Reorder tiles by drag & drop</p>
                        <div className={blk('columns')}>
                            <div className={blk('col', ['idx'])}>
                                {tiles.map((_, idx) => (
                                    <div className={blk('item', ['idx'])}>{idx}</div>
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
                    </div>
                </DragDropContext>
            </Scrollable>
        </FullscreenPageLayout>
    );
}

export default Reorder;
