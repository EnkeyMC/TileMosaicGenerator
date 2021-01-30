import React, {useCallback, useState} from "react";
import FullscreenPageLayout from "../../layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bem from "bem-ts";
import {useDispatch} from "react-redux";
import {importProject} from "../../actions";
import { useHistory } from "react-router-dom";
import {importProjectAndSetupIdGenerators} from "../../import";

const blk = bem('import');

const Import = () => {
    const [file, setFile] = useState<any>();
    const [error, setError] = useState<string>();
    const history = useHistory();
    const dispatch = useDispatch();

    const handleFileChange = useCallback(e => {
        setError(undefined);
        setFile(e.target.files[0]);
    }, [setFile]);

    const handleImport = useCallback(() => {
        if (!file) {
            setError('First choose a project file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = event => {
            if (!event.target?.result) {
                setError('Error reading file.');
                return;
            }
            try {
                const data = JSON.parse(event.target.result as string);
                importProjectAndSetupIdGenerators(dispatch, data);
                history.push('/');
            } catch (e: any) {
                setError(e.message);
            }
        }
        reader.readAsText(file);
    }, [file, dispatch, history]);

    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <div className={blk()}>
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            <h1 className="mb-5">Import project</h1>
                            <hr/>
                            <div className="field mb-5">
                                <div className="control">
                                    <div className="file">
                                        <label className="file-label">
                                            <input className="file-input" type="file" name="projectFile" onChange={handleFileChange} />
                                            <span className="file-cta">
                                              <span className="file-icon">
                                                <i className="fas fa-upload" />
                                              </span>
                                              <span className="file-label">
                                                Choose a file…
                                              </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <p className="help">Choose a JSON file exported from this application.</p>
                                {error && <p className="help is-danger">{error}</p>}
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-link" onClick={handleImport}>Import</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FullscreenPageLayout>
    )
}

export default Import;
