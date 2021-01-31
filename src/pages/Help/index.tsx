import React, {useEffect, useState} from "react";
import FullscreenPageLayout from "../../layouts/FullscreenPageLayout";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ReactMarkdown from "react-markdown";
import Scrollable from "../../components/Scrollable";

const Help = () => {
    const [readme, setReadme] = useState<string>('');

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/EnkeyMC/TileMosaicGenerator/main/README.md')
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Request returned with status ' + response.status + ': ' + response.statusText);
                }
            })
            .then(text => setReadme(text))
            .catch(err => setReadme(`# Error loading readme\n\nReason: ${err}`));
    }, []);

    return (
        <FullscreenPageLayout header={<Navbar />} footer={<Footer />}>
            <Scrollable>
                <div className="container pt-6 pb-6">
                    <ReactMarkdown className="content">
                        {readme}
                    </ReactMarkdown>
                </div>
            </Scrollable>
        </FullscreenPageLayout>
    )
}

export default Help;
