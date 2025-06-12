import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Song from "./Components/song.js";
import Home from "./Components/Home.js";
import Privacy from "./Components/Privacy.js";
import { Analytics } from "@vercel/analytics/react";
import MetaTags from './Components/MetaTags';
import ExtensionLink from './Components/ExtensionLink';

function App() {
    document.title = "Jamster";
    return (
        <Router>
            <div className="App">
                <MetaTags />
                <ExtensionLink />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:roomId" element={<Song />} />
                    <Route path="/privacy" element={<Privacy />} />
                </Routes>
                <Analytics />
                <div className="privacy-copyright">
                    <a href="/privacy" className="privacy-link">Privacy Policy</a>
                    <span className="copyright">&nbsp;© {new Date().getFullYear()} Ryan Mar</span>
                </div>
            </div>
        </Router>
    );
}

export default App;
