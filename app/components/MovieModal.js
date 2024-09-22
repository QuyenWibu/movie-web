'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SeenVideo from './SeenVideo';

const MovieModal = ({ movie, onClose }) => {
    const [video, setVideo] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        getVideo();
        return () => setMounted(false);
    }, [movie.id]);

    const getVideo = () => {
        fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=fb358115488158299075588e8f32cd8f`)
            .then(res => res.json())
            .then(json => setVideo(json.results[0]))
            .catch(error => console.error('Error fetching video:', error));
    };

    const modalContent = (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{movie.title}</h2>
                <img className="w-full h-64 object-cover mb-4" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <p className="text-gray-700 dark:text-gray-300 mb-4">{movie.overview}</p>
                <span className="text-xs font-bold text-gray-900 dark:text-white">Release Date: {movie.release_date}</span>
                {video && <SeenVideo video={video} />}
            </div>
        </div>
    );

    return mounted ? createPortal(modalContent, document.body) : null;
};

export default MovieModal;