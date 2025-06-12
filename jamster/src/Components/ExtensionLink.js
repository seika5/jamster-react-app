import React from 'react';
import './ExtensionLink.css';

function ExtensionLink() {
    return (
        <div className="extension-link glass-effect">
            <a 
                href="https://chromewebstore.google.com/detail/aoecaicnjmfelfiojlcdhkhhphpbokae" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                Get the Extension to Host a Jam
            </a>
        </div>
    );
}

export default ExtensionLink; 