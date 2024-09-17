'use client'
import React, { useEffect, useState } from "react";

export default function Movie() {
    const [movielist, setMovielist] = useState([]);

    const getMovie = () => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=fb358115488158299075588e8f32cd8f")
            .then(res => res.json())
            .then(json => setMovielist(json.results))
            .catch(error => console.error('Error fetching movies:', error));
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {movielist && movielist.length > 0 ? (
                movielist.map((movie) => (
                    <div key={movie.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="p-8 rounded-t-lg w-full h-64 object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </a>
                        <div className="px-5 pb-5">
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{movie.title}</h5>
                            </a>
                            <div className="mt-2.5 mb-5">
                                <p className="text-sm text-gray-700 dark:text-gray-300">{movie.overview.slice(0, 100)}...</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Release: {movie.release_date}</span>
                                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details</a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-700 dark:text-gray-300">Loading movies...</p>
            )}
        </div>
    );
}