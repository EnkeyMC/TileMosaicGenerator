import React, {useCallback} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {exportSelector} from "../selectors";
import {download} from "../utils";

const Navbar = () => {
    const exportData = useSelector(exportSelector);

    const handleExport = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        download("TMG-" + new Date().toISOString() + ".json", JSON.stringify(exportData));
    }, [exportData]);

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
                    <NavLink to="/" exact className="navbar-item" activeClassName="is-active">
                        Generator
                    </NavLink>

                    <NavLink to="/tiles" className="navbar-item" activeClassName="is-active">
                        Tiles
                    </NavLink>
                </div>
                <div className="navbar-end">

                    <a href="#" onClick={handleExport} className="navbar-item ml-3">
                        <span className="icon mr-1">
                            <i className="fas fa-file-export" />
                        </span>
                        Export project
                    </a>
                    <NavLink to="/import" className="navbar-item" activeClassName="is-active">
                        <span className="icon mr-1">
                            <i className="fas fa-file-import" />
                        </span>
                        Import project
                    </NavLink>
                    <NavLink to="/help" className="navbar-item" activeClassName="is-active">
                        <span className="icon mr-1">
                            <i className="fas fa-question-circle" />
                        </span>
                        Help
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
