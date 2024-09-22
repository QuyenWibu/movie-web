'use client';
import React from 'react';

const SeenVideo = ({ video }) => {
    if (!video) return null;
    return (
        <div className="mt-4">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Trailer</h3>
            <iframe
                className="w-full h-64"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.title}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default SeenVideo;