import React from 'react';

function Privacy() {
    return (
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2>Data Collection</h2>
                <p>Jamster collects minimal data necessary for its core functionality:</p>
                <ul>
                    <li>Currently playing song URL from YouTube Music</li>
                    <li>Song title from YouTube Music</li>
                    <li>Randomly generated room ID (stored locally)</li>
                </ul>
            </section>

            <section>
                <h2>How We Use Your Data</h2>
                <p>The collected data is used solely for:</p>
                <ul>
                    <li>Sharing your currently playing song with others</li>
                    <li>Maintaining your music room connection</li>
                    <li>Updating the room in real-time when songs change</li>
                </ul>
            </section>

            <section>
                <h2>Data Storage</h2>
                <p>Your data is stored as follows:</p>
                <ul>
                    <li>Song information is stored in Firebase with a randomly generated room ID</li>
                    <li>Room ID is stored locally in your browser</li>
                    <li>No personal information is collected or stored</li>
                </ul>
            </section>

            <section>
                <h2>Data Sharing</h2>
                <p>We do not share your data with any third parties. The only information shared is:</p>
                <ul>
                    <li>The currently playing song URL and title in your music room</li>
                    <li>This information is only visible to people who have your room link</li>
                </ul>
            </section>

            <section>
                <h2>Your Rights</h2>
                <p>You can:</p>
                <ul>
                    <li>Uninstall the extension at any time to stop data collection</li>
                    <li>Clear your browser data to remove the stored room ID</li>
                    <li>Stop sharing your music room by closing the YouTube Music tab</li>
                </ul>
            </section>

            <section>
                <h2>Contact</h2>
                <p>If you have any questions about this privacy policy, please contact us at:</p>
                <p>Email: ryanmar05.business@gmail.com</p>
            </section>
        </div>
    );
}

export default Privacy; 