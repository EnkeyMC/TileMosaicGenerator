import React from "react";
import FullscreenPageLayout from "layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PanelLayout from "../../layouts/PanelLayout";
import bem from "bem-ts";
import GeneratorSettings from "./GeneratorSettings";
import GenerateMosaic from "../../components/GenerateMosaic";
import TilesSidebar from "./TilesSidebar";

const blk = bem('generator');

const Generator = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <PanelLayout horizontal left={<GeneratorSettings />} right={<TilesSidebar />}>
                <div className={blk()}>
                    <div className={blk('wrap')}>
                        <GenerateMosaic />
                    </div>
                </div>
            </PanelLayout>
        </FullscreenPageLayout>
    )
}

export default Generator;
