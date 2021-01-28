import React, {EventHandler, ReactNode, SyntheticEvent} from "react";

interface Props {
    svgRef?: (el: SVGSVGElement) => void;
    blk?: (element: string) => string;
    eventHandlers?: {
        onClick?: EventHandler<SyntheticEvent>;
        onMouseMove?: EventHandler<SyntheticEvent>;
        onMouseLeave?: EventHandler<SyntheticEvent>;
        onContextMenu?: EventHandler<SyntheticEvent>;
    };
    children?: ReactNode;
    overlay?: ReactNode;
    padding?: number;
    width?: number;
    height?: number;
}

const SvgCanvas = (props: Props) => {
    const padding = props.padding ?? 0;
    const blk = props.blk ?? (() => '');
    return (
        <svg preserveAspectRatio="xMidYMid meet" ref={props.svgRef} width={props.width} height={props.height} viewBox={`${0 - padding} ${0 - padding} ${100 + padding*2} ${100 + padding*2}`} className={blk('svg')} {...props.eventHandlers}>
            {props.children}
            {props.overlay && <g className="no-pointer-events">
                {props.overlay}
            </g>}
        </svg>
    )
}

export default SvgCanvas;
