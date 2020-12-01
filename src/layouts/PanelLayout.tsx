import React from "react";

interface Props {
    horizontal?: boolean;
    left?: React.ReactNodeArray | React.ReactNode;
    children: React.ReactNodeArray | React.ReactNode;
    right?: React.ReactNodeArray | React.ReactNode;
}

const PanelLayout = (props: Props) => {
    return (
        <div className={"panel-layout panel-layout--" + (props.horizontal ? 'horizontal' : 'vertical')}>
            <div className="panel-layout__side">
                { props.left }
            </div>
            <div className="panel-layout__content">
                { props.children }
            </div>
            <div className="panel-layout__side">
                { props.right }
            </div>
        </div>
    )
}

export default PanelLayout;
