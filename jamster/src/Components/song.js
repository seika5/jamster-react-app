import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import ReactPlayer from 'react-player';
import { useParams, Link } from 'react-router-dom';

const Song = () => {
    const [song, setSong] = useState([]);
    const [toasts, setToasts] = useState([]);
    const { roomId } = useParams();

    const showToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, show: true }]);
        
        // Start fade out after 1.5 seconds
        setTimeout(() => {
            setToasts(prev => prev.map(toast => 
                toast.id === id ? { ...toast, show: false } : toast
            ));
            
            // Remove toast after fade out animation completes
            setTimeout(() => {
                setToasts(prev => prev.filter(toast => toast.id !== id));
            }, 150);
        }, 1500);
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        showToast('Room ID copied to clipboard');
    };

    const shareRoom = () => {
        navigator.clipboard.writeText(window.location.href);
        showToast('Room link copied to clipboard');
    };

    const updateBackground = (songUrl) => {
        if (songUrl) {
            const videoId = songUrl.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
            if (videoId) {
                const appElement = document.querySelector('.App');
                appElement.style.setProperty('--album-cover', `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`);
                appElement.classList.add('album-background');
            }
        }
    };

    useEffect(() => {
        const docRef = collection(db, "room")
        console.log(docRef);
        onSnapshot(docRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                if (doc.id === roomId) {
                    const newSong = doc.data();
                    setSong(newSong);
                    updateBackground(newSong.song);
                }
            })
        })
    }, [roomId])

    // Clean up background when component unmounts
    useEffect(() => {
        return () => {
            const appElement = document.querySelector('.App');
            appElement.style.removeProperty('--album-cover');
            appElement.classList.remove('album-background');
        };
    }, []);

    return (
        <section>
            <div>
                <div className="song-header">
                    <Link to="/" className="back-button glass-effect">← Back to Jams</Link>
                <h2>Room: {roomId}</h2>
                    <div className="room-actions">
                        <button onClick={copyRoomId} className="action-button glass-effect" title="Copy Room ID">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                        <button onClick={shareRoom} className="action-button glass-effect" title="Copy Room Link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                {song.title && <h3>{song.title}</h3>}
                <div>
                    {song.song && (
                        <ReactPlayer
                            className="react-player"
                            url={song.song}
                            width="500px"
                            height="500px"
                            playing={true}
                            controls={true}
                        />
                    )}
                </div>
            </div>
            <div className="toast-container">
                {toasts.map((toast) => (
                    <div 
                        key={toast.id} 
                        className={`toast glass-effect ${toast.show ? 'show' : ''}`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Song