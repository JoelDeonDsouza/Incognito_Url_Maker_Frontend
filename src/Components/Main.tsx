import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import baseUrl from '../Assets/baseUrl';
import { InfinitySpin } from 'react-loader-spinner';

const Main: React.FC = () => {
    const [originUrl, setOriginUrl] = useState<string>('');
    const [masked, setMasked] = useState<string>('');
    const [customizedUrl, setCustomizedUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleOriginUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOriginUrl(event.target.value);
    };

    const handleMaskedChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMasked(event.target.value);
    };

    // eslint-disable-next-line no-useless-escape
    const strongRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    const createMaskedUrl = () => {
        if (originUrl === '' || masked === '') {
            setError('Please fill in the form');
        } else if (!strongRegex.test(originUrl)) {
            setError('Enter a valid URL');
        } else if (masked.length > 0 && masked.length < 5) {
            setError('Alias should be at least 5 characters long');
        } else {
            setLoading(true);
            const newMaskedUrl = {
                originUrl,
                masked,
            };
            axios
                .post(`${baseUrl}create`, newMaskedUrl)
                .then(({ data }) => {
                    const { maskedUrl } = data;
                    setCustomizedUrl(maskedUrl);
                })
                .catch((error) => {
                    console.error(error, "Error");
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const clear = () => {
        setOriginUrl('');
        setMasked('');
        setCustomizedUrl('');
        setError('');
    };

    return (
        <div className="mainContainer">
            {loading ? (
                <div className="loaderContainer">
                    <InfinitySpin width='200' color="#F6FA70" />
                </div>
            ) : (
                <>
                    <div style={customizedUrl !== '' ? { display: 'none' } : {}}>
                        <h5>Simplify and Customize: Transform Your URLs with Ease</h5>
                        <div className="createContainer">
                            <span className="subText">Shorten a long URL</span>
                            <input
                                placeholder="Enter long link here *"
                                className="urlInput"
                                value={originUrl}
                                onChange={handleOriginUrlChange}
                            />
                        </div>
                        <div>
                            <span className="subText">Customize your link</span>
                            <div className="customInputs">
                                <input
                                    placeholder="incognito.onrender.com/"
                                    className="staticInput"
                                    disabled
                                />
                                <input
                                    placeholder="Enter alias *"
                                    className="customInput"
                                    value={masked}
                                    onChange={handleMaskedChange}
                                    maxLength={10}
                                />
                            </div>
                            <div className="aliasContainer">
                                <span className="aliasSubText" data-testid="err-alias">
                                    Alias must be at least 5 alphanumeric characters.
                                </span>
                            </div>
                        </div>
                        {error ? (
                            <div className="errorContainer">
                                <span className="errorMessage" data-testid="err-message">{error}</span>
                            </div>
                        ) : null}
                        <div className="btnContainer">
                            <button onClick={createMaskedUrl}>Shorten URL</button>
                        </div>
                    </div>
                    <div style={customizedUrl === '' ? { display: 'none' } : {}}>
                        <div className="customeUrlContainer">
                            <span className="customUrlHeading">Your new customed URL</span>
                            <input
                                value={customizedUrl}
                                placeholder={customizedUrl}
                                className="newUrl"
                                readOnly
                            />
                        </div>
                        <div className="btnContainerNewUrl">
                            <button className="btnClear" onClick={clear}>
                                Clear
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(customizedUrl)}
                                className="btnCopy"
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Main;
