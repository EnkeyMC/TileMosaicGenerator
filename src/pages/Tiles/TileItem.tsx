import Tile from "../../models/Tile";
import React, {useCallback} from "react";
import bem from "bem-ts";
import SvgCanvas from "../../components/SvgCanvas";
import SvgShapeRenderer from "../../components/SvgShapeRenderer";
import {useDispatch} from "react-redux";
import {deleteTile} from "../../actions/tiles";
import { useHistory } from "react-router-dom";

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

    return (
        <div className={blk()}>
            <div className={blk('thumb')}>
                <SvgCanvas blk={blk}>
                    {props.tile.elements.map(el => <SvgShapeRenderer key={el.id} shape={el} />)}
                </SvgCanvas>
                <div className={blk('actions')}>
                    <button onClick={handleEdit} className={blk('action', ['edit'])}>
                        <span className="icon">
                            <i className="fas fa-pen" />
                        </span>
                    </button>
                    <button onClick={handleDelete} className={blk('action', ['delete'])}>
                        <span className="icon">
                            <i className="fas fa-trash" />
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
