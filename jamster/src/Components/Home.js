import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import "../App.css";

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Get rooms that have been updated in the last 5 minutes
            const fiveMinutesAgo = Timestamp.fromDate(new Date(Date.now() - 5 * 60 * 1000));
            
            const roomsQuery = query(
                collection(db, "room"),
                where("updatedAt", ">=", fiveMinutesAgo),
                orderBy("updatedAt", "desc")
            );

            const unsubscribe = onSnapshot(roomsQuery, 
                (snapshot) => {
                    const activeRooms = snapshot.docs
                        .filter(doc => doc.data().song) // Only get rooms with songs
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            lastUpdated: doc.data().updatedAt?.toDate() || new Date()
                        }));
                    setRooms(activeRooms);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching rooms:", error);
                    setError("Failed to load rooms. Please try again later.");
                    setLoading(false);
                }
            );

            // Cleanup subscription on unmount
            return () => unsubscribe();
        } catch (err) {
            console.error("Error setting up rooms listener:", err);
            setError("Failed to initialize rooms. Please try again later.");
            setLoading(false);
        }
    }, []);

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    const handleRoomHover = (room) => {
        if (room.song) {
            // Extract video ID from YouTube URL
            const videoId = room.song.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
            if (videoId) {
                const appElement = document.querySelector('.App');
                appElement.style.setProperty('--album-cover', `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`);
                appElement.classList.add('album-background');
            }
        }
    };

    const handleRoomLeave = () => {
        const appElement = document.querySelector('.App');
        appElement.classList.remove('album-background');
    };

    if (loading) {
        return (
            <div className="home-container">
                <h1>Active Jams</h1>
                <div className="loading">Loading active rooms...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <h1>Active Jams</h1>
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <h1>Active Jams</h1>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <Link 
                            to={`/room/${room.id}`} 
                            key={room.id} 
                            className="room-card"
                            onMouseEnter={() => handleRoomHover(room)}
                            onMouseLeave={handleRoomLeave}
                        >
                            <h2>{room.id}</h2>
                            <p className="song-info">{room.title}</p>
                            <p className="time-info">{formatTimeAgo(room.lastUpdated)}</p>
                        </Link>
                    ))
                ) : (
                    <div className="no-rooms">
                        <p>No active rooms found</p>
                        <p className="sub-text">Create a new room by installing the Jamster extension</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home; 