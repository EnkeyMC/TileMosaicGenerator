import React from "react";
import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Generator = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <h1>Generator</h1>
        </FullscreenPageLayout>
    )
}

export default Generator;
