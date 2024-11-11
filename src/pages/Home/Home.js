import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [city, setCity] = useState('');

    const handleSearch = () => {
        if (city) navigate(`/musicals/${city}`);

    };

    return (
        <div id="homebody">
            <div id="box">
                <h1>The Sound Of Musical</h1>
                <p>This is a Global Musical Finder for all Musical Lovers who are Traveling around the World.
                Come and search for what ever you can watch in your trip!</p>

            </div>
            <div id="search">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <button onClick={handleSearch} id="searchbutton">
                    <img src="/showonbutton.png" alt="Search" />
                </button>

            </div>
        
        </div>
    );
};
export default Home;