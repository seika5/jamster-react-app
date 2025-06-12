import React from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css';

function Privacy() {
    return (
        <div className="privacy-container">
            <Link to="/" className="back-button glass-effect">← Back to Jams</Link>
            <h1>Privacy Policy</h1>
            <p>Last updated: 6/10/2025</p>
            <div className="privacy-columns">
                <div className="privacy-col">
                    <h2>Jamster Web App</h2>
                    <p><strong>No data is stored or tracked by the web app itself.</strong> All music playback and room viewing is anonymous. We do not use cookies, analytics, or any tracking in the web app.</p>
                </div>
                <div className="privacy-col">
                    <h2>Jamster Extension</h2>
                    <p>The extension only stores the currently playing song URL and title (from YouTube Music) and a randomly generated room ID. No personal information is collected or stored. Data is only visible to people with your room link. You can uninstall the extension or clear your browser data at any time to remove all stored data.</p>
                    <h3>Data Collection</h3>
                    <p>Jamster collects minimal data necessary for its core functionality:</p>
                    <ul>
                        <li>Currently playing song URL from YouTube Music</li>
                        <li>Song title from YouTube Music</li>
                        <li>Randomly generated room ID (stored locally)</li>
                    </ul>
                    <h3>How We Use Your Data</h3>
                    <p>The collected data is used solely for:</p>
                    <ul>
                        <li>Sharing your currently playing song with others</li>
                        <li>Maintaining your music room connection</li>
                        <li>Updating the room in real-time when songs change</li>
                    </ul>
                    <h3>Data Storage</h3>
                    <p>Your data is stored as follows:</p>
                    <ul>
                        <li>Song information is stored in Firebase with a randomly generated room ID</li>
                        <li>Room ID is stored locally in your browser</li>
                        <li>No personal information is collected or stored</li>
                    </ul>
                    <h3>Data Sharing</h3>
                    <p>We do not share your data with any third parties. The only information shared is:</p>
                    <ul>
                        <li>The currently playing song URL and title in your music room</li>
                        <li>This information is only visible to people who have your room link</li>
                    </ul>
                    <h3>Your Rights</h3>
                    <p>You can:</p>
                    <ul>
                        <li>Uninstall the extension at any time to stop data collection</li>
                        <li>Clear your browser data to remove the stored room ID</li>
                        <li>Stop sharing your music room by closing the YouTube Music tab</li>
                    </ul>
                </div>
            </div>
            <div className="privacy-contact">
                <h3>Contact</h3>
                <p>If you have any questions about this privacy policy, please contact: <a href="mailto:ryanmar05.business@gmail.com">ryanmar05.business@gmail.com</a></p>
            </div>
        </div>
    );
}

export default Privacy; 