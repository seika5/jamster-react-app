import './App.css';
import Song from "./Components/song.js";

function App() {
    document.title = "Jamster";
    return (
        <div className="App">
            <a href="https://github.com/seika5/jamster">Browser Extension</a>
            <Song></Song>
        </div>
    );
}

export default App;
