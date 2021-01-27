import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <h1 className="navbar-item is-flex-direction-column">
                    <span className="title is-4 mb-4 has-text-white">Tile Mosaic</span>
                    <span className="subtitle is-6 is-uppercase is-bold has-text-light">Generator</span>
                </h1>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">
                        Generator
                    </Link>

                    <Link to="/tiles" className="navbar-item">
                        Tiles
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
