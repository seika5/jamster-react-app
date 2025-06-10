import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MetaTags = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        // Update document title
        document.title = isHomePage ? "Jamster - YouTube Music Together" : "Jamster";
    }, [isHomePage]);

    return (
        <Helmet>
            <meta name="description" content="Jamster - Listen to YouTube music together with friends in real-time. Create rooms, share playlists, and enjoy synchronized music playback." />
            <meta property="og:title" content="Jamster - YouTube Music Together" />
            <meta property="og:description" content="Jamster - Listen to YouTube music together with friends in real-time. Create rooms, share playlists, and enjoy synchronized music playback." />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default MetaTags; 