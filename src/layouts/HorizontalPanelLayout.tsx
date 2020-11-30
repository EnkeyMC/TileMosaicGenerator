import React from "react";

interface Props {
    left?: React.ReactNodeArray | React.ReactNode;
    children: React.ReactNodeArray | React.ReactNode;
    right?: React.ReactNodeArray | React.ReactNode;
}

const HorizontalPanelLayout = (props: Props) => {
    return (
        <div className="horizontal-panel">
            <div className="horizontal-panel__side">
                { props.left }
            </div>
            <div className="horizontal-panel__content">
                { props.children }
            </div>
            <div className="horizontal-panel__side">
                { props.right }
            </div>
        </div>
    )
}

export default HorizontalPanelLayout;
