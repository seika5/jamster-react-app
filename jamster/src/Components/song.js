import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import ReactPlayer from 'react-player';

const Song = () => {
    const [song, setSong] = useState([]);

    useEffect(() => {
        const colRef = collection(db, "room")
        onSnapshot(colRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setSong(() => [doc.data()])
            })
        })
    }, [])

    return (
        <section>
            <div>
                <div>
                    {
                        song?.map((song,i)=>(
                            <ReactPlayer
                                key={i}
                                className="react-player"
                                url={song.song}
                                width="500px"
                                height="500px"
                                playing={true}
                                controls={true}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Song