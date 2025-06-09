import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const Song = () => {
    const [song, setSong] = useState([]);
    const { roomId } = useParams();

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
                <h2>Room: {roomId}</h2>
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
        </section>
    )
}

export default Song