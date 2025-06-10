import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Song from "./Components/song.js";
import Home from "./Components/Home.js";
import Privacy from "./Components/Privacy.js";
import { Analytics } from "@vercel/analytics/react";
import MetaTags from './Components/MetaTags';

function App() {
    document.title = "Jamster";
    return (
        <Router>
            <div className="App">
                <MetaTags />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:roomId" element={<Song />} />
                    <Route path="/privacy" element={<Privacy />} />
                </Routes>
                <Analytics />
            </div>
        </Router>
    );
}

export default App;
