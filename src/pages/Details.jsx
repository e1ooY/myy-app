import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    let photo = location.state?.photo;

    if (!photo) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        photo = favorites.find((item) => String(item.id) === id);
    }

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.url === photo?.urls.regular));
    }, [photo]);

    const toggleFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFavorite) {
            favorites = favorites.filter(
                (fav) => fav.url !== photo.urls.regular
            );
        } else {
            favorites.push(photo);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="container details">
            <button className="back-button" onClick={() => navigate(-1)}>
                Назад
            </button>
            {photo ? (
                <>
                    <h2>{photo.alt_description}</h2>
                    <img
                        src={photo.urls.regular}
                        alt={photo.alt_description || "Car"}
                        className="space-image"
                        style={{ cursor: "pointer" }}
                        title={`Photo by ${photo.user.name}`}
                    />
                    <button
                        onClick={toggleFavorite}
                        className={
                            isFavorite
                                ? "favorite-button active"
                                : "favorite-button"
                        }
                    >
                        {isFavorite ? "Добавлено" : "В избранное"}
                    </button>
                </>
            ) : (
                <p>Данные не найдены.</p>
            )}
        </div>
    );
};

export default Details;
