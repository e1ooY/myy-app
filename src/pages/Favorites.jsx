import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  const removeFavorite = (url) => {
    const updated = favorites.filter(item => item.url !== url);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="container favorites">
      <h2>Избранное</h2>
      <div className="space-list">
        {favorites.length === 0 && <p>Нет избранных фото.</p>}
        {favorites.map(item => (
          <div key={item.url} className="space-card">
            <img
              src={item.url}
              alt={item.title}
              onClick={() => navigate(`/details/${item.date}`, { state: { photo: item } })}
              className="space-image"
              style={{ cursor: "pointer" }}
            />
            <div className="space-card__info">
              <p>{item.title}</p>
              <button onClick={() => removeFavorite(item.url)} className="remove-button">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
