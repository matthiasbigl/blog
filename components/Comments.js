import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({ slug }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((result) => setComments(result));
    }, [slug]);

    if (!comments || comments.length === 0) {
        return null;
    }

    return (
        <section className="bg-light-card dark:bg-dark-card shadow-lg rounded-md p-8 mb-8 border border-light-border dark:border-dark-border" aria-labelledby="comments-title">
            <h3 id="comments-title" className="text-xl mb-8 font-semibold border-b border-light-border dark:border-dark-border pb-4 text-light-text dark:text-dark-text">
                {comments.length} Comments
            </h3>
            {comments.map((comment) => (
                <article key={comment.createdAt} className="border-b border-light-border dark:border-dark-border mb-4 pb-4 last:border-0 last:mb-0">
                    <p className="mb-4 text-light-text dark:text-dark-text">
                        <span className="font-semibold text-primary">{comment.name}</span>{' '}
                        <time dateTime={comment.createdAt} className="text-light-muted dark:text-dark-muted text-sm">
                            on {moment(comment.createdAt).format('MMM DD, YYYY')}
                        </time>
                    </p>
                    <div className="whitespace-pre-line text-light-text dark:text-dark-text w-full">
                        {parse(comment.comment)}
                    </div>
                </article>
            ))}
        </section>
    );
};

export default Comments;
