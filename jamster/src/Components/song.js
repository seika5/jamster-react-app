import "../App.css";
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import ReactPlayer from 'react-player';

const Song = () => {
    const [song, setSong] = useState([]);
    const [room, setRoom] = useState('')

    useEffect(() => {
        const docRef = collection(db, "room")
        console.log(docRef);
        onSnapshot(docRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                if (doc.id === room) {
                    setSong(doc.data());
                }
            })
        })
    }, [room])

    const changeRoom = (e) => {
        setRoom(e.target.value);
    };

    if (room) {
        return (
            <section>
                <div>
                    <input type="text" placeholder="Room ID" onChange={changeRoom}/>
                    <div>
                        {
                            <ReactPlayer
                                className="react-player"
                                url={song.song}
                                width="500px"
                                height="500px"
                                playing={true}
                                controls={true}
                            />
                        }
                    </div>
                </div>
            </section>
        )
    } else {
        return (
            <section>
                <div>
                    <input type="text" placeholder="Room ID" onChange={changeRoom}/>
                </div>
            </section>
        )
    }
}

export default Song