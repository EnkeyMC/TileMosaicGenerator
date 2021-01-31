import React from "react";
import FullscreenPageLayout from "../../layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bem from "bem-ts";
import Scrollable from "../../components/Scrollable";
import {NavLink} from "react-router-dom";
import ReorderableTileList from "../../components/ReorderableTileList";

const blk = bem('reorder');

const Reorder = () => {
    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <Scrollable>
                <div className={blk()}>
                    <div className={blk('heading')}>
                        <h1 className="title">Reorder tiles</h1>
                        <p className={blk('actions')}>
                            <NavLink to="/tiles">Back</NavLink>
                        </p>
                    </div>
                    <p className="subtitle">Reorder tiles by drag & drop</p>
                    <ReorderableTileList />
                </div>
            </Scrollable>
        </FullscreenPageLayout>
    );
}

export default Reorder;
