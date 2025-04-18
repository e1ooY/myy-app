import React, { useState, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const API_KEY = "DEMO_KEY";

  const fetchPhotos = async (searchQuery = "") => {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=20`;

    if (searchQuery.trim() !== "") {
      url = `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (searchQuery) {
        const images = data.collection.items.map((item) => ({
          url: item.links?.[0]?.href || "",
          title: item.data?.[0]?.title || "Без названия",
          date: item.data?.[0]?.date_created || "Неизвестная дата",
        }));
        setPhotos(images);
      } else {
        const imagesOnly = data.filter((item) => item.media_type === "image");
        setPhotos(imagesOnly);
      }
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  useEffect(() => {
    fetchPhotos(); 
  }, []);

  const handleSearch = () => {
    fetchPhotos(query);
  };

  return (
    <div className="container">
      <h1>NASA</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Введите запрос (например, Mars)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Найти</button>
      </div>
      <div className="space-list">
        {photos.length ? (
          photos.map((photo, index) => (
            <SpaceCard key={photo.date || index} photo={photo} />
          ))
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
