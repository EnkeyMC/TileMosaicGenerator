import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HorizontalPanelLayout from "../../layouts/HorizontalPanelLayout";

const TileEditor = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <HorizontalPanelLayout>
                <h1>Ahoj</h1>
            </HorizontalPanelLayout>
        </FullscreenPageLayout>
    );
}

export default TileEditor;
