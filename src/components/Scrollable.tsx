import React, {ReactNode} from "react";
import bem from "bem-ts";

const blk = bem('scrollable');

const Scrollable = (props: {children: ReactNode}) => (
    <div className={blk()}>
        <div className={blk('content')}>
            {props.children}
        </div>
    </div>
)

export default Scrollable;
