import React from 'react';
import {Header} from "./";
import moment from "moment";
import parse from "html-react-parser";
import  RichText  from '@graphcms/rich-text-react-renderer';

// @ts-ignore
const PostDetail = ({post}) => {
    function renderImage() {
        if (post.featuredImage) {
            return (
                <div className='relative overflow-hidden shadow-md mb-6'>
                    <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className='object-top h-full w-full rounded-t-lg lg:rounded-b-lg'
                    />

                </div>)
        }
    }

    return (
        <div className={'bg-zinc-800 shadow-lg rounded-lg lg:p-8 pb-12 mb-8'}>
            {renderImage()}
            <div className='px-4 lg:px-0'>
                <div className={'flex items-center mb-8 w-full'}>
                    <div className='flex items-center mb-4 lg:mb-0 lg:w-auto mr-8'>
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
                        <svg className="inline align-middle w-8 h-8 " fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span className='inline align-middle ml-2 text-lg'>
                        {moment(post.publishedAt).format('MMMM Do YYYY')}
                    </span>
                    </div>
                </div>
                <h1 className='mb-8 text-3xl font-semibold'>
                    {post.title}
                </h1>
                {console.log(post.content.html)}
                <RichText
                    content={
                    post.content.raw
                    }
                />
            </div>
        </div>
    );
}
export default PostDetail;
