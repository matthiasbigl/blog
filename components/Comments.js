import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../services';

const Comments = ({ slug }) => {


    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(slug).then((result) => {
            setComments(result);
        });
    }, []);

    return (
        <>
            {comments.length > 0 && (
                <div className="bg-zinc-800 text-white shadow-lg drop-shadow-lg rounded-lg p-8  mb-8 ">
                    <h3 className="text-xl font-semibold pb-4">
                        {comments.length}
                        {' '}
                        Comments
                    </h3>
                    {comments.map((comment, index) => (
                        <div key={index} className="text-xl py-2 text-zinc-100">
                            <div className="rounded-lg bg-gray-600 p-4 ">
                                <p className="mb-4">
                                    <span className="font-semibold">{comment.name}</span>
                                    {' '}
                                    on
                                    {' '}
                                    {moment(comment.createdAt).format('MMM DD, YYYY')}
                                </p>
                                <p className="whitespace-pre-line w-full ml-2 text-lg">{parse(comment.comment)}</p>

                            </div>
                            </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Comments;
