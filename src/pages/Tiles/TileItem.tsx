import Tile from "../../models/Tile";
import React, {useCallback} from "react";
import bem from "bem-ts";
import SvgCanvas from "../../components/SvgCanvas";
import SvgShapeRenderer from "../../components/SvgShapeRenderer";
import {useDispatch} from "react-redux";
import {deleteTile, duplicateTile, rotate} from "../../actions/tiles";
import { useHistory } from "react-router-dom";
import {TileIdGenerator} from "../../idGenerators";

const blk = bem('tile-item');

const TileItem = (props: {tile: Tile, idx: number}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEdit = useCallback(() => {
        history.push(`/tiles/${props.tile.id}`);
    }, [props.tile, history]);

    const handleDelete = useCallback(() => {
        dispatch(deleteTile(props.tile.id));
    }, [props.tile, dispatch]);

    const handleClone = useCallback(() => {
        dispatch(duplicateTile(props.idx, TileIdGenerator.getNextId()));
    }, [props.idx]);

    const handleRotateCCW = useCallback(() => {
        dispatch(rotate(props.idx, true));
    }, [props.idx, dispatch]);

    const handleRotateCW = useCallback(() => {
        dispatch(rotate(props.idx, false));
    }, [props.idx, dispatch]);

    return (
        <div className={blk()}>
            <div className={blk('thumb')}>
                <SvgCanvas blk={blk}>
                    {props.tile.elements.map(el => <SvgShapeRenderer key={el.id} shape={el} />)}
                </SvgCanvas>
                <div className={blk('actions')}>
                    <button onClick={handleClone} className={blk('action')}>
                        <span className="icon">
                            <i className="fas fa-clone" />
                        </span>
                    </button>
                    <button onClick={handleRotateCCW} className={blk('action')}>
                        <span className="icon">
                            <i className="fas fa-undo" />
                        </span>
                    </button>
                    <button onClick={handleRotateCW} className={blk('action')}>
                        <span className="icon">
                            <i className="fas fa-redo" />
                        </span>
                    </button>
                    <button onClick={handleDelete} className={blk('action', ['delete'])}>
                        <span className="icon">
                            <i className="fas fa-trash" />
                        </span>
                    </button>
                    <button onClick={handleEdit} className={blk('action')}>
                        <span className="icon">
                            <i className="fas fa-pen" />
                        </span>
                    </button>
                </div>
            </div>
            <div className={blk('label')}>
                <span className="has-text-grey">idx: {props.idx}</span>
            </div>
        </div>
    );
}

export const NewTileItem = ({onClick}: {onClick: () => void}) => (
    <div onClick={onClick} className={blk(['new'])}>
        <span className="icon"><i className="fas fa-plus fa-2x" /></span>
    </div>
);

export default TileItem;
