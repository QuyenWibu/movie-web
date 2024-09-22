'use client';
import React, { useEffect, useState } from "react";
import MovieModal from './MovieModal';


export default function Movie() {
    const [movielist, setMovielist] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const apikey = process.env.API_KEY;
    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fb358115488158299075588e8f32cd8f`)
            .then(res => res.json())
            .then(json => setMovielist(json.results))
            .catch(error => console.error('Error fetching movies:', error));
    };

    useEffect(() => {
        getMovie();
    }, []);

    const openModal = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <>
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {movielist && movielist.length > 0 ? (
                    movielist.map((movie) => (
                        <div key={movie.id} className="w-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <img className="rounded-t-lg w-full h-36 object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <div className="p-3">
                                <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">{movie.title}</h5>
                                <p className="mb-3 text-xs text-gray-700 dark:text-gray-300 line-clamp-3">{movie.overview}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-900 dark:text-white">{movie.release_date}</span>
                                    <button
                                        onClick={() => openModal(movie)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 dark:text-gray-300">Loading movies...</p>
                )}
            </div>
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
        </>
    );
}