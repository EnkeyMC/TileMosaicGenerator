import React, {EventHandler, ReactNode, SyntheticEvent} from "react";

interface Props {
    svgRef?: (el: SVGSVGElement) => void;
    blk: (element: string) => string;
    eventHandlers?: {
        onClick?: EventHandler<SyntheticEvent>;
        onMouseMove?: EventHandler<SyntheticEvent>;
        onMouseLeave?: EventHandler<SyntheticEvent>;
        onContextMenu?: EventHandler<SyntheticEvent>;
    };
    children?: ReactNode;
    overlay?: ReactNode;
}

const SvgCanvas = (props: Props) => {
    return (
        <svg ref={props.svgRef} viewBox="0 0 100 100" className={props.blk('svg')} {...props.eventHandlers}>
            {props.children}
            {props.overlay && <g className="no-pointer-events">
                {props.overlay}
            </g>}
        </svg>
    )
}

export default SvgCanvas;
