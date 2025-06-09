import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Song from "./Components/song.js";
import Home from "./Components/Home.js";
import Privacy from "./Components/Privacy.js";

function App() {
    document.title = "Jamster";
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/room/:roomId" element={<Song />} />
                    <Route path="/privacy" element={<Privacy />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
