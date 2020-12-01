import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PanelLayout from "../../layouts/PanelLayout";

const TileEditor = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <PanelLayout horizontal
                left={
                    <PanelLayout>

                    </PanelLayout>
                }
            >
                <h1>Ahoj</h1>
            </PanelLayout>
        </FullscreenPageLayout>
    );
}

export default TileEditor;
