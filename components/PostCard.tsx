import React from 'react';
import moment from 'moment';
import Link from 'next/link';

// @ts-ignore
const PostCard = ({post}) => {
    console.log(post);


    function renederImage() {
        if (post.featuredImage) {
            console.log(post.image);
            return (

                <div className='bg-zinc-600 rounded-md relative overflow-hidden shadow-md pb-80 mb-6'>


                    <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className={'object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-md'}
                    />

                </div>
            );

        }
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (

        <div className='text-zinc-200 bg-zinc-800 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            {renederImage()}
            <h1 className='pt-6 transition duration-400 text-center mb-8 cursor-pointer hover:translate-y-0.5 hover:text-blue-500 text-4xl font-semibold '>
                <Link href={`/post/${post.slug}`}>
                    {post.title}
                </Link>
            </h1>
            <div className='block lg:flex text-center item-center justify-center mb-8 w-full'>
                <div className='flex items-center justify-center mb-4 lg:mb-0 lg:w-auto mr-8'>
                    <img
                        alt={post.author.name}
                        height="40px"
                        width="40px"
                        className={'align-middle rounded-full mr-2'}
                        src={post.author.photo.url}

                    />
                    <p className='inline align-middle ml-2 text-lg'>
                        {post.author.name}
                    </p>
                </div>
                <div className='font-medium '>
                    <svg className="inline align-middle w-8 h-8 " fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span className='inline align-middle ml-2 text-lg'>
                        {moment(post.publishedAt).format('MMMM Do YYYY')}
                    </span>
                </div>
            </div>
            <p className='text-lg text-center text-zinc-200'>
                {post.excerpt}
            </p>
            <div className='text-center text-md'>
                <Link href={`/post/${post.slug}`}>
                    <a className='inline-block bg-zinc-800 text-white text-lg font-semibold rounded-full px-6 py-3 mt-6 hover:translate-y-1 hover:bg-zinc-600 hover:text-blue-500 transition duration-400'>
                        Read More
                    </a>
                </Link>
            </div>
        </div>
    );
}
export default PostCard;
