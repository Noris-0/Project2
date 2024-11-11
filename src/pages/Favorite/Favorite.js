import React, {useEffect, useState} from "react";
import './Favorite.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Favorite = () => {
    const [favorite, setFavorite] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/favorites')
            .then((response) => {
                console.log('favorite data fetched', response.data);
                setFavorite(response.data);

            })
            .catch((error) => {
                console.error('Error fetching favorites', error)
            });

    }, []);
    const deletefavorite = (id) => {
        axios.delete(`http://localhost:5000/favorites/${id}`)
            .then(() => setFavorite(favorite.filter((fav) => fav._id !== id)))
            .catch((error) => console.error('Error deleting favorites', error));

    };

    return(
        <div id="favoritebody">
            <h1>My Favorites</h1>
            {favorite.length > 0 ? (
                <ul>
                    {favorite.map((favorite, index) => (
                        <li key={index}>
                            <h2>{favorite.name}</h2>
                            <p>{favorite.date || 'No date available'}</p>
                            <p>{favorite.venue || 'No venue available'}</p>
                            <a href="https://www.ticketmaster.com/?landing=c&awtrc=true&c=SEM_TMBRAND_ggl_298560299_24300724499_ticketmaster&GCID=0&&gad_source=1&gclid=Cj0KCQiA0MG5BhD1ARIsAEcZtwSo5f5AfKfvIXSc2j_hkA-pCPjPxyZzEj90jOeqJ-EkKo4ijr1yFmIaApRgEALw_wcB&gclsrc=aw.ds">More Details & Tickets</a>
                            <button onClick={() => deletefavorite(favorite._id)} id="deletebutton">
                                <img src="/delete.png" alt="delete" />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no favorites yet</p>
            )}
            <button onClick={() => navigate(-1)} id="buttons">Back</button>
        </div>
    );
};
//                            ?.start?.localDate
//_embedded?.venues[0]?.name
export default Favorite;