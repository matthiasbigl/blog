import React from 'react';
import Image from 'next/image';

const Author = ({ author }) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-md glass-panel">
            <div className="absolute left-0 right-0 -top-14">
                <img
                    alt={author.name}
                    className="align-middle rounded-full border-4 border-purple-500/30 shadow-lg mx-auto w-[100px] h-[100px]"
                    src={author.photo.url}
                />
            </div>
            <h3 className="text-light-text dark:text-dark-text my-4 text-xl font-bold">{author.name}</h3>
            <p className="text-light-text/70 dark:text-dark-text/70 text-lg">{author.bio}</p>
        </div>
    );
};

export default Author;
