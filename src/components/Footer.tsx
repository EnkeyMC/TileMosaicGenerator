import React from "react";
import {VERSION} from "../versioning";

const Footer = () => {
    return (
        <footer className="has-background-light p-3">
            <div className="content has-text-centered">
                <p className="has-text-grey is-size-7">
                    <i>Tile Mosaic Generator</i> is created by Martin Omacht as a project for VIN course
                    at Brno University of Technology in 2020. (Version: {VERSION.MAJOR}.{VERSION.MINOR})
                </p>
            </div>
        </footer>
    );
}

export default Footer;
