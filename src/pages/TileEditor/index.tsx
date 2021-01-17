import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PanelLayout from "../../layouts/PanelLayout";
import SvgEditor from "../../components/SvgEditor";

const TileEditor = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <PanelLayout horizontal
                left={
                    <PanelLayout>

                    </PanelLayout>
                }
            >
                <SvgEditor />
            </PanelLayout>
        </FullscreenPageLayout>
    );
}

export default TileEditor;
