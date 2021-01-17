import React from "react";
import bem from "bem-ts";

interface Props {
    horizontal?: boolean;
    left?: React.ReactNodeArray | React.ReactNode;
    children: React.ReactNodeArray | React.ReactNode;
    right?: React.ReactNodeArray | React.ReactNode;
}

const blk = bem('panel-layout');

const PanelLayout = (props: Props) => {
    const horizontal = props.horizontal;
    return (
        <div className={blk({horizontal, vertical: !horizontal})}>
            <div className={blk('side')}>
                { props.left }
            </div>
            <div className={blk('content')}>
                { props.children }
            </div>
            <div className={blk('side')}>
                { props.right }
            </div>
        </div>
    )
}

export default PanelLayout;
