import React, {useCallback, useEffect, useRef, useState} from "react";
import bem from "bem-ts";
import {useDispatch, useSelector} from "react-redux";
import {paletteSelector} from "../../selectors/palette";
import {addColor, removeColor, updateColor} from "../../actions/palette";
import { ChromePicker } from 'react-color'
import {defaultColor, nextId} from "../../reducers/palette";


const blk = bem('palette-picker');

const NoColorSvg = () => (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={blk('colornone')}>
        <polyline points="0,0 100,0 100,100 0,100 0,0" stroke="#000" strokeWidth="2" fill="none" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="2" />
        <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="2" />
    </svg>
);

interface PickerItemProps {
    id: number | null,
    color?: string,
    canEdit?: boolean,
    onDelete?: (id: number) => void,
    onSelect?: (id: number | null) => void,
    selected?: boolean;
    ref?: (ref: any) => void;
}

const PickerItem = React.forwardRef((props: PickerItemProps, ref: any) => {
    const { id, color, canEdit, onDelete, onSelect, selected } = props;
    const [editOpen, setEditOpen] = useState(false);
    const dispatch = useDispatch();

    const openEdit = useCallback(() => {
        setEditOpen(true);
    }, [setEditOpen]);

    const closeEdit = useCallback(() => {
        setEditOpen(false);
    }, [setEditOpen]);

    const handleEdit = useCallback((color) => {
        dispatch(updateColor(id as number, color.hex));
    }, [dispatch, id]);

    return (
        <div ref={ref} onClick={() => onSelect && onSelect(id)} className={blk('item', selected ? ['active'] : [])}>
            <div className={blk('info')}>
                <span className={blk('thumb')} style={{backgroundColor: color}}>
                    {!color && <NoColorSvg />}
                </span>
                <span className={blk('label')}>{color ?? 'None'}</span>
            </div>
            {typeof id === 'number' && <div className={blk('actions')}>
                {canEdit && <button onClick={openEdit} className={blk('action', ['edit'])}>
                    <span className="icon">
                        <i className="fas fa-pen" />
                    </span>
                </button>}
                {onDelete && <button onClick={() => onDelete(id)} className={blk('action', ['delete'])}>
                    <span className="icon">
                        <i className="fas fa-times" />
                    </span>
                </button>}
            </div>}
            {editOpen && <div className={blk('popover')}>
                <div className={blk('overlay')} onClick={closeEdit} />
                <ChromePicker color={color} onChangeComplete={handleEdit} />
            </div>}
        </div>
    )
})

interface Props {
    initialValue?: number | null;
    onChange: (id: number | null) => void;
    required?: boolean;
}


const PalettePickerControl = (props: Props) => {
    const [value, setValue] = useState(props.initialValue);
    const palette = useSelector(paletteSelector);
    const ids = Object.keys(palette).map(k => parseInt(k, 10));
    const selectedRef = useRef();
    const dispatch = useDispatch();

    const handleSelection = useCallback((id: number | null) => {
        setValue(id);
        props.onChange(id);
    }, [setValue, props.onChange]);

    const handleDelete = useCallback((id: number | null) => {
        dispatch(removeColor(id as number));
    }, [dispatch]);

    const handleAddColor = useCallback(() => {
        dispatch(addColor(nextId(), defaultColor));
    }, [dispatch]);

    useEffect(() => {
        (selectedRef.current as any)?.scrollIntoView();
    }, []);

    return (
        <div className={blk()}>
            <div className={blk('input')}>
                {!props.required && <PickerItem id={null} onSelect={handleSelection} selected={value === null} />}
                {ids.map(id => (
                    <PickerItem id={id} key={id} color={palette[id]}
                                canEdit
                                onDelete={id === 0 ? undefined : handleDelete}
                                onSelect={handleSelection}
                                selected={value === id}
                                ref={value === id ? selectedRef : undefined}
                    />
                ))}

                <div onClick={handleAddColor} className={blk('item', ['new'])}>
                    <span className="icon">
                        <i className="fas fa-plus" />
                    </span>
                    Add color
                </div>
            </div>
        </div>
    );
}

export default PalettePickerControl;
