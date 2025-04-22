import React, { useState, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";

const Home = () => {
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = "DEMO_KEY";
    const ACCESS_KEY = "uYITAEPo4-jMbb4ixhZ82iJ-iBSkZtdtS6XaUldtK5Q";

    const fetchPhotos = async (searchQuery = "") => {
        let url = `https://api.unsplash.com/photos/random?query=cars&count=20`;

        if (searchQuery.trim() !== "") {
            url = `https://api.unsplash.com/photos/random?query=${searchQuery}&count=20`;
        }
        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Client-ID ${ACCESS_KEY}`,
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при загрузке изображений");
            }

            const data = await response.json();
            setPhotos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    // return (
    //     <div className="gallery">
    //         <h1>Случайные изображения машин</h1>
    //         <div className="photo-grid">
    //             {photos.map((photo) => (
    //                 <div key={photo.id} className="photo">
    //                     <img
    //                         src={photo.urls.regular}
    //                         alt={photo.alt_description || "Car"}
    //                         title={`Photo by ${photo.user.name}`}
    //                     />
    //                     <p>
    //                         Photo by{" "}
    //                         <a
    //                             href={photo.user.links.html}
    //                             target="_blank"
    //                             rel="noopener noreferrer"
    //                         >
    //                             {photo.user.name}
    //                         </a>
    //                     </p>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );

    // const fetchPhotos = async (searchQuery = "") => {
    //     // let url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=20`;
    //     let url = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&query=cars&count=20`;

    //     if (searchQuery.trim() !== "") {
    //         url = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&query=${searchQuery}&count=20`;
    //     }

    //     try {
    //         const response = await fetch(url);
    //         const data = await response.json();

    //         if (searchQuery) {
    //             const images = data.collection.items.map((item) => ({
    //                 url: item.links?.[0]?.href || "",
    //                 title: item.data?.[0]?.title || "Без названия",
    //                 date: item.data?.[0]?.date_created || "Неизвестная дата",
    //             }));
    //             setPhotos(images);
    //         } else {
    //             const imagesOnly = data.filter(
    //                 (item) => item.media_type === "image"
    //             );
    //             setPhotos(imagesOnly);
    //         }
    //     } catch (error) {
    //         console.error("Ошибка загрузки:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchPhotos();
    // }, []);

    const handleSearch = () => {
        fetchPhotos(query);
    };

    return (
        <div className="container">
            <h1>Cars</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Введите запрос (например, BMW)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Найти</button>
            </div>
            <div className="space-list">
                {photos.length ? (
                    // photos.map((photo, index) => (
                    //     <SpaceCard key={photo.date || index} photo={photo} />
                    // ))
                    photos.map((photo) => (
                        <SpaceCard key={photo.id} photo={photo} />
                        // <div key={photo.id} className="photo">
                        //     <img
                        //         src={photo.urls.regular}
                        //         alt={photo.alt_description || "Car"}
                        //         title={`Photo by ${photo.user.name}`}
                        //     />
                        //     <p>
                        //         Photo by{" "}
                        //         <a
                        //             href={photo.user.links.html}
                        //             target="_blank"
                        //             rel="noopener noreferrer"
                        //         >
                        //             {photo.user.name}
                        //         </a>
                        //     </p>
                        // </div>
                    ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
