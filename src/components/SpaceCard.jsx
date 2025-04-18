import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SpaceCard = ({ photo }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.url === photo.url));
  }, [photo.url]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.url !== photo.url);
    } else {
      favorites.push(photo);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="space-card">
      <img
        src={photo.url}
        alt={photo.title}
        onClick={() => navigate(`/details/${photo.date}`, { state: { photo } })}
        className="space-image"
        style={{ cursor: "pointer" }}
      />
      <div className="space-card__info">
        <p>{photo.title || "Без названия"}</p>
        <button
          onClick={toggleFavorite}
          className={isFavorite ? "favorite-button active" : "favorite-button"}
        >
          {isFavorite ? "Добавлено" : "В избранное"}
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;
