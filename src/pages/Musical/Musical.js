import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Musical.css';

const Musical = () => {
    const { city } = useParams();
    const [musicals, setMusicals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusicals = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=musical&city=${city}&apikey=KYkgxKAtGLXdow5xGDYyA12D0c0G1eiC`);
                const data = await response.json();
                console.log("all data", data._embedded?.events);
                setMusicals(data._embedded?.events || []);
            } catch (error) {
                console.error('Error in Location?', error);
            };

        };
        fetchMusicals();
    }, [city]);

    const addtofavorite = (musical) => {
        const favoriteData = {
            name: musical.name,
            date: musical.date?.start?.localDate || '',
            venue: musical._embedded?.venues[0]?.name || ''
        };
        axios.post('http://localhost:5000/favorites', favoriteData)
          .then((response) => {
            console.log("Added to favorite", response.data);
          })
          .catch((error) => {
            console.error('Error adding favorites', error);
          });
    };

    const gotofavorite = () => {
        navigate('/favorite');
    };

    return (
        <div id="musicalbody">
            <button onClick={() => navigate('/favorite')} id="buttons">Your Favorites</button>
            <h1> Musicals in {city}</h1>
            {musicals.length >0 ? (
                <ul>
                    {musicals.map((musical) => (
                        <li key={musical.id}>
                            <h2>{musical.name}</h2>
                            <p>{musical.dates.start.localDate}</p>
                            <p>{musical._embedded.venues[0].name}</p>
                            <a href="https://www.ticketmaster.com/?landing=c&awtrc=true&c=SEM_TMBRAND_ggl_298560299_24300724499_ticketmaster&GCID=0&&gad_source=1&gclid=Cj0KCQiA0MG5BhD1ARIsAEcZtwSo5f5AfKfvIXSc2j_hkA-pCPjPxyZzEj90jOeqJ-EkKo4ijr1yFmIaApRgEALw_wcB&gclsrc=aw.ds">More Details & Tickets</a>
                            <button onClick={() => addtofavorite(musical)} id="lovebutton">
                                <img src="./love.png" alt="Add to favorite"/>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Musicals...?</p>
            )}
            <button onClick={() => navigate(-1)} id="buttons">Back</button>
        </div>
    );
};

export default Musical;