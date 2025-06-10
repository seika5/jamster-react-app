import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllJams, setShowAllJams] = useState(false);
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            let roomsQuery;
            
            if (showAllJams) {
                // Get all rooms without any filters
                roomsQuery = query(
                    collection(db, "room")
                );
            } else {
                // Get only active rooms (updated in last hour)
                const oneHourAgo = Timestamp.fromDate(new Date(Date.now() - 60 * 60 * 1000));
                roomsQuery = query(
                    collection(db, "room"),
                    where("updatedAt", ">=", oneHourAgo),
                    orderBy("updatedAt", "desc")
                );
            }

            const unsubscribe = onSnapshot(roomsQuery, 
                (snapshot) => {
                    const activeRooms = snapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            ...data,
                            lastUpdated: data.updatedAt?.toDate() || null,
                            title: data.title || 'N/A',
                            song: data.song || null
                        };
                    });
                    // Filter out rooms without songs in active view
                    const filteredRooms = showAllJams ? activeRooms : activeRooms.filter(room => room.song);
                    setRooms(filteredRooms);
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching rooms:", error);
                    setError("Failed to load rooms. Please try again later.");
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            console.error("Error setting up rooms listener:", err);
            setError("Failed to initialize rooms. Please try again later.");
            setLoading(false);
        }
    }, [showAllJams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomId.trim()) {
            navigate(`/room/${roomId.trim()}`);
        }
    };

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
            <div className="header-container">
                <h1>{showAllJams ? 'All Jams' : 'Active Jams'}</h1>
                <button 
                    className="toggle-jams-button glass-effect"
                    onClick={() => setShowAllJams(!showAllJams)}
                >
                    {showAllJams ? 'Show Active Jams' : 'Show All Jams'}
                </button>
            </div>
            <form onSubmit={handleSubmit} className="room-input-form">
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter Room ID and press Enter"
                    className="room-input glass-effect"
                />
            </form>
            <div className="rooms-grid">
                {rooms.length > 0 ? (
                    rooms.map(room => (
                        <Link 
                            to={`/room/${room.id}`} 
                            key={room.id} 
                            className="room-card glass-effect"
                            onMouseEnter={() => handleRoomHover(room)}
                            onMouseLeave={handleRoomLeave}
                        >
                            <h2>{room.id}</h2>
                            <p className="song-info">{room.title}</p>
                            <p className="time-info">{room.lastUpdated ? formatTimeAgo(room.lastUpdated) : 'N/A'}</p>
                        </Link>
                    ))
                ) : (
                    <div className="no-rooms">
                        <p>No {showAllJams ? 'jams' : 'active rooms'} found</p>
                        <p className="sub-text">Create a new room by installing the Jamster extension</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home; 