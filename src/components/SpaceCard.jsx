import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpaceCard = ({ photo }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.url === photo.urls.regular));
    }, [photo.urls.regular]);

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

    // return (
    //   <div className="space-card">
    //     <img
    //       src={photo.url}
    //       alt={photo.title}
    //       onClick={() => navigate(`/details/${photo.date}`, { state: { photo } })}
    //       className="space-image"
    //       style={{ cursor: "pointer" }}
    //     />
    //     <div className="space-card__info">
    //       <p>{photo.title || "Без названия"}</p>
    //       <button
    //         onClick={toggleFavorite}
    //         className={isFavorite ? "favorite-button active" : "favorite-button"}
    //       >
    //         {isFavorite ? "Добавлено" : "В избранное"}
    //       </button>
    //     </div>
    //   </div>
    // );

    return (
        <div className="space-card">
            <img
                src={photo.urls.regular}
                alt={photo.alt_description || "Car"}
                onClick={() =>
                    navigate(`/details/${photo.id}`, { state: { photo } })
                }
                className="space-image"
                style={{ cursor: "pointer" }}
                title={`Photo by ${photo.user.name}`}
            />
            <div className="space-card__info">
                <p>
                    Photo by{" "}
                    <a
                        href={photo.user.links.html}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {photo.user.name}
                    </a>
                </p>
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
            </div>
        </div>
    );
};

export default SpaceCard;
