import React from "react";
import bem from "bem-ts";
import PanelLayout from "../layouts/PanelLayout";
import SvgToolbar from "./SvgToolbar";
import SvgPropertyEditor from "./SvgPropertyEditor";
import SvgEditorCanvas from "./SvgEditorCanvas";

const blk = bem('svg-editor');

const SvgEditor = () => {
    return (
        <div className={blk()}>
            <PanelLayout horizontal right={<SvgPropertyEditor />}>
                <PanelLayout left={<SvgToolbar />}>
                    <div className={blk('wrap')}>
                        <SvgEditorCanvas />
                    </div>
                </PanelLayout>
            </PanelLayout>
        </div>
    )
}

export default SvgEditor;
