import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from '../services';

const CommentForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
        nameEl.current.value = window.localStorage.getItem('name');
        emailEl.current.value = window.localStorage.getItem('email');
    }, []);

    const handleCommentSubmission = () => {
        setError(false);

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { checked: storeData } = storeDataEl.current;

        if (!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug };

        if (storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        } else {
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj).then((res) => {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        });
    };

    return (
        <div className="bg-light-card dark:bg-dark-card shadow-lg rounded-md p-8 pb-12 mb-8 border border-light-border dark:border-dark-border">
            <h3 className="text-xl mb-8 font-semibold border-b border-light-border dark:border-dark-border pb-4 text-light-text dark:text-dark-text">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                    ref={commentEl}
                    className="p-4 outline-none w-full rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-dark-muted bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border transition-all"
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input
                    type="text" ref={nameEl}
                    className="py-2 px-4 outline-none w-full rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-dark-muted bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border transition-all"
                    placeholder="Name"
                    name="name"
                />
                <input
                    type="text" ref={emailEl}
                    className="py-2 px-4 outline-none w-full rounded-md focus:ring-2 focus:ring-primary dark:focus:ring-dark-muted bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border transition-all"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" />
                    <label className="text-light-muted dark:text-dark-muted cursor-pointer ml-2" htmlFor="storeData">Save my e-mail and name for the next time I comment.</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">All fields are required.</p>}
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-primary/90 dark:hover:bg-dark-muted/90 inline-block bg-primary dark:bg-dark-muted text-white dark:text-dark-bg text-lg rounded-md px-8 py-3 cursor-pointer font-bold"
                >
                    Post Comment
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
            </div>
        </div>
    );
};

export default CommentForm;
