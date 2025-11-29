import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
        } else {
            getRecentPosts().then((result) => setRelatedPosts(result));
        }
    }, [slug]);

    return (
        <div className="bg-light-card dark:bg-dark-card shadow-lg rounded-md p-8 mb-8 border border-light-border dark:border-dark-border">
            <h3 className="text-xl mb-8 font-semibold border-b border-light-border dark:border-dark-border pb-4 text-light-text dark:text-dark-text">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <img
                            alt={post.title}
                            height="60px"
                            width="60px"
                            className="align-middle rounded-md object-cover border border-light-border dark:border-dark-border"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-light-muted dark:text-dark-muted font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} className="text-md text-light-text dark:text-dark-text hover:text-primary dark:hover:text-dark-muted transition-colors">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
