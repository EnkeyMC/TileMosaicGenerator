import React, {ReactNode, ReactNodeArray} from "react";

interface Props {
    header?: ReactNode | ReactNodeArray
    children: ReactNode | ReactNodeArray
    footer?: ReactNode | ReactNodeArray
}

const FullscreenPageLayout = (props: Props) => {
    return (
        <div className="fullscreen-layout">
            <div className="fullscreen-layout__header">
                { props.header }
            </div>
            <div className="fullscreen-layout__content">
                { props.children }
            </div>
            <div className="fullscreen-layout__footer">
                { props.footer }
            </div>
        </div>
    );
}

export default FullscreenPageLayout;
