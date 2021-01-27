import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SvgEditor from "../../components/SvgEditor";

const TileEditor = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <SvgEditor />
        </FullscreenPageLayout>
    );
}

export default TileEditor;
