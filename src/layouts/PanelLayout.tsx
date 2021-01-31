import React from "react";
import bem from "bem-ts";
import ErrorBoundary from "../components/ErrorBoundary";

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
                <ErrorBoundary>
                    { props.left }
                </ErrorBoundary>
            </div>
            <div className={blk('content')}>
                <ErrorBoundary>
                    { props.children }
                </ErrorBoundary>
            </div>
            <div className={blk('side')}>
                <ErrorBoundary>
                    { props.right }
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default PanelLayout;
