import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Song from "./Components/song.js";
import Home from "./Components/Home.js";
import Privacy from "./Components/Privacy.js";
import { Analytics } from "@vercel/analytics/react";

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="App">
                    <Helmet>
                        <title>Jamster - YouTube Music Together</title>
                        <meta name="description" content="Jamster - Listen to YouTube music together with friends in real-time. Create rooms, share playlists, and enjoy synchronized music playback." />
                    </Helmet>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/room/:roomId" element={<Song />} />
                        <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                    <Analytics />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
