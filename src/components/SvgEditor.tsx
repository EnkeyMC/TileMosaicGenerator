import React from "react";
import bem from "bem-ts";
import PanelLayout from "../layouts/PanelLayout";
import SvgToolbar from "./SvgToolbar";
import SvgPropertyEditor from "./SvgPropertyEditor";
import SvgEditorCanvas from "./SvgEditorCanvas";
import SvgElementViewer from "./SvgElementViewer";
import ErrorBoundary from "./ErrorBoundary";

const blk = bem('svg-editor');

const SvgEditor = () => {
    return (
        <div className={blk()}>
            <PanelLayout horizontal left={<SvgElementViewer />} right={<SvgPropertyEditor />}>
                <PanelLayout left={<SvgToolbar />}>
                    <div className={blk('wrap')}>
                        <div className={blk('content')}>
                            <ErrorBoundary>
                                <SvgEditorCanvas />
                            </ErrorBoundary>
                        </div>
                    </div>
                </PanelLayout>
            </PanelLayout>
        </div>
    )
}

export default SvgEditor;
